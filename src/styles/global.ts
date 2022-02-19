import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%; // 15px
        }

        @media (max-width: 720px) {
            font-size: 87.5%; // 14px
        }
    }

    body {
        background: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text_body};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: bold;
        color: ${(props) => props.theme.colors.text_title};
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 1000;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 30vw;
        min-height: 30vh;
        background-color: ${(props) => props.theme.colors.themeColor};
        color: ${(props) => props.theme.colors.text_body};
        border-radius: 0.25rem;

        div.header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: ${(props) => props.theme.colors.background};
            padding: 1rem;
            border-radius: 0.25rem 0.25rem 0 0;
            border-bottom: 1px solid ${(props) => props.theme.colors.shape};
            font-weight: bold;
         

            .close-modal:hover {
                cursor: pointer;
                fill: ${(props) => props.theme.colors.shape_dark};
                transition: 0.2s;
            }
        }

        div.footer {
            display: flex;
            justify-content: end;
            width: 100%;
            gap: 20px;
            padding: 10px;
            border-radius: 0 0 0.25rem 0.25rem;
            border-top: 1px solid ${(props) => props.theme.colors.shape};

            button {
                height: 40px;
                width: 5.5rem;
                border: 1px solid ${(props) => props.theme.colors.shape};
                background-color: ${(props) => props.theme.colors.shape};
                border-radius: 0.25rem;
                color: ${(props) => props.theme.colors.text_body};
            }

            button:last-child {
                background-color: ${(props) => props.theme.colors.primary};
                color: #ffffff;
            }
        }

        form {
            display: flex;
            flex-direction: column;

            input[type="text"] {
                height: 30px;
                border-radius: 0.25rem;
                padding: 10px;
                border: 1px solid ${(props) => props.theme.colors.shape};
                background-color: ${(props) => props.theme.colors.background};
                color: ${(props) => props.theme.colors.text_body};
            }

            select {
                height: 40px;
                border-radius: 0.25rem;
                padding: 10px;
                border: 1px solid ${(props) => props.theme.colors.shape};
                background-color: ${(props) => props.theme.colors.background};
                color: ${(props) => props.theme.colors.text_body};
            }
        }
    }
    
    .tooltip {
        margin: 0 !important;
        padding: 0 !important;
        border-radius: 0.35rem !important;
        pointer-events: auto !important;
        border: 1px solid ${(props) => props.theme.colors.shape};
        -webkit-box-shadow: -1px 6px 10px -2px rgba(0, 0, 0, 0.2);
        box-shadow: -1px 6px 10px -2px rgba(0, 0, 0, 0.2);
        color: ${(props) => props.theme.colors.text_body};
    }

    .tooltip-wrapper {
        background-color: transparent;
        padding: 10px;
    }
    
`;
