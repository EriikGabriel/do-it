import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      themeColor: string;
      red: string;
      blue: string;
      green: string;
      pearl_ocean: string;

      primary: string;
      secondary: string;

      text_title: string;
      text_body: string;

      background: string;
      shape: string;
    };
  }
}
