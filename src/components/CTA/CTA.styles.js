import styled from 'styled-components';

export const CTAContainer = styled.section`
    min-height: 60vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;

    padding: 64px;

    background: ${(props) => props.theme.background};
`;

export const GlowBackground = styled.div`
    position: absolute;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);

    width: 500px;
    height: 350px;

    background: ${(props) => props.theme.primary};
    opacity: 0.2;
    filter: blur(120px);

    border-radius: 50%;
`;

export const Title = styled.h2`
    position: relative;
    z-index: 1;

    font-family: ${(props) => props.theme.headingFont};
    font-size: 56px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    text-align: center;
    max-width: 700px;
    margin-bottom: 32px;
`;

export const Button = styled.button`
    position: relative;
    z-index: 1;

    padding: 18px 40px;
    border-radius: 8px;

    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};

    font-size: 18px;
    font-weight: 700;

    transition: ${(props) => props.theme.transitionDefault};

    &:hover {
        opacity: 0.9;
    }
`;
