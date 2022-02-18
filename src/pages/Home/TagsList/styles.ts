import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 80px;
  margin-left: calc(20rem + 4rem);

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
    margin-top: 1rem;

    > button {
      display: flex;
      align-items: center;
      justify-content: start;
      background-color: transparent;
      border-radius: 2rem;

      border: 1px solid ${(props) => props.theme.colors.primary};
      height: 40px;
      width: 25rem;
      gap: 10px;
      padding-left: 2rem;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.2);
      }

      p {
        user-select: none;
        font-size: medium;
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }
`;
