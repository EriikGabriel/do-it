import styled from "styled-components";

export const ContainerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: none;
  min-width: 18rem;
  height: 100%;
  margin-top: 50px;
  margin-left: 20px;
  font-weight: bold;
  text-align: left;
  padding: 10px;

  > div {
    display: flex;
    justify-content: center;
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
