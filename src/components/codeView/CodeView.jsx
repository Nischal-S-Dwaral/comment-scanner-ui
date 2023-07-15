import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {ChevronRight, Source} from "@mui/icons-material";
import CodeRow from "./CodeRow";

const Container = styled.div `
  width: 100%;
  height: 100%;
`;

const MainContainer = styled.div `
  margin: 20px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const TopContainer = styled.div `
  display: flex;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div `
  flex: 5;
  display: flex;
  align-items: center;
`;

const ProjectName = styled.h4 `
  color: #484242;
  padding: 0 3px;
`;

const Path = styled.h4 `
  padding: 0 3px;
`;

const NumberOfLines = styled.div `
  flex: 1;
`;

const Coverage = styled.div `
  flex: 1;
`;

const BottomContainer = styled.div ``;

const CodeView = ({ projectName, className }) => {

    const apiResponse = {
        "coverage": "80%",
        "path": "src/main/java/org/msc/web/dev/controller/RestApiController.java",
        "lineOfCodes": [
            {
                lineNumber: 1,
                code: "package uos.msc.project.documentation.coverage.comments.scanner.controller;",
                isHighlight: false,
            },
            {
                lineNumber: 2,
                code: "",
                isHighlight: false,
            },
            {
                lineNumber: 3,
                code: "import jakarta.servlet.http.HttpServletRequest;",
                isHighlight: false,
            },
            {
                lineNumber: 4,
                code: "import org.springframework.web.bind.annotation.CrossOrigin;",
                isHighlight: false,
            },
            {
                lineNumber: 5,
                code: "import org.springframework.web.bind.annotation.PathVariable;",
                isHighlight: false,
            },
            {
                lineNumber: 6,
                code: "import org.springframework.web.bind.annotation.PostMapping;",
                isHighlight: false,
            },
            {
                lineNumber: 7,
                code: "import org.springframework.web.bind.annotation.RestController;",
                isHighlight: false,
            },
            {
                lineNumber: 8,
                code: "import uos.msc.project.documentation.coverage.comments.scanner.enums.ServiceEnum;",
                isHighlight: false,
            },
            {
                lineNumber: 9,
                code: "import uos.msc.project.documentation.coverage.comments.scanner.enums.UseCasesEnums;",
                isHighlight: false,
            },
            {
                lineNumber: 10,
                code: "import uos.msc.project.documentation.coverage.comments.scanner.model.RestApiResponse;",
                isHighlight: false,
            },
            {
                lineNumber: 11,
                code: "import uos.msc.project.documentation.coverage.comments.scanner.service.IUseCaseImplementation;",
                isHighlight: false,
            },
            {
                lineNumber: 12,
                code: "import uos.msc.project.documentation.coverage.comments.scanner.service.UseCasesAdaptorFactory;",
                isHighlight: false,
            },
            {
                lineNumber: 13,
                code: "",
                isHighlight: false,
            },
            {
                lineNumber: 14,
                code: "import java.io.IOException;",
                isHighlight: false,
            },
            {
                lineNumber: 15,
                code: "import java.util.Objects;",
                isHighlight: false,
            },
            {
                lineNumber: 16,
                code: "",
                isHighlight: false,
            },
            {
                lineNumber: 17,
                code: "/**",
                isHighlight: true,
                highlightColor: "red",
                popBoxText: "Missing @Class and @param and @throws",
            },
            {
                lineNumber: 18,
                code: " * The {@code RestApiController} class contains the endpoints implementation for the application.",
                isHighlight: true,
                highlightColor: "red",
                popBoxText: "Missing @Class and @param and @throws",
            },
            {
                lineNumber: 19,
                code: " */",
                isHighlight: true,
                highlightColor: "red",
                popBoxText: "Missing @Class and @param and @throws",
            },
            {
                lineNumber: 20,
                code: "@RestController",
                isHighlight: false,
            },
            {
                lineNumber: 21,
                code: "public class RestApiController {",
                isHighlight: false,
            },
            {
                lineNumber: 22,
                code: "",
                isHighlight: false,
            },
            {
                lineNumber: 23,
                code: "    /**",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 24,
                code: "     * Good documentation",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 25,
                code: "     *",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 26,
                code: "     * @param serviceCode the service code extracted from the path variable.",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 27,
                code: "     * @param useCase the use case extracted from the path variable.",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 28,
                code: "     * @param httpServletRequest the HTTP servlet request object.",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 29,
                code: "     * @param <T> the type parameter extending RestApiResponse.",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 30,
                code: "     * @return the response of type T, which extends RestApiResponse. Which is required by the frontend.",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 31,
                code: "     * @throws IOException if an I/O exception occurs during the execution.",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 32,
                code: "     */",
                isHighlight: true,
                highlightColor: "green",
                popBoxText: "Good documentation",
            },
            {
                lineNumber: 33,
                code: "    @PostMapping('/api/{serviceCode}/{useCase}')",
                isHighlight: false,
            },
            {
                lineNumber: 34,
                code: "    @CrossOrigin('*')",
                isHighlight: false,
            },
            {
                lineNumber: 35,
                code: "    public <T extends RestApiResponse> T post(",
                isHighlight: false,
            },
            {
                lineNumber: 36,
                code: "            @PathVariable('serviceCode') final String serviceCode,",
                isHighlight: false,
            },
            {
                lineNumber: 37,
                code: "            @PathVariable('useCase') final String useCase,",
                isHighlight: false,
            },
            {
                lineNumber: 38,
                code: "            final HttpServletRequest httpServletRequest) throws IOException {",
                isHighlight: false,
            },
            {
                lineNumber: 39,
                code: "        IUseCaseImplementation serviceAdaptor = UseCasesAdaptorFactory",
                isHighlight: false,
            },
            {
                lineNumber: 40,
                code: "                .getAdaptor(Objects.requireNonNull(ServiceEnum.findByServiceName(serviceCode)),",
                isHighlight: false,
            },
            {
                lineNumber: 41,
                code: "                        UseCasesEnums.getEnumByString(useCase));",
                isHighlight: false,
            },
            {
                lineNumber: 42,
                code: "        return (T) serviceAdaptor.execute(httpServletRequest);",
                isHighlight: false,
            },
            {
                lineNumber: 43,
                code: "    }",
                isHighlight: false,
            },
            {
                lineNumber: 44,
                code: "}",
                isHighlight: false,
            },
        ]
    }

    const [lineOfCodes, setLineOfCodes] = useState([]);

    useEffect(() => {
        setLineOfCodes(apiResponse.lineOfCodes || []);
    }, []);

    return (
        <Container>
            <MainContainer>
                <TopContainer>
                    <HeaderContainer>
                        <Source style={{ color: "#F8D775" }}/>
                        <ProjectName>{projectName}</ProjectName>
                        <ChevronRight/>
                        <Path>{className}</Path>
                    </HeaderContainer>
                    <NumberOfLines>
                        Lines: {apiResponse.lineOfCodes.length || 0}
                    </NumberOfLines>
                    <Coverage>
                        Coverage: {apiResponse.coverage}
                    </Coverage>
                </TopContainer>
                <BottomContainer>
                    {
                        lineOfCodes.length > 0 &&
                        lineOfCodes.map((codeRow) => (
                        <CodeRow
                            key={codeRow.lineNumber}
                            lineNumber={codeRow.lineNumber}
                            code={codeRow.code}
                            isHighlight={codeRow.isHighlight}
                            highlightColor={codeRow.highlightColor}
                            popOverText={codeRow.popBoxText}
                        />
                    ))}
                </BottomContainer>
            </MainContainer>
        </Container>
    );
};

export default CodeView;
