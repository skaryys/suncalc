import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "design-system/theme";
import "styles/resets.css";

function App({ Component, pageProps }: AppProps) {

    return (
        <>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

export default App;