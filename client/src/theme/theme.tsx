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
    header: string;
  };
  buttons: {
    primary: string;
    secondary: string;
    primaryHover: string;
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
    header: "#a2a2a2",
  },
  buttons: {
    primary: "#212121",
    secondary: "#0a0a0a26",
    primaryHover: "#1b1a1a",
    secondaryHover: "#0a0a0a26",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#fff",
    secondary: "#a9a7a7",
  },
  backgrounds: {
    primary: "#212121",
    secondary: "#4a4a4a",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  table: {
    tableRow: "#000000",
    tableRowHover: "#666464",
    header: "#000000bf",
  },
  buttons: {
    primary: "#fff",
    secondary: "#a9a7a7",
    primaryHover: "#EAEAEA",
    secondaryHover: "#a9a7a7",
  },
};
