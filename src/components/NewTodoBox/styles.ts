import styled from "styled-components";

export const Container = styled.form`
  margin-top: 1rem;

  > div:first-child {
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.shape};
    border: 1px solid ${(props) => props.theme.colors.shape_dark};
    border-radius: 0.45rem;
    height: 50px;
    width: 55rem;
    gap: 30px;
    padding-left: 10px;

    div {
      display: flex;
      align-items: center;
      gap: 10px;

      .priority-button {
        border: none;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s;

        &:hover {
          div {
            filter: opacity(0.7);
          }
        }

        div {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${(props) => props.theme.colors.shape_dark};
        }
      }

      input[type="text"] {
        background-color: transparent;
        outline: none;
        border: none;
        height: 2rem;
        width: 20rem;
        border-radius: 0.25rem;
        padding: 10px;
        color: ${(props) => props.theme.colors.text_body};

        &::placeholder {
          color: ${(props) => props.theme.colors.text_body};
        }
      }
    }

    button:nth-child(2) {
      background-color: rgb(94, 94, 94, 0.2);
      border: 1.5px solid ${(props) => props.theme.colors.shape_dark};
      color: rgb(94, 94, 94);
      border-radius: 1rem;
      width: 9rem;
      padding: 3px;
      font-size: 0.8rem;
      transition: 0.3s;
      filter: opacity(0.7);
    }

    input[type="datetime-local"] {
      outline: none;
      border: 1.5px solid ${(props) => props.theme.colors.shape_dark};
      background-color: transparent;
      border-radius: 0.25rem;
      padding: 3px;
      filter: opacity(0.7);
      cursor: pointer;
    }

    .actions {
      button {
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
      }
    }
  }

  > .form-action {
    display: flex;
    justify-content: left;
    gap: 20px;
    padding: 10px;
    border-radius: 0 0 0.25rem 0.25rem;

    button {
      height: 35px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid ${(props) => props.theme.colors.shape};
      background-color: ${(props) => props.theme.colors.shape};
      border-radius: 0.25rem;
    }

    button[type="submit"] {
      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;
    }
  }

  .priority-tooltip {
    opacity: 1 !important;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;

      button {
        background-color: transparent;
        border: none;
        width: 10rem;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        &:hover {
          background-color: ${(props) => props.theme.colors.shape};
        }

        div {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        &:nth-child(1) div {
          background-color: ${(props) => props.theme.colors.red};
        }

        &:nth-child(2) div {
          background-color: ${(props) => props.theme.colors.green};
        }

        &:nth-child(3) div {
          background-color: ${(props) => props.theme.colors.blue};
        }

        &:nth-child(4) div {
          background-color: ${(props) => props.theme.colors.shape_dark};
        }
      }
    }
  }

  .tag-tooltip {
    opacity: 1 !important;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;

      input[type="search"]::-webkit-search-decoration,
      input[type="search"]::-webkit-search-cancel-button,
      input[type="search"]::-webkit-search-results-button,
      input[type="search"]::-webkit-search-results-decoration {
        display: none;
      }

      input[type="search"] {
        background-color: transparent;
        outline: none;
        border: none;
        padding: 10px;
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        border-bottom: 1.5px solid ${(props) => props.theme.colors.shape};

        &::placeholder {
          text-align: center;
        }
      }

      button {
        background-color: transparent;
        border: none;
        width: 12rem;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        p {
          width: 100px;
          text-align: left;
        }

        &:hover {
          background-color: ${(props) => props.theme.colors.shape};
        }

        &:nth-child(2) div {
          background-color: ${(props) => props.theme.colors.red};
        }

        &:nth-child(3) div {
          background-color: ${(props) => props.theme.colors.green};
        }

        &:nth-child(4) div {
          background-color: ${(props) => props.theme.colors.blue};
        }

        &:nth-child(5) div {
          background-color: ${(props) => props.theme.colors.shape_dark};
        }

        &#new-tag-button {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin-top: 10px;
          padding: 10px;
          font-size: 0.7rem;
        }
      }
    }
  }
`;
