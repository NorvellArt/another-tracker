import styled from "styled-components";

const StyledButton = styled.button`
    background: transparent;
    border-radius: 6px;
    border: 3px solid #0593a2;
    color: #0593a2;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    height: 40px;
    font-weight: 600;

    &:hover {
        cursor: pointer;
    }
`;

interface Props {
    onClick: () => void;
    children: React.ReactNode;
}

const Button: React.FC<Props> = ({ onClick, children }) => {
    return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
