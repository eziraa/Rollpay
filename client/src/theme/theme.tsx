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
  buttonColor: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
  };
};

export const lightTheme: Theme = {
  colors: {
    primary: "#1b1a1a",
    secondary: "#0a0a0a26",
  },
  backgrounds: {
    primary: "#fff",
    secondary: "#03030330",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  buttonColor: {
    primary: "#ebedec",
    secondary: "#0ab5a7",
    primaryHover: "#ebedec",
    secondaryHover: "#09cbbb",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#fff",
    secondary: "#a9a7a7",
  },
  backgrounds: {
    primary: "#3c3b3b",
    secondary: "#0303039e",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  buttonColor: {
    primary: "#ebedec",
    secondary: "#0ab5a7",
    primaryHover: "#ebedec",
    secondaryHover: "#09cbbb",
  },
};
