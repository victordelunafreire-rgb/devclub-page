import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const ProgramsContainer = styled.section`
    min-height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 128px 0;

    background: ${(props) => props.theme.background};
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 48px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    text-align: center;
    margin-bottom: 64px;
`;

export const StyledSwiper = styled(Swiper)`
    width: 100%;
    padding: 40px 0;
`;

export const Card = styled.div`
    width: 320px;
    padding: 32px;

    background: ${(props) => props.theme.backgroundElevated};
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 16px;
`;

export const CardTitle = styled.h3`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 24px;
    color: ${(props) => props.theme.primary};

    margin-bottom: 12px;
`;

export const CardDescription = styled.p`
    font-size: 16px;
    color: ${(props) => props.theme.textSecondary};
    line-height: 1.5;
`;
