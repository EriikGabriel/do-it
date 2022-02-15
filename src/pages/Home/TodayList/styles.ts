import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 80px;
  margin-left: calc(20rem + 4rem);

  div:first-child {
    display: flex;
    align-items: baseline;
    gap: 10px;

    h1 span {
      color: ${(props) => props.theme.colors.primary};
    }

    small {
      text-transform: capitalize;
    }
  }
`;
