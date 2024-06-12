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
  table: {
    tableRow: string;
    tableRowHover: string;
  };
};

export const lightTheme: Theme = {
  colors: {
    primary: "#1b1a1a",
    secondary: "#0a0a0a26",
  },
  backgrounds: {
    primary: "#fff",
    secondary: "#cfcfcf",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  table: {
    tableRow: "#fff",
    tableRowHover: "#929191",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#fff",
    secondary: "#a9a7a7",
  },
  backgrounds: {
    primary: "#000000",
    secondary: "#212121",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  table: {
    tableRow: "#000000",
    tableRowHover: "#666464",
  },
};
