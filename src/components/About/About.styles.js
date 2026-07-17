import styled from 'styled-components';

export const AboutContainer = styled.section`
    min-height: 80vh;
    width: 100%;

    display: flex;
    align-items: center;

    padding: 0 64px;

    background: ${(props) => props.theme.backgroundElevated};
`;

export const Content = styled.div`
    max-width: 700px;
`;

export const Title = styled.h2`
    font-family: ${(props) => props.theme.headingFont};
    font-size: 48px;
    font-weight: 700;
    color: ${(props) => props.theme.textPrimary};

    margin-bottom: 24px;
`;

export const Text = styled.p`
    font-size: 20px;
    color:${(props) => props.theme.textSecondary};
    line-height: 1.6;
`;
