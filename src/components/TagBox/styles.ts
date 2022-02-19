import { darken, lighten } from "polished";
import styled from "styled-components";

export const Container = styled.form`
  width: 25rem;
  transition: transform 0.3s;
  transform: scale(1.2);

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(94, 94, 94, 0.2);
    border-radius: 2rem;
    border: 1px solid ${(props) => props.theme.colors.shape_dark};
    height: 40px;
    width: 25rem;
    gap: 10px;
    padding-left: 10px;

    button:first-child {
      background: transparent;
      border: none;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s;
      cursor: pointer;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    input[type="text"] {
      background-color: transparent;
      outline: none;
      border: none;
      font-size: medium;
      height: 2rem;
      width: 12rem;
      border-radius: 0.25rem;
      padding: 10px;
      color: ${(props) => props.theme.colors.text_body};
    }

    div {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    > .form-action {
      display: flex;
      justify-content: left;
      margin-left: 10px;
      padding: 0 10px;

      button {
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        width: 25px;
        height: 25px;
      }
    }
  }

  .tag-color-tooltip {
    opacity: 1 !important;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;

      button {
        background-color: transparent;
        color: ${(props) => props.theme.colors.text_body};
        border: none;
        width: 10rem;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        &:hover {
          background-color: ${(props) => props.theme.colors.shape};
        }

        div {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        &:nth-child(1) div {
          background-color: rgb(178, 60, 253);
        }

        &:nth-child(2) div {
          background-color: rgb(0, 183, 74);
        }

        &:nth-child(3) div {
          background-color: rgb(255, 169, 0);
        }

        &:nth-child(4) div {
          background-color: rgb(57, 192, 237);
        }

        p {
          text-align: left;
          width: 5rem;
        }
      }
    }
  }

  .tag-color-tooltip {
    border: 1px solid ${(props) => darken(0.17, props.theme.colors.shape)} !important;
  }
  .tag-color-tooltip.place-top::after,
  .tag-color-tooltip.place-bottom::after {
    border-color: ${(props) => darken(0.17, props.theme.colors.shape)} transparent !important;
  }
  .tag-color-tooltip.place-right::after,
  .tag-color-tooltip.place-left::after {
    border-color: transparent ${(props) => darken(0.17, props.theme.colors.shape)} !important;
  }
`;
