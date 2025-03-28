import React from "react";
import { useTheme } from "./ThemeContext.jsx";
// import "./Home.css"; // Import CSS

const Home = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`navbar ${theme}`}>
            <h2>My App</h2>
            <button onClick={toggleTheme}>
                {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
        </nav>
    );
};

export default Home;
