import styled from 'styled-components';

export const MentorsContainer = styled.section`
    min-height: 100vh;
    width: 100%;

    padding: 128px 64px;

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

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;

    max-width: 1200px;
    margin: 0 auto;
`;

export const Card = styled.div`
    position: relative;

    border: 2px solid ${(props) => props.theme.primary};
    background: ${(props) => props.theme.backgroundElevated};

    padding: 20px;
`;

export const PlayerTag = styled.span`
    position: absolute;
    top: 0;
    left: 0;

    padding: 4px 10px;

    font-family: ${(props) => props.theme.arcadeFont};
    font-size: 10px;
    font-weight: 700;

    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
`;

export const Portrait = styled.div`
    width: 100%;
    aspect-ratio: 1;

    margin-top: 24px;
    margin-bottom: 16px;

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
    background-position: center top;

    filter: grayscale(30%) contrast(1.1)
`;

export const Name = styled.h3`
    font-family: ${(props) => props.theme.impactFont};
    font-size: 24px;
    /* color: ${(props) => props.theme.textPrimary}; */
    letter-spacing: 1px
`;

export const Role = styled.p`
    font-size: 13px;
    color: ${(props) => props.theme.textSecondary};

    margin-bottom: 16px;
`;

export const StatRow = styled.div`
    margin-bottom: 8px;
`;

export const StatLabel = styled.p`
    font-family: ${(props) => props.theme.monoFont};
    font-size: 11px;
    color: ${(props) => props.theme.textSecondary};

    margin-bottom: 3px;
`;

export const StatBarBackground = styled.div`
    width: 100%;
    height: 6px;

    background: ${(props) => props.theme.border};
`;

export const StatBarFill = styled.div`
    height: 100%;
    width: ${(props) => props.$value}%;

    background: ${(props) => props.theme.primary};
`;
