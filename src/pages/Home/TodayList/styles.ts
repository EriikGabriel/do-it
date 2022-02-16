import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 80px;
  margin-left: calc(20rem + 4rem);

  > div:first-child {
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

  > div:nth-child(2) {
    margin-top: 1rem;
  }

  div.today-empty {
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
