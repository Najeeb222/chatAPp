import { createTheme } from "@mui/material/styles";
import { COLORS } from "constant";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h5_bold: React.CSSProperties;
    h5_medium: React.CSSProperties;
    h6_medium: React.CSSProperties;
    h4_bold: React.CSSProperties;
    h2_bold: React.CSSProperties;
    h2_medium: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h5_bold?: React.CSSProperties;
    h5_medium?: React.CSSProperties;
    h6_medium?: React.CSSProperties;
    h6_light?: React.CSSProperties;
    h4_bold?: React.CSSProperties;
    h2_bold?: React.CSSProperties;
    h2_medium?: React.CSSProperties;
    h1_bold?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h5_bold: true;
    h5_medium: true;
    h6_medium: true;
    h6_light: true;
    h4_bold: true;
    h2_bold: true;
    h2_medium: true;
    h1_bold: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    rounded: true;
  }
}

export let theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary.main,
    },
  },
  typography: {
    h1: {
      fontWeight: 600,
      fontSize: "32px",
      lineHeight: "30px",
      fontFamily: "DM Sans",
      color: COLORS.gray.dark,
    },
    h1_bold: {
      fontWeight: 700,
      fontSize: "32px",
      lineHeight: "32px",
      fontFamily: "DM Sans",
      color: "#18181B",
    },
    h2_bold: {
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "30px",
      letterSpacing: "-1px",
      fontFamily: "DM Sans",
      color: COLORS.gray.dark,
    },
    h2_medium: {
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "30px",
      letterSpacing: "-1px",
      fontFamily: "DM Sans",
      color: COLORS.gray.dark,
    },
    h4: {
      fontWeight: 400,
      fontSize: "16px",
      fontFamily: "DM Sans",
    },
    h4_bold: {
      fontWeight: 700,
      fontSize: "18px",
      display: "block",
    },
    h5: {
      fontWeight: 400,
      fontSize: "16px",
    },
    h5_medium: {
      fontWeight: 500,
      fontSize: "16px",
      fontFamily: "Poppins",
      lineHeight: "30px",
    },
    h5_bold: {
      fontWeight: 700,
      fontSize: "14px",
      lineHeight: "100%",
      letterSpacing: "0px",
      color: COLORS.gray.dark,
      fontFamily: "Nunito Sans",
    },
    h6_medium: {
      fontWeight: 500,
      fontSize: "14px",
      display: "block",
    },
    h6_light: {
      fontWeight: 300,
      fontSize: "13.4px",
      lineHeight: "100%",
      color: COLORS.gray.main,
      fontFamily: "DM Sans",
      
    },
    h6: {
      fontFamily: "DM Sans",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "100%",
      letterSpacing: "0px",
      textTransform: "uppercase",
    },

    body1: {
      fontFamily: "Plus Jakarta Sans",
      fontWeight: 500,
      fontSize: "11px",
      lineHeight: "18px",
      letterSpacing: "1px",
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 300,
          "::-webkit-scrollbar": {
            display: "none !important",
          },
          borderRight: `1px solid ${COLORS.white.main}`,
          "& .MuiListItem-root": {
            padding: "10px 0px 0px 0px",
            "& .MuiListItemButton-root": {
              width: 242,
              height: 52,
              borderRadius: "8px",
              fontFamily: "Poppins",
              color: COLORS.gray.main,
              "& .MuiListItemText-root": {
                margin: "0px 20px",
                "& .MuiTypography-root": {
                  color: COLORS.gray.main,
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                },
              },
              "&:hover": {
                background: COLORS.primary.main,
                color: COLORS.white.main,
              },
            },

            "& .MuiListItemButton-root.Mui-selected": {
              background: COLORS.primary.main,
              color: COLORS.white.main,
              // borderRight: `4px solid ${COLORS.primary.hard}`,
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          height: "50px",
          fontSize: "16px",
          fontWeight: 500,
          fontFamily: "Poppins",
          padding: "10px 24px",
          "&.addButton": {
            mb: 2,
            p: 0.7,
            height: "40px",
            fontWeight: 400,
            gap: "5px",
            fontSize: "14px",
            lineHeight: "20px",
            fontFamily: "DM Sans",
            letterSpacing: "-.5px",
            color: COLORS.gray.main,
            backgroundColor: COLORS.gray.lighter,
            "& .MuiButton-startIcon": {
              width: "16px",
              height: "16px",
              display: "flex",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${COLORS.error.main}`,
            },
          },
        },

        contained: {
          boxShadow: "none",
          color: COLORS.white.main,
          backgroundColor: COLORS.primary.main,
          "&:active": {
            boxShadow: "none",
          },
          "&:hover": {
            backgroundColor: COLORS.primary.main,
          },
          "&.Mui-disabled": {
            backgroundColor: COLORS.gray.main,
            color: COLORS.white.main,
          },
        },
        outlined: {
          border: `1px solid ${COLORS.error.main}`,
          backgroundColor: "transparent",
          color: COLORS.error.main,
          "&.MuiButton-inActive": {
            color: COLORS.black.main,
            border: `1px solid ${COLORS.gray.light}`,
          },
          "&.Mui-disabled": {
            backgroundColor: COLORS.gray.main,
            color: COLORS.white.main,
            border: `1px solid ${COLORS.gray.main}`,
          },
        },
      },
      variants: [
        {
          props: { variant: "rounded" },
          style: {
            borderRadius: "35px",
            fontWeight: 700,
            fontSize: "16px",
            boxShadow: "none",
            padding: "15px 50px",
            color: COLORS.white.main,
            backgroundColor: COLORS.primary.main,
            "&:active": {
              boxShadow: "none",
            },
            "&:hover": {
              backgroundColor: COLORS.primary.main,
            },
          },
        },
      ],
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: COLORS.gray.lighter,
          "& fieldset": {
            border: `.6px solid ${COLORS.gray.thin}`,
          },
          "&:hover fieldset": {
            borderColor: COLORS.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${COLORS.primary.main}`,
          },
          "&.Mui-focused fieldset": {
            border: `1px solid ${COLORS.primary.main}`,
          },

          // ✅ Keep placeholder styling consistent
          "& input::placeholder": {
            fontFamily: "DM Sans",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0px",
            color: COLORS.gray.medium,
            opacity: 1,
          },

          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px transparent inset",
            transition: "background-color 5000s ease-in-out 0s",
            WebkitTextFillColor: "inherit",
            height: 0,
          },

          "& input:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 100px transparent inset",
            height: 0,
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.primary.main,
          },

          "& input": {
            fontFamily: "DM Sans",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0px",
          },

          "& input:focus": {
            borderColor: COLORS.primary.main,
          },
        },

        multiline: {
          p: "6px",
          minHeight: 22,
          fontFamily: "DM Sans",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "100%",
          letterSpacing: "0px",
        },
        inputMultiline: {
          minHeight: 22,
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          gap: "20px",
          height: "100%",
          display: "flex",
          marginTop: "20px",
          borderRadius: "12px",
          flexDirection: "column",
          padding: "40px 60px 40px 40px",
          backgroundColor: COLORS.white.main,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          minWidth: 125,
          height: 46,
          marginRight: 16,
          borderRadius: 14,
          fontFamily: "DM Sans",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 30,
          letterSpacing: -0.25,
          color: COLORS.gray.main,
          backgroundColor: COLORS.gray.lighter,
          "&:hover": {
            backgroundColor: COLORS.primary.main,
            color: COLORS.white.main,
          },
          "&.Mui-selected": {
            backgroundColor: COLORS.primary.main,
            color: COLORS.white.main,
          },
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          "&.user__table": {
            "& .MuiTableHead-root": {
              "& .MuiTableCell-root": {
                fontWeight: 700,
                fontSize: "16px",
              },
            },

            "& .MuiTableBody-root": {
              "& .MuiTableCell-root": {
                fontWeight: 500,
                fontSize: "18px",
              },
              "& .MuiTypography-root": {
                fontWeight: 500,
                fontSize: "18px",
              },
            },
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          "&.content__title": {
            color: COLORS.primary.main,
            fontSize: "18px",
            fontWeight: 700,
            textAlign: "center",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
          border: `0.6px solid ${COLORS.primary.main}`,
          backgroundColor: COLORS.primary.main,
          color: COLORS.white.main,
          height: "44px",
          fontFamily: "DM Sans",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "100%",
          letterSpacing: "0%",
          verticalAlign: "middle",
          padding: "0px 6px",
          "& .MuiChip-deleteIcon": {
            color: COLORS.white.main,
            marginLeft: "8px",
            "&:hover": {
              color: COLORS.white.main,
            },
          },

          "& .MuiChip-icon": {
            marginRight: "8px",
          },
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: {
          width: 258,
          '& .MuiSlider-thumb': {
            border: '2px solid white',
            boxShadow: '0px 6px 13px 0px #0000001F, 0px 0.5px 4px 0px #0000001F',
          },
          '& .MuiSlider-valueLabel': {
            top: 2,
            color: '#fff',
            fontWeight: 500,
            fontSize: '13px',
            borderRadius: '6px',
            padding: '6px 10px',
            backgroundColor: "#676127",
            transform: "rotate(-180deg) !important",
            '& > span': {
              transform: "rotate(-180deg) !important"
            }
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.datePicker": {
            "& .MuiOutlinedInput-root": {
              height: 42,
              flexDirection: "row-reverse",
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
            "& .MuiInputAdornment-root": {
              marginRight: "auto",
            },
            "& .MuiSvgIcon-root": {
              fontSize: 20,
            },
          },
        },
      },
    },

    // MuiGrid: {
    //   styleOverrides: {
    //     item: {
    //       "&.content__card": {
    //         background: COLORS.white.main,
    //         borderRadius: "24px",
    //         padding: "4px 12px",
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       },
    //     },
    //   },
    // },
  },
};

export default theme;
