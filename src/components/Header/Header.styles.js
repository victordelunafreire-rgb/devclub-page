import styled from 'styled-components';

export const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 24px 64px;

    background: rgba(15, 14, 23, 0.85);
    backdrop-filter: blur(12px);
    transition: ${(props) => props.theme.transitionDefault};
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

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 40px;
`;

export const NavLink = styled.a`
    font-size: 16px;
    color: ${(props) => props.theme.textSecondary};
    transition: ${(props) => props.theme.transitionDefault};

    &:hover {
        color: ${(props) => props.theme.textPrimary};
    }
`;

export const CTAButton = styled.button`
    padding: 12px 24px;
    border-radius: 8px;
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
    font-size: 14px;
    font-weight: 700;
    transition: ${(props) => props.theme.transitionDefault};

    &:hover {
        opacity: 0.9;
    }
`;
