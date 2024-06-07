export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    link: string;
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
    primary: "#1b1a1a",
    secondary: "#fff",
    link: "#00f",
  },
  backgrounds: {
    primary: "#fff",
    secondary: "#F1EFEFA4",
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
    secondary: "#A9A7A7DD",
    link: "#00f",
  },
  backgrounds: {
    primary: "#3c3b3b",
    secondary: "#A3A1A1D8",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
};

