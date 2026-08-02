import styled from 'styled-components';

export const ProgramsContainer = styled.section`
    height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;

    padding-top: 110px;

    overflow: hidden;
    position: relative;

    background: ${(props) => props.theme.background};

    @media (max-width: 768px) {
        height: auto;
        min-height: auto;
        padding: 80px 0;
    };
`;

export const ParticlesArea = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;

    pointer-events: none;
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 48px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    padding-left: 64px;
    margin-bottom: 64px;
`;

export const CardStack = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    padding-left: 64px;
    max-width: 480px;

    @media (max-width: 768px) {
        padding-left: 24px;
        padding-right: 24px;
        max-width: 100%;
        gap: 16px;
    }
`;

export const CardReveal = styled.div``;

export const Card = styled.div`
    position: relative;
    width: 100%;
    height: 150px;
    padding: 28px;
    overflow: hidden;

    background: ${(props) => props.theme.backgroundElevated};
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 16px;

    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    transform-origin: center;

    &:hover {
        transform: scale(1.15) translateY(-8px);
        border-color: ${(props) => props.theme.primary};
        box-shadow: 0 20px 40px rgba(255, 107, 74, 0.25);
        z-index: 1;
    }

    @media (max-width: 796px) {
        height: auto;
    }
`;

export const IconWrapper = styled.div`
    position: absolute;
    top: 14px;
    right: 14px;

    width: 36px;
    height: 36px;

    filter: drop-shadow(0 0 8px ${(props) => props.theme.primaryGlow})
`;

export const IconGlyph = styled.div`
    position: absolute;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CheckBadge = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
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
