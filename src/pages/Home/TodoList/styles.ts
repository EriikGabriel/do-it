import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 80px;
  margin-left: calc(20rem + 4rem);

  > div {
    margin-top: 1rem;
  }

  > button {
    background-color: transparent;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    padding-left: 5px;
    gap: 5px;
    height: 1.8rem;
    width: 10rem;
    border: none;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  div.todo-empty {
    margin-left: -4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    img {
      width: 25rem;
      height: 20rem;
    }

    div {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 10px;

      p {
        font-weight: bold;
      }
    }
  }
`;
