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
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .new-project-modal {
        form {
            display: flex;
            flex-direction: column;

            div:not(:last-child) {
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 20px;

                label {
                    font-size: 0.9rem;
                    font-weight: bold;
                }

                input[type="color"] {
                    -webkit-appearance: none;
                    background-color: transparent;
                    border: none;
                    width: 32px;
                    height: 32px;
                }

                input[type="color"]::-webkit-color-swatch-wrapper {
                    padding: 0;
                    background-color: transparent;
                    border-radius: 10rem;
                    
                }
                
                input[type="color"]::-webkit-color-swatch {
                    border: none;
                    border-radius: 10rem;
                }
            }

            .buttons {
                display: flex;
                justify-content: end;
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
                }

                button[type="submit"] {
                    background-color: ${(props) => props.theme.colors.primary};
                    color: #fff;
                }
            }
        }
    }

    .react-modal-content {
        width: 30vw;
        min-height: 30vh;
        background-color: ${(props) => props.theme.colors.themeColor};
        color: ${(props) => props.theme.colors.text_body};
        border-radius: 0.25rem;

        div.title {
            background-color: ${(props) => props.theme.colors.background};
            padding: 1rem;
            border-radius: 0.25rem 0.25rem 0 0;
            border-bottom: 1px solid ${(props) => props.theme.colors.shape};
            font-weight: bold;
            margin-bottom: 20px;
        }

        form {
            input[type="text"] {
                height: 30px;
                border-radius: 0.25rem;
                padding: 10px;
                border: 1px solid ${(props) => props.theme.colors.shape};
                background-color: ${(props) => props.theme.colors.background};
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
    }

    .tooltip-wrapper {
        background-color: transparent;
        padding: 10px;
    }
    
`;
