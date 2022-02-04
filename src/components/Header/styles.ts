import styled from "styled-components";

export const Container = styled.header`
  position: fixed;
  width: calc(100% - 20rem);
  right: 0;
  top: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
      display: none;
    }

    input[type="search"] {
      outline: none;
      border: none;
      background: transparent;
      padding: 5px;
      min-width: 20rem;
      border-bottom: 1.5px solid transparent;

      &:focus,
      &:hover {
        border-bottom: 1.5px solid ${(props) => props.theme.colors.shape};
      }
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    button {
      display: flex;
      justify-content: center;
      height: 100%;
      padding: 2px;
      border: none;
      background: none;
    }

    div {
      padding: 3px;
      background: linear-gradient(100.67deg, #f3477a 3.14%, #91bdec 100%);
      border-radius: 50%;
      line-height: 0;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
`;
