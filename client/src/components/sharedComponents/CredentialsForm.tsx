import styled from "styled-components";

const Card = styled.div`
    width: 310px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
`;

interface Props {
    children: React.ReactNode;
}

const CredentialsForm: React.FC<Props> = ({ children }) => {
    return <Card>{children}</Card>;
};

export default CredentialsForm;
