import { DarkModeSwitch } from "react-toggle-dark-mode";
import propTypes from "prop-types";

const ThemeSwitch = ({ theme, toggleTheme }) => {
  const isDarkMode = theme === "dark";

  return (
    <div className="relative top-0 left-0  z-30">
      {/* <DarkModeSwitch checked={isDarkMode} onChange={toggleTheme} size={30} /> */}

      <div className={`theme-toggle-button ${theme}`} onClick={toggleTheme}>
        {theme === "light" ? (
          <DarkModeSwitch
            sunColor="#f48037"
            checked={isDarkMode}
            onChange={toggleTheme}
            size={40}
          />
        ) : (
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleTheme}
            size={40}
          />
        )}
      </div>
    </div>
  );
};

ThemeSwitch.propTypes = {
  theme: propTypes.string.isRequired,
  toggleTheme: propTypes.func.isRequired,
};

export default ThemeSwitch;
