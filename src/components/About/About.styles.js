import styled from 'styled-components';

export const AboutContainer = styled.section`
    min-height: 80vh;
    width: 100%;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 64px;

    padding: 0 64px;

    background: ${(props) => props.theme.backgroundElevated};

    @media (max-width: 796px) {
        flex-direction: column;
        padding: 80px 24px;
        text-align: center;
        gap: 40px;
    }
`;

export const ImagePlaceholder = styled.div`
    flex-shrink: 0;
    width: 480px;
    height: 400px;
    position: relative;

    border-radius: 16px;
    overflow: hidden;

    border: 2px solid ${(props) => props.theme.primary};
    box-shadow: 0 0 24px ${(props) => props.theme.primaryGlow};

    @media (max-width: 796px) {
        width: 100%;
        max-width: 340px;
        height: 320px;
    }
`;

export const ImageLayerBase = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: ${(props) =>
			props.$photo
				? `linear-gradient(
    to bottom,
    rgba(255, 107, 74, 0.25),
    rgba(15, 14, 23, 0.85)
    ), url(${props.$photo})`
				: 'none'};

    background-size: cover;
    background-position: ${(props) => props.$position || 'center top'};

    filter: grayscale(30%) contrast(1.1);
`;

export const ImageLayerFade = styled(ImageLayerBase)`
    opacity: 0;
`;

export const Content = styled.div`
    max-width: 700px;
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 48px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    margin-bottom: 24px;
`;

export const Text = styled.p`
    font-size: 20px;
    color:${(props) => props.theme.textSecondary};
    line-height: 1.6;
`;
