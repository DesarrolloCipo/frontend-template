import { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeD, themeL } from ".";

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(() => {
        const dark = localStorage.getItem("dark");
        if (dark) {
            return JSON.parse(dark);
        } else {
            return false;
        }
    });

    const darkModeToggle = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("dark", !darkMode);
    };

    const themeSwitchConfig = {
        state: darkMode,
        handler: darkModeToggle,
    };

    const appliedTheme = createTheme(darkMode ? themeD : themeL);

    return(
        <ThemeContext.Provider value={{themeSwitchConfig}}>
            <ThemeProvider theme={appliedTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}