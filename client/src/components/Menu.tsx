import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Menu: React.FC = () => {
    const navigate = useNavigate();

    return (
        <StyledMenu>
            <MenuButton onClick={() => navigate('projects')}>{'Projects'}</MenuButton>
            <MenuButton onClick={() => navigate('profile')}>{'Profile'}</MenuButton>
        </StyledMenu>
    );
};

const StyledMenu = styled.div`
    width: 390px;
    height: 60px;
    border-radius: 18px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 16px;
    left: 50%;
    translate: -50%;
    display: flex;
    overflow: hidden;
`;

const MenuButton = styled.button`
    width: 100%;
    outline: none;
    border: none;
    cursor: pointer;
    color: #0593a2;
    background-color: transparent;
    font-weight: 600;

    &:hover {
        background-color: #0592a229;
    }
`;

export default Menu;
