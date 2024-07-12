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
    tableRow: "#7aa09f",
    tableRowHover: "#69a199",
    header: "#7aa09f",
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
    primary: "#04ff00",
    secondary: "#35b104",
  },
  backgrounds: {
    primary: "#0e0d0d",
    secondary: "#4a4a4a",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  table: {
    tableRow: "#7aa09f",
    tableRowHover: "#69a199",
    header: "#3b5e5d",
  },
  buttons: {
    primary: "#04ff00",
    secondary: "#1ed112",
    primaryHover: "#1b1a1a",
    secondaryHover: "#0a0a0a26",
  },
};

