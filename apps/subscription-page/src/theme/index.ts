import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  components: {
    Text: {
      variants: {
        secondary: {
          color: "whiteAlpha.600",
        },
      },
    },
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
    },
  },
  colors: {
    text: {
      primary: "rgba(255,255,255,0.8)",
      secondary: "#C5DAEF",
    },
    bg: {
      main: "#142D4E",
      secondary: "#051E34",
      third: "#163861",
    },
  },
  shadows: {
    card: "7px 7px 0 var(--chakra-colors-bg-secondary)",
  },
});

export { theme };
