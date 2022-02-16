import { darken } from "polished";
import Modal from "react-modal";
import styled from "styled-components";

export const Container = styled.div`
  & + div {
    margin-top: 0.25rem;
  }

  > div:first-child {
    display: flex;
    align-items: center;
    background-color: transparent;
    border-bottom: 1px solid ${(props) => props.theme.colors.shape};
    height: 50px;
    width: 55rem;
    gap: 30px;
    padding-left: 10px;

    div {
      display: flex;
      align-items: center;
      gap: 10px;

      .todo-priority-button {
        border: none;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s;

        div {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${(props) => props.theme.colors.shape_dark};
        }
      }

      p {
        background-color: transparent;
        display: flex;
        align-items: center;
        font-size: 0.85rem;
        height: 2rem;
        width: 20rem;
        padding: 10px;
        cursor: default;
        color: ${(props) => props.theme.colors.text_body};
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

    > p {
      background-color: transparent;
      display: flex;
      align-items: center;
      margin-left: 3rem;
      text-align: start;
      font-size: 0.85rem;
      width: 10rem;
      border-radius: 0.25rem;
      padding: 3px;
      filter: opacity(0.7);
      cursor: default;
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

        svg {
          fill: ${(props) => darken(0.1, props.theme.colors.shape_dark)};
        }

        &:hover svg {
          fill: ${(props) => props.theme.colors.shape_dark};
        }

        &:last-child:hover svg {
          fill: ${(props) => props.theme.colors.red};
        }
      }
    }
  }
`;

export const DeleteTodoModal = styled(Modal)`
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
