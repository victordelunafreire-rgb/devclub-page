import styled from 'styled-components';

export const StudentsContainer = styled.section`
    min-height: 100vh;
    width: 100%;

    position: relative;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 128px 64px;

    background: ${(props) => props.theme.backgroundElevated};
    perspective: 1500px;
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 48px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    text-align: center;

    position: relative;
    z-index: 2;
`;

export const SpiralLayer = styled.div`
    position: absolute;
    inset: 0;

    transform-style: preserve-3d;
    pointer-events: none;

    z-index: 1;
`;

export const SpiralCard = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;

    will-change: transform, opacity;
`;

export const CardFrame = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    background: ${(props) => props.theme.background};
    border: 1px solid ${(props) => props.theme.border};

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid ${(props) => props.theme.primary};
        z-index: 1;
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
    width: 100%;
    height: 100%;

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
`;

export const Caption = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    padding: 10px 12px;

    background: linear-gradient(
        to top,
        rgba(15, 14, 23, 0.95),
        rgba(15, 14, 23, 0)
    );
`;

export const Name = styled.h3`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 15px;
    color: ${(props) => props.theme.textPrimary};

    margin-bottom: 2px;
`;

export const DataRow = styled.p`
    font-family: ${(props) => props.theme.monoFont};
    font-size: 11px;
    color: ${(props) => props.theme.primary};
`;

export const Stamp = styled.span`
    position: absolute;
    top: 8px;
    right: 8px;

    padding: 3px 7px;

    font-family: ${(props) => props.theme.monoFont};
    font-size: 9px;
    text-transform: uppercase;

    border: 1px dashed
    ${(props) => (props.$hired ? props.theme.secondary : props.theme.primary)};
    color: ${(props) => (props.$hired ? props.theme.secondary : props.theme.primary)};

    transform: rotate(-8deg);
    background: ${(props) => props.theme.background};

    z-index: 2;
`;
