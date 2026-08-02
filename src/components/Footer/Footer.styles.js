import styled from 'styled-components';

export const FooterContainer = styled.footer`
    width: 100%;

    padding: 64px;

    background: ${(props) => props.theme.backgroundElevated};
    border-top: 1px solid ${(props) => props.theme.border};

    @media (max-width: 796px) {
        padding: 48px 24px;
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 48px;

    max-width: 1200px;
    margin: 0 auto;

    padding-bottom: 48px;

    @media (max-width: 796px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }
`;

export const Logo = styled.p`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 24px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    span {
        color: ${(props) => props.theme.primary};
    }

    @media (max-width: 796px) {
        grid-column: 1 / -1;
    }
`;

export const LinkColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ColumnTitle = styled.p`
    font-family: ${(props) => props.theme.monoFont};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${(props) => props.theme.textSecondary};

    /* Matches the links' own padding so the column stays visually aligned. */
    padding-left: 16px;
    margin-bottom: 8px;
`;

export const FooterLink = styled.a`
    /* Hugs its own text instead of stretching the column, so the pill outline
       wraps the label rather than the whole width. */
    align-self: flex-start;

    font-size: 14px;
    color: ${(props) => props.theme.textSecondary};
    cursor: pointer;

    /* Same idle-transparent pill as the header, so hovering never reflows. */
    padding: 6px 16px;
    border: 1px solid transparent;
    border-radius: 999px;
    background: transparent;

    transition: ${(props) => props.theme.transitionDefault};

    &:hover {
        background: ${(props) => props.theme.primary};
        border-color: ${(props) => props.theme.primary};
        color: ${(props) => props.theme.background};
    }
`;

export const SocialRow = styled.div`
    display: flex;
    gap: 12px;

    padding-left: 16px;
`;

export const SocialLink = styled.a`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => props.theme.textSecondary};
    border: 1px solid ${(props) => props.theme.border};
    background: transparent;

    transition: ${(props) => props.theme.transitionDefault};

    &:hover {
        background: ${(props) => props.theme.primary};
        border-color: ${(props) => props.theme.primary};
        color: ${(props) => props.theme.background};
    }
`;

export const CopyRight = styled.p`
    font-size: 13px;
    color: ${(props) => props.theme.textSecondary};

    text-align: center;

    padding-top: 24px;
    border-top: 1px solid ${(props) => props.theme.border};

    max-width: 1200px;
    margin: 0 auto;
`;
