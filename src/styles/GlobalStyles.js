import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    font-family: ${({ theme }) => theme.fonts.main};
    line-height: 1.5;
    font-weight: 400;

    --primary: #007664;
    --primary-hover: #005a4c;
    --primary-dark: #1A4B4B;
    --secondary: #e6f0ee;
    --secondary-hover: #d0e3e0;
    
    --background: #F4F7F6;
    --text-main: #101828;
    --text-secondary: #344054;
    --text-muted: #667085;
    
    --border: #cbd5e1;
    --border-focus: #007664;

    --danger: #E53E3E;
    --danger-bg: #FFF5F5;
    --success: #38A169;
    --success-bg: #E6F4EA;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
