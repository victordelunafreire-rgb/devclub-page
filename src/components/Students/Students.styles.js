import styled from 'styled-components';

export const StudentsContainer = styled.section`
    min-height: 100vh;
    width: 100%;

    padding: 128px 64px;

    background: ${(props) => props.theme.backgroundElevated};
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
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;

    max-width: 1200px;
    margin: 0 auto;
`;

export const Card = styled.div`
    position: relative;

    padding: 24px;

    background: ${(props) => props.theme.background};
    border: 1px solid ${(props) => props.theme.border};

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid ${(props) => props.theme.primary};
    }

    &::before {
        top: -1px;
        left: -1px;
        border-right: none;
        border-bottom: none;
    }

    &::after {
        bottom: -1px;
        right: -1px;
        border-left: none;
        border-top: none;
    }
`;

export const Photo = styled.div`
    width: 96px;
    height: 128px;

    background-image: ${(props) =>
			props.$photo
				? `linear-gradient(
    to bottom,
    rgba(255, 107, 74, 0.25),
    rgba(15, 14, 23, 0.85)
    ), url(${props.$photo})`
				: `linear-gradient(
    135deg,
    ${props.theme.backgroundElevated},
    ${props.theme.border}
    )`};

    background-size: cover;
    background-position: center top;

    filter: grayscale(30%) contrast(1.1);

    margin-bottom: 16px;
`;

export const Name = styled.h3`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 20px;
    color: ${(props) => props.theme.textPrimary};

    margin-bottom: 8px;
`;

export const DataRow = styled.p`
    font-family: ${(props) => props.theme.monoFont};
    font-size: 13px;
    color: ${(props) => props.theme.textSecondary};

    span {
        color: ${(props) => props.theme.primary}
    }
`;

export const Stamp = styled.span`
    position: absolute;
    top: -12px;
    right: -12px;

    padding: 4px 10px;

    font-family: ${(props) => props.theme.monoFont};
    font-size: 11px;
    text-transform: uppercase;

    border: 1px dashed
    ${(props) => (props.$hired ? props.theme.secondary : props.theme.primary)};
    color: ${(props) => (props.$hired ? props.theme.secondary : props.theme.primary)};

    transform: rotate(-8deg);
    background: ${(props) => props.theme.background}
`;
