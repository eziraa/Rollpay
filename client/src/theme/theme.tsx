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
    primary: "#ffffff",
    secondary: "#cfcfcf",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  table: {
    tableRow: "#a9ebd5",
    tableRowHover: "#7ee2c1",
    header: "#56b394",
  },
  buttons: {
    primary: "#28ce97",
    secondary: "#16dec0",
    primaryHover: "#1b1a1a",
    secondaryHover: "#0a0a0a26",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#ffffff",
    secondary: "#a3a5a4",
  },
  backgrounds: {
    primary: "#303030",
    secondary: "#4a4a4a",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  table: {
    tableRow: "#a4f9c5",
    tableRowHover: "#86f7b1",
    header: "#3e935f",
  },
  buttons: {
    primary: "#3CFF87",
    secondary: "#1EFF74",
    primaryHover: "#1b1a1a",
    secondaryHover: "#0a0a0a26",
  },
};
