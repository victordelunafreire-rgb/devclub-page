import styled, { keyframes } from 'styled-components';

export const PartnerContainer = styled.section`
    width: 100%;
    padding: 96px 0;

    background: ${(props) => props.theme.background};
    overflow: hidden;
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size:32px;
    color: ${(props) => props.theme.textSecondary};

    text-align: center;
    margin-bottom: 48px;
`;

const scroll = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
`;

export const Track = styled.div`
    display: flex;
    width: fit-content;

    animation: ${scroll} 30s linear infinite;
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 200px;
    height: 80px;
    margin: 0 32px;

    img {
        height: 48px;
        width: auto
    }
`;

export const Wordmark = styled.p`
    font-family: ${(props) => props.theme.monoFont};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;

    color: ${(props) => props.theme.textSecondary};
    padding: 8px 16px;

    border: 1px solid ${(props) => props.theme.border};
    border-radius: 4px;
`;
