import { Menu } from "./components/Menu";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global";
import light from "./styles/themes/light";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodoList } from "./pages/TodoList";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <BrowserRouter>
        <Menu />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
