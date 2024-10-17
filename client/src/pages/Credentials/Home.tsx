import LayoutContainer from "@/components/LayoutContainer";
import Button from "@/components/sharedComponents/Buttons/Button";
import CredentialsForm from "@/components/sharedComponents/CredentialsForm";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title } from "@/pages/Credentials/components/Title";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <LayoutContainer>
            <CredentialsForm>
                <Title>ANOTHER TRACKER</Title>
                <ButtonsContainer>
                    <Button onClick={() => navigate('/login')}>{"Login"}</Button>
                    <Button onClick={() => console.log("dasdasdasd")}>{"Sign Up"}</Button>
                </ButtonsContainer>
            </CredentialsForm>
        </LayoutContainer>
    );
};

const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
`;
export default Home;
