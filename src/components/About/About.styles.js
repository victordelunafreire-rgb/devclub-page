import styled from 'styled-components';

export const AboutContainer = styled.section`
    min-height: 80vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 64px;

    padding: 0 64px;

    background: ${(props) => props.theme.backgroundElevated};
`;

export const ImagePlaceholder = styled.div`
    flex-shrink: 0;
    width: 480px;
    aspect-ratio: 16 / 9;

    background-image: ${(props) =>
			props.$photo
				? `linear-gradient(
    to bottom,
    rgba(255, 107, 74, 0.25),
    rgba(15, 14, 23, 0.85)
    ), url(${props.$photo})`
				: `linear-gradient(
    135deg,
    ${props.theme.border},
    ${props.theme.backgroundElevated}
    )`};

        background-size: cover;
        background-position: 90% top;

        filter: grayscale(30%) contrast(1.1);

        border-radius: 16px;
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
