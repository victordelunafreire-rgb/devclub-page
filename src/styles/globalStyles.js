import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${(props) => props.theme.background};
        color: ${(props) => props.theme.textPrimary};
        font-family: ${(props) => props.theme.bodyFont};
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${(props) => props.theme.headingFont};
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
        border: none;
        background: none;
        font-family: inherit;
    }

    ul, ol {
        list-style: none;
    }

    section {
        scroll-margin-top: 96px;
    }
`;
