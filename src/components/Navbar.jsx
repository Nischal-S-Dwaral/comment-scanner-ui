import React, {useState} from 'react';
import styled from "styled-components";
import {AccountTree, FactCheck} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const Container = styled.div `
  height: 60px;
  background-color: black;
  color: white;
`;

const Wrapper = styled.div `
  padding: 10px;
  height: 75%;
  display: flex;
  align-items: center;
`;

const Left = styled.div `
  flex: 2;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoText = styled.h2 `
  font-weight: bold;
  margin-right: 10px;
`;

const LogoImage = styled.img `
  width: 24px;
  height: 24px;
`;

const Center = styled.div `
  flex: 6;
  display: flex;
  align-items: center;
`;

const CenterNavigation = styled.div `
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  cursor: pointer;
  align-items: center;
`;

const CenterNavigationText = styled.p `
  margin-left: 5px;
`;

const Right = styled.div `
  flex: 2;
  display: flex;
  flex-direction: row-reverse;
`;

const UserNameText = styled.div `
  font-size: 16px;
  cursor: pointer;
  margin-right: 25px;
  color: white;
  font-weight: bold;
`;

const ProfileDropdown = styled.div `
  position: absolute;
  top: 65px;
  right: 2px;
  background-color: #e0dbdb;
  border-radius: 10px;
  padding: 10px 15px;
  width: 250px;
  color: black;
  border: 1px solid #837272;
  z-index: 1;
  display: flex;
  flex-direction: column;
  
  opacity: ${props => (props.active ? 1 : 0)};
  visibility: ${props => (props.active ? "visible" : "hidden")};
  transform: ${props => (props.active ? "translateY(0)" : "translateY(-20px)")};
  transition: 0.5s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: -12px;
    right: 18px;
    height: 20px;
    width: 20px;
    background-color: #e0dbdb;
    transform: rotate(45deg);
    border-left: 1px solid #837272;
    border-top: 1px solid #837272;
  }
`;

const DropdownTopContainer = styled.div `
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LetterImage = styled.div `
  flex: 1;
  height: 60px;
  width: 60px;
  background-color: #e8cba7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-right: 10px;
`;

const DropdownRightContainer = styled.div `
  flex: 2;
  display: flex;
  flex-direction: column;
  white-space: normal;
  overflow: hidden;
`;

const UserName = styled.h3 ``;

const UserEmail = styled.p ``;

const Button = styled.button `
  width: 100%;
  border: none;
  padding: 10px 10px;
  background-color: #e30903;
  color: black;
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.5s ease;
  font-size: 16px;

  &:hover {
    transform: scale(1.1);
    transform-origin: center;
    color: white;
  }
`;

const Navbar = () => {

    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleLogoClick = () => {
        navigate('/', { replace: true })
    }

    const handleProjectIconClick = () => {
        navigate('/projects', { replace: true });
    };

    const handleQualityGateIconClick = () => {
        navigate('/qualityGate', { replace: true });
    };

    return (
        <Container>
            <Wrapper>
                <Left onClick={handleLogoClick}>
                    <LogoText>Comment Scanner</LogoText>
                    <LogoImage src="/comment-scanner-icon-256.png" alt="Logo" />
                </Left>
                <Center>
                    <CenterNavigation onClick={handleProjectIconClick}>
                        <AccountTree/>
                        <CenterNavigationText>
                            Projects
                        </CenterNavigationText>
                    </CenterNavigation>
                    <CenterNavigation onClick={handleQualityGateIconClick}>
                        <FactCheck/>
                        <CenterNavigationText>
                            Quality Gates
                        </CenterNavigationText>
                    </CenterNavigation>
                </Center>
                <Right>
                    <UserNameText onClick={() => {setOpenDropdown(!openDropdown)}}>
                        Hello, Nischal
                    </UserNameText>
                    <ProfileDropdown active={openDropdown}>
                        <DropdownTopContainer>
                            <LetterImage>N</LetterImage>
                            <DropdownRightContainer>
                                <UserName>Nischal</UserName>
                                <UserEmail>nischal@gmail.com</UserEmail>
                            </DropdownRightContainer>
                        </DropdownTopContainer>
                        <Button>LOGOUT</Button>
                    </ProfileDropdown>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
