import styled from 'styled-components';

export const ProgramsContainer = styled.section`
    height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    overflow: hidden;
    position: relative;

    background: ${(props) => props.theme.background};
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 48px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    padding-left: 64px;
    margin-bottom: 64px;
`;

export const Track = styled.div`
    display: flex;
    gap: 40px;

    padding-left: 64px;
    padding-right: 64px;

    width: fit-content;
`;

export const Card = styled.div`
    flex-shrink: 0;
    width: 380px;
    padding: 40px;

    background: ${(props) => props.theme.backgroundElevated};
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 16px;

    transition: ${(props) => props.theme.transitionDefault};
    transform-origin: center;

    &:hover {
        transform: scale(1.15) translateY(-8px);
        border-color: ${(props) => props.theme.primary};
        box-shadow: 0 20px 40px rgba(255, 107, 74, 0.25);
        z-index: 1;
        position: relative;
    }
`;

export const CardTitle = styled.h3`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 28px;
    color: ${(props) => props.theme.primary};

    margin-bottom: 16px;
`;

export const CardDescription = styled.p`
    font-size: 17px;
    color: ${(props) => props.theme.textSecondary};
    line-height: 1.5;
`;
