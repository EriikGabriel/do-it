import { Menu } from "./components/Menu";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import light from "./styles/themes/light";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
