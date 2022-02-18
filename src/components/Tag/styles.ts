import Modal from "react-modal";
import styled from "styled-components";

export const Container = styled.div`
  width: 25rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(94, 94, 94, 0.2);
    border-radius: 2rem;
    border: 1px solid ${(props) => props.theme.colors.shape_dark};
    height: 40px;
    width: 25rem;
    gap: 10px;
    padding-left: 10px;

    p {
      user-select: none;
      width: 12rem;
      margin-left: 10px;
    }

    div {
      display: flex;
      align-items: center;
      gap: 10px;
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

        &:hover svg {
          fill-opacity: 0.6;
        }

        &:last-child:hover svg {
          fill: ${(props) => props.theme.colors.red};
        }
      }
    }
  }
`;

export const DeleteTagModal = styled(Modal)`
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
