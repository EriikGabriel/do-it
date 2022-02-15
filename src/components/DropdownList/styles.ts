import Modal from "react-modal";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  border: none;
  max-width: 18rem;
  height: 200px;
  margin-left: 20px;

  > button {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    width: 100%;
    text-align: left;
    padding: 10px;
    border-radius: 5px;
    transition: 0.2s;

    &:hover {
      background-color: ${(props) => props.theme.colors.background};

      button {
        display: flex;
      }
    }

    > div {
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    > div:last-child {
      padding: 3px;
    }

    button {
      background-color: transparent;
      display: none;
      justify-content: center;
      padding: 3px;
      border: none;
      border-radius: 3px;
    }
  }

  .more-options-tooltip {
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
        padding: 0 0.4rem;
        justify-content: space-evenly;
        align-items: center;
        gap: 20px;

        p {
          text-align: left;
          width: 80%;
        }

        &:hover {
          background-color: ${(props) => props.theme.colors.shape};
        }

        &:last-child:hover svg {
          fill: ${(props) => props.theme.colors.red};
        }
      }
    }
  }
`;

export const EditProjectModal = styled(Modal)`
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
  }
`;

export const DeleteProjectModal = styled(Modal)`
  position: relative;
  text-align: center;
  user-select: none;
  -moz-user-select: none;

  div:nth-child(2) {
    padding: 20px;

    small {
      font-size: 0.7rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;
