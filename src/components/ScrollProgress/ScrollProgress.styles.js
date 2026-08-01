import styled from 'styled-components';

export const ProgressWrapper = styled.div`
    position: fixed;
    top: 50%;
    right: 32px;
    transform: translateY(-50%);

    width: 16px;
    height: 220px;

    z-index: 10;
    pointer-events: none;

    @media (max-width: 796px) {
        display: none;
    }
`;

export const CapsuleTrack = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    width: 6px;
    height: 100%;

    background: ${(props) => props.theme.primary};
    opacity: 0.25;
    border-radius: 999px;
`;

export const ProgressThumb = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    width: 16px;
    height: 16px;
    border-radius: 50%;

    background: ${(props) => props.theme.primary};
    box-shadow: 0 0 8px 2px ${(props) => props.theme.primaryGlow};
`;
