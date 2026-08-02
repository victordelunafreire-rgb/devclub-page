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
    /* The links carry their own horizontal padding now, so the gap is reduced
       to keep the spacing between labels the same as before. */
    gap: 8px;

    @media (max-width: 796px) {
        display: none;
    }
`;

export const NavLink = styled.a`
    font-size: 16px;
    color: ${(props) => props.theme.textSecondary};

    /* The pill is always present, only transparent when idle, so hovering
       never shifts the layout. */
    padding: 8px 16px;
    border: 1px solid transparent;
    border-radius: 999px;
    background: transparent;

    transition: ${(props) => props.theme.transitionDefault};

    &:hover {
        background: ${(props) => props.theme.primary};
        border-color: ${(props) => props.theme.primary};
        /* Dark text on the filled pill, same contrast pairing as the CTA. */
        color: ${(props) => props.theme.background};
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

    @media (max-width: 796px) {
        display: none;
    }
`;

export const MenuButton = styled.button`
    display: none;

    @media (max-width: 796px) {
        display: flex;
        flex-direction: column;
        gap: 5px;
        z-index: 101;

        span {
            width: 24px;
            height: 2px;
            background: ${(props) => props.theme.textPrimary};
            transition: ${(props) => props.theme.transitionDefault};
        }
    }
`;

export const MobileMenu = styled.div`
    display: none;

    @media (max-width: 796px) {
        display: ${(props) => (props.$open ? 'flex' : 'none')};
        flex-direction: column;
        align-items: center;
        gap: 24px;

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;

        padding-top: 120px;

        background: ${(props) => props.theme.background};
        z-index: 100;
    }
`;
