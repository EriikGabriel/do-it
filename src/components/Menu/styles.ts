import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${(props) => props.theme.colors.themeColor};
  width: 20rem;
  height: 100%;
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
