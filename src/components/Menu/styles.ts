import styled from "styled-components";

export const Container = styled.header`
  background-color: #fff;
  max-width: 20rem;
  height: 100vh;
  border-right: 1px solid ${(props) => props.theme.colors.shape};
  overflow-x: hidden;

  h1 {
    margin-top: 3rem;
    text-align: center;
    background: linear-gradient(177.67deg, #f3477a 3.14%, #91bdec 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
