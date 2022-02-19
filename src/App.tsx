import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { usePersistedState } from "./hooks/usePersistedState";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ProjectContextProvider } from "./contexts/ProjectContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { MenuContextProvider } from "./contexts/MenuContext";
import { ThemeAppContext } from "./contexts/ThemeAppContext";
import dark from "./styles/themes/dark";
import light from "./styles/themes/light";
import GlobalStyle from "./styles/global";

function App() {
  const [theme, setTheme] = usePersistedState("@doit:theme", light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };
  return (
    <ThemeAppContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthContextProvider>
          <MenuContextProvider>
            <ProjectContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </BrowserRouter>
            </ProjectContextProvider>
          </MenuContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeAppContext.Provider>
  );
}

export default App;
