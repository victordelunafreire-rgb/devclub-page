import styled from 'styled-components';

export const HeroContainer = styled.section`
    height: 100vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;

    background: ${(props) => props.theme.background};
`;

export const GlowBackground = styled.div`
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);

    width: 600px;
    height: 400px;

    background: ${(props) => props.theme.primary};
    opacity: 0.25;
    filter: blur(120px);

    border-radius: 50%;
`;

export const Title = styled.h1`
    position: relative;
    z-index: 1;

    font-family: ${(props) => props.theme.headingFont};
    font-size: 72px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};
    text-align: center;

    max-width: 900px;
`;

export const Signature = styled.p`
    position: absolute;
    bottom: 32px;
    right: 48px;
    z-index: 1;

    font-family: ${(props) => props.theme.headingFont};
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme.textSecondary};

    span {
        color: ${(props) => props.theme.primary};
    }
`;

export const VideoBackground = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    object-fit: cover;

    z-index: 0;
    opacity: 0.4;
`;
