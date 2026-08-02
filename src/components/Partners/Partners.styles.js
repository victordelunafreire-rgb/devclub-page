import styled from 'styled-components';
import { CELL_HEIGHT, LOGO_BASE_SIZE, PARTNER_COLUMNS } from './Partners.data';

export const PartnerContainer = styled.section`
    width: 100%;
    padding: 96px 0;

    position: relative;

    background: ${(props) => props.theme.background};
    overflow: hidden;
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 32px;
    color: ${(props) => props.theme.textSecondary};

    text-align: center;
    margin-bottom: 48px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${PARTNER_COLUMNS}, 1fr);
    gap: 48px 32px;

    max-width: 1100px;
    margin: 0 auto;
    padding: 0 32px;

    @media (max-width: 796px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 32px 16px;
    }
`;

// The cell is a fixed envelope and clips its contents, which is what lets the
// incoming logo rise from below and the outgoing one leave through the top.
export const Cell = styled.div`
    position: relative;
    height: ${CELL_HEIGHT}px;
    overflow: hidden;
`;

export const LogoLayer = styled.div`
    position: absolute;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => props.theme.textPrimary};

    svg {
        /* Simple Icons share a square viewBox, so the box is sized on one axis
           and the mark keeps its own proportions inside it — nothing is ever
           stretched; the scale only corrects perceived weight. */
        height: ${(props) => LOGO_BASE_SIZE * (props.$scale ?? 1)}px;
        width: auto;
        max-width: 100%;
    }
`;
