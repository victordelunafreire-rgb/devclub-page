import styled from 'styled-components';

export const TrailWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    pointer-events: none;
    z-index: -1;
`;

export const PinnedSectionBackdrop = styled.div`
    position: absolute;
    left: 0;
    width: 100%;

    background: ${(props) => props.theme.background};
`;

export const TrailSvg = styled.svg`
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
`;

export const TrailHalo = styled.path`
    fill: none;
    stroke: ${(props) => props.theme.primary};
    stroke-width: 18px;
    stroke-linecap: round;
    opacity: 0.35;
    filter: blur(10px);
`;

export const TrailCore = styled.path`
    fill: none;
    stroke: ${(props) => props.theme.primary};
    stroke-width: 2.5px;
    stroke-linecap: round;
    filter: drop-shadow(0 0 4px ${(props) => props.theme.primaryGlow});
`;

export const MarkerGlow = styled.circle`
    fill: ${(props) => props.theme.primary};
    opacity: 0.35;
    filter: blur(8px);
`;

export const MarkerCore = styled.circle`
    fill: url(#trail-marker-gradient);
    stroke: ${(props) => props.theme.primary};
    stroke-width: 1.5px;
    filter: drop-shadow(0 0 6px ${(props) => props.theme.primaryGlow});
`;
