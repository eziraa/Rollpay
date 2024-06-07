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
    primaryHover:string;
    secondary: string;
    secondaryHover:string;
  };
};

export const lightTheme: Theme = {
  colors: {
    primary: "#1b1a1a",
    secondary: "#0a0a0a26",
  },
  backgrounds: {
    primary: "#fff",
    secondary: "#03030311",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  buttonColor: {
    primary: "#ebedec",
    secondary: "#198754",
    primaryHover:"#ebedec",
    secondaryHover:"#219a62"
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#fff",
    secondary: "#a9a7a7",
  },
  backgrounds: {
    primary: "#3c3b3b",
    secondary: "#363535",
  },
  fontSizes: {
    small: "1rem",
    medium: "1.6rem",
    large: "2.2rem",
  },
  buttonColor: {
    primary: "#ebedec",
    secondary: "#198754",
    primaryHover:"#ebedec",
    secondaryHover:"#0f5c38"
  },
};
