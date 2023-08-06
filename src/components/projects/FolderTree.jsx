import React, {useState} from 'react';
import styled from "styled-components";
import {Folder, TextSnippet} from "@mui/icons-material";
import {TreeItem, TreeView} from "@mui/lab";

const Container = styled.div `
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 15px;
`;

const TreeContainer = styled.div `
  overflow: auto;
`;

const FolderTree = ({ apiResponse, handleChangeInPath, handleClassClick }) => {

    const [expanded, setExpanded] = useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const convertResponseToObject = (response) => {
        const rootIndex = response.findIndex((item) => item.baseDirectory === true);
        const root = {
            path: response[rootIndex].path,
            coverage: response[rootIndex].coverage,
            files: response[rootIndex].files,
            directories: [],
        };

        const directoriesMap = {
            [root.path]: root,
        };

        let responseCopy = [...response];
        let newDirectoriesAdded = true;

        while (responseCopy.length > 0 && newDirectoriesAdded) {
            newDirectoriesAdded = false;

            for (let i = 0; i < responseCopy.length; i++) {
                const currentItem = responseCopy[i];
                const directoryPath = currentItem.path;
                const parentPath = directoryPath.substring(0, directoryPath.lastIndexOf('/'));
                const parentDirectory = directoriesMap[parentPath];

                if (parentDirectory) {
                    const directory = {
                        path: directoryPath,
                        coverage: currentItem.coverage,
                        files: currentItem.files,
                        directories: [],
                    };

                    parentDirectory.directories.push(directory);
                    directoriesMap[directoryPath] = directory;
                    responseCopy.splice(i, 1);
                    newDirectoriesAdded = true;
                    break;
                }
            }
        }


        return root;
    };

    const convertedFolderTree = convertResponseToObject(apiResponse);

    const handleDirectoryClick = (directoryPath) => {
        handleChangeInPath(directoryPath);
    }

    const generateFolderTreeItems = (directory, previousDirectoryPath) => {
        if (!directory) {
            return null;
        }

        const displayDirectoryPath =
            previousDirectoryPath === ''
                ? directory.path
                : directory.path
                    .replace(previousDirectoryPath, '')
                    .replace('/', '');

        return (
            <TreeItem
                key={directory.path}
                nodeId={directory.path}
                label={`${displayDirectoryPath}`}
                icon={<Folder style={{ color: "#F8D775" }}/>}
                style={{ fontFamily: "'Urbanist', sans-serif" }}
                onClick={() => handleDirectoryClick(directory.path)}
                expanded={expanded.includes(directory.path)}
                onNodeToggle={handleToggle}
            >
                {directory.files.map((file) => (
                    <TreeItem
                        key={`${directory.path}/${file.name}`}
                        nodeId={`${directory.path}/${file.name}`}
                        label={`${file.name} (${file.coverage})`}
                        icon={<TextSnippet style={{ color: "#6a5acd" }}/>}
                        style={{ fontFamily: "'Urbanist', sans-serif" }}
                        onClick={() => handleClassClick(file.id)}
                    />
                ))}
                {directory.directories.map((subDirectory) => generateFolderTreeItems(subDirectory, directory.path))}
            </TreeItem>
        );
    };

    return (
        <Container>
            <TreeContainer>
                <TreeView>
                    {generateFolderTreeItems(convertedFolderTree, "")}
                </TreeView>
            </TreeContainer>
        </Container>
    );
};

export default FolderTree;
