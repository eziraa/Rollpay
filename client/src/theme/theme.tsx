export type Theme = {
  colors: {
    primary: string;
    secondary: string;
  };
  backgrounds: {
    primary: string;
    secondary: string;
  };
  fontSizes: {
    small: "1rem";
    medium: "1.6rem";
    large: "2.2rem";
  };
};

export const lightTheme: Theme = {
  colors: {
    primary: "#000",
    secondary: "#fff",
  },
  backgrounds: {
    primary: "#fff",
    secondary: "#000",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#fff",
    secondary: "#000",
  },
  backgrounds: {
    primary: "#000",
    secondary: "#fff",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
};

