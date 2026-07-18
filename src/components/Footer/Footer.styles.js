import styled from 'styled-components';

export const FooterContainer = styled.footer`
    width: 100%;

    padding: 64px;

    background: ${(props) => props.theme.backgroundElevated};
    border-top: 1px solid ${(props) => props.theme.border};
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 48px;

    max-width: 1200px;
    margin: 0 auto;

    padding-bottom: 48px;
`;

export const Logo = styled.p`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 24px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    span {
        color: ${(props) => props.theme.primary};
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

    margin-bottom: 8px;
`;

export const FooterLink = styled.a`
    font-size: 14px;
    color: ${(props) => props.theme.textSecondary};
    transition: ${(props) => props.theme.transitionDefault};
    cursor: pointer;


    &:hover {
        color: ${(props) => props.theme.textPrimary};
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
