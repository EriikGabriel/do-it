import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4rem;

  h1 {
    margin-top: 3rem;
    text-align: center;
    font-size: 3rem;
    width: 30%;

    span {
      margin-top: 3rem;
      text-align: center;
      background: linear-gradient(190.67deg, #f3477a 3.14%, #91bdec 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    button {
      border: none;
      width: 20rem;
      height: 50px;
      color: #fff;
      font-size: 1rem;
      border-radius: 0.4rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      transition: 0.2s;
      background-color: #e63b28;
    }
  }
`;
