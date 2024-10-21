import { device } from '@/types/device';
import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    margin: auto;
    padding-top: 16px;

    @media ${device.mobile} {
        max-width: 380px;
    }

    @media ${device.tablet} {
        max-width: 750px;
    }

    @media ${device.desktop} {
        max-width: 1320px;
    }
`;