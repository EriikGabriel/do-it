import styled from "styled-components";

export const Container = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: none;
  width: 18rem;
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 5px;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;

  > button {
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 8px;
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
  }
`;
