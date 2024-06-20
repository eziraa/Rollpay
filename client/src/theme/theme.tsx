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
    primary: "#0a9280",
    secondary: "#16dec0",
    primaryHover: "#1b1a1a",
    secondaryHover: "#0a0a0a26",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#ffffff",
    secondary: "#a9a7a7",
  },
  backgrounds: {
    primary: "#323232",
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
    primary: "#2dc682",
    secondary: "#16d9bc",
    primaryHover: "#1b1a1a",
    secondaryHover: "#0a0a0a26",
  },
};

