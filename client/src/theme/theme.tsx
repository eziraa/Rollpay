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
    tableRowHover: "#ACCFCA",
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
    primary: "#3CFF87",
    secondary: "#3CFF87",
  },
  backgrounds: {
    primary: "#272625",
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
    primary: "#3CFF87",
    secondary: "#1EFF74",
    primaryHover: "#1b1a1a",
    secondaryHover: "#0a0a0a26",
  },
};

