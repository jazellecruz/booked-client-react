import { createTheme } from "@mui/material";

const listTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          marginBottom: "16px",
          textAlign: "center",
        },
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "inherit",
        }
      }
    }
  }
});

const addBookTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableFocusRipple: true,
      }
    }
  },
  palette: {
    primary: {
      main: "#dfd8fd"
    },
  },
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: "100%",
  maxHeight: "100%",
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 10,
  p: 4,
};



export {listTheme, addBookTheme, modalStyle}