import Modal from "react-modal";
import styled from "styled-components";

export const ContainerButton = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  width: 18rem;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 5px;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > button {
    background-color: transparent;
    display: flex;
    justify-content: center;
    padding: 3px;
    border: none;
    border-radius: 3px;
    transition: filter 0.2s;

    &:hover {
      background-color: ${(props) => props.theme.colors.background};
      filter: brightness(0.9);
    }
  }
`;

export const CreateProjectModal = styled(Modal)`
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
