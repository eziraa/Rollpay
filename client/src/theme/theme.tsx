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
    primary: "#1b1a1a",
    secondary: "#fff",
  },
  backgrounds: {
    primary: "#fff",
    secondary: "#dcd6d6",
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
    secondary: "#a9a7a7",
  },
  backgrounds: {
    primary: "#3c3b3b",
    secondary: "#a3a1a1",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
};

