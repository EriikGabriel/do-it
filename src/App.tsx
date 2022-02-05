import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ProjectContextProvider } from "./contexts/ProjectContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import GlobalStyle from "./styles/global";
import light from "./styles/themes/light";

function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <AuthContextProvider>
        <ProjectContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ProjectContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
