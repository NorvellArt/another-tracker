import styled from 'styled-components';

interface Props {
    onClick: () => void;
    children: React.ReactNode;
    color?: string;
}

const Button: React.FC<Props> = ({ onClick, children, color }) => {
    return (
        <StyledButton onClick={onClick} color={color || 'primary'}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    background: transparent;
    border-radius: 6px;
    border: 3px solid #0593a2;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    height: 40px;
    font-weight: 600;
    cursor: pointer;
    color: ${(props) => {
        switch (props.color) {
            case 'primary':
                return '#fff';
            case 'secondary':
                return '#0593a2';
            default:
                '#fff';
        }
    }};
    background-color: ${(props) => {
        switch (props.color) {
            case 'primary':
                return '#0593a2';
            case 'secondary':
                return '#fff';
            default:
                '#0593a2';
        }
    }};
`;

export default Button;
