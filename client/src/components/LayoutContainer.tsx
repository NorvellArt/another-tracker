import styled from 'styled-components';
import { device } from '@/types/device';

const Container = styled.div`
    height: 100vh;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.mobile} {
        max-width: 380px;
    }

    @media ${device.tablet} {
        max-width: 750px;
    }

    @media ${device.desktop} {
        max-width: 1780px;
    }
`;

interface Props {
    children: React.ReactNode;
}

const LayoutContainer: React.FC<Props> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default LayoutContainer;
