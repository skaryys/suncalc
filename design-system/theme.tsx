import { breakpoints, createTheme, container, button } from "@xcorejs/ui";

export const theme = createTheme({
    name: "mainTheme",
    ...breakpoints(["30em", "48em", "64em", "78em", "85em"]),
    ...container({
        variants: {
            normal: {
                width: ["100%", "100%", "100%", "76.8rem", "102.4rem", "120rem", "132rem"]
            }
        }
    }),
    ...button({
        default: {
            cursor: "pointer",
            color: "white",
            outline: "none",
            padding: "0 2rem",
            height: "4rem",
            fontSize: "1.5rem",
            fontWeight: 700,
            fontFamily: '"Noto Sans", sans-serif',
            transition: "0.2s linear all",
            borderStyle: "solid",
            borderWidth: ".2rem",
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
            borderRadius: 0,
        },
        variants: {
            solid: {
                bg: "#FFA500",
                color: "white",
                _hover: {
                    bg: "#FF8C00",
                },
                _focus: {
                    bg: "#FF8C00",
                },
                _active: {
                    bg: "#FF8C00",
                },
            }
        }
    })
});
