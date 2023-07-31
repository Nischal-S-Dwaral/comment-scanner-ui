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
        const root = {
            path: response[0].path,
            coverage: response[0].coverage,
            files: response[0].files,
            directories: [],
        };

        const directoriesMap = {
            [root.path]: root,
        };

        for (let i = 1; i < response.length; i++) {
            const directoryPath = response[i].path;
            const directory = {
                path: directoryPath,
                coverage: response[i].coverage,
                files: response[i].files,
                directories: [],
            };

            const parentPath = directoryPath.substring(0, directoryPath.lastIndexOf('/'));
            const parentDirectory = directoriesMap[parentPath];

            if (parentDirectory) {
                parentDirectory.directories.push(directory);
                directoriesMap[directoryPath] = directory;
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
                        onClick={() => handleClassClick(directory.path+"/"+file.name)}
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
