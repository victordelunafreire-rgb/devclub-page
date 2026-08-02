import styled from 'styled-components';

export const MentorsContainer = styled.section`
    min-height: 100vh;
    width: 100%;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 100px 64px;

    background: ${(props) => props.theme.background};
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 48px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    text-align: center;
    margin-bottom: 48px;
`;

export const Hint = styled.p`
    font-family: ${(props) => props.theme.monoFont};
    font-size: 13px;
    color: ${(props) => props.theme.textSecondary};

    margin-bottom: 40px;
`;

// Every card is anchored at the same spot along the bottom edge; the fan arc
// comes entirely from each card's own rotation around a far-below origin.
export const FanStage = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 520px;

    @media (max-width: 1100px) {
        transform: scale(0.72);
    }

    @media (max-width: 796px) {
        transform: scale(0.48);
    }
`;

// Rotation (fan geometry) lives on the slot, scale (highlight) on the card
// inside it. They need different transform origins — a far-below pivot for the
// arc, the card's own centre for the highlight — and one element can only carry
// a single transform-origin, so scaling the rotated element would drag the card
// along the arc instead of growing it where it stands.
export const FanSlot = styled.div`
    position: absolute;
    /* Lifted off the stage floor: rotating around the far pivot drops the outer
       cards well below the centre one, and that drop needs room inside the
       stage or the fan's edges get clipped. */
    bottom: 140px;
    left: 50%;
    margin-left: -110px;

    width: 220px;
    height: 340px;
`;

export const FanCard = styled.button`
    width: 100%;
    height: 100%;

    position: relative;
    display: block;
    padding: 0;
    border: 2px solid ${(props) => props.theme.border};
    border-radius: 20px;
    overflow: hidden;

    background: ${(props) => props.theme.backgroundElevated};
    /* The reveal is driven by hover, not by clicking, so the cursor stays
       neutral instead of advertising a click target. */
    cursor: default;

    /* Transforms belong to GSAP alone — a CSS transition here would fight it. */
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &[data-selected='true'] {
        border-color: ${(props) => props.theme.primary};
        box-shadow: 0 24px 48px rgba(255, 107, 74, 0.3);
    }

    &:focus-visible {
        outline: 2px solid ${(props) => props.theme.primary};
        outline-offset: 4px;
    }
`;

export const Portrait = styled.div`
    position: absolute;
    inset: 0;

    background-image: ${(props) =>
			props.$photo
				? `linear-gradient(
    to bottom,
    rgba(255, 107, 74, 0.2),
    rgba(15, 14, 23, 0.7)
    ), url(${props.$photo})`
				: `linear-gradient(
    135deg,
    ${props.theme.border},
    ${props.theme.backgroundElevated}
    )`};

    background-size: cover;
    background-position: center top;

    filter: grayscale(30%) contrast(1.1);
`;

// Wraps everything that only the selected card reveals, so the tag and the
// details fade together as one unit.
export const Reveal = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
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

export const Details = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    padding: 16px 14px 14px;
    text-align: left;

    background: linear-gradient(
        to top,
        rgba(15, 14, 23, 0.97) 55%,
        rgba(15, 14, 23, 0)
    );
`;

export const Name = styled.h3`
    font-family: ${(props) => props.theme.impactFont};
    font-size: 22px;
    color: ${(props) => props.theme.textPrimary};
    letter-spacing: 1px;
`;

export const Role = styled.p`
    font-size: 12px;
    color: ${(props) => props.theme.textSecondary};

    margin-bottom: 12px;
`;

export const StatRow = styled.div`
    margin-bottom: 6px;
`;

export const StatLabel = styled.p`
    font-family: ${(props) => props.theme.monoFont};
    font-size: 10px;
    color: ${(props) => props.theme.textSecondary};

    margin-bottom: 3px;
`;

export const StatBarBackground = styled.div`
    width: 100%;
    height: 5px;

    background: ${(props) => props.theme.border};
`;

export const StatBarFill = styled.div`
    height: 100%;
    width: ${(props) => props.$value}%;

    background: ${(props) => props.theme.primary};
`;
