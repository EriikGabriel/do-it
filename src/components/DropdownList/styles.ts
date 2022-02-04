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

    button {
      background-color: transparent;
      display: none;
      justify-content: center;
      padding: 3px;
      border: none;
      border-radius: 3px;
    }
  }
`;
