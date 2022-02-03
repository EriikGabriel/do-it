import styled from "styled-components";

export const ContainerButton = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  width: 18rem;
  margin-top: 50px;
  margin-left: 20px;
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
