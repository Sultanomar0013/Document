
export const getMenuItemStyles = (theme) => ({
  backgroundColor: "inherit",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.dark
        : theme.palette.secondary.dark,
  },
});