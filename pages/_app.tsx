import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/Head";
import { ThemeProvider } from "styled-components";
import { theme } from "design-system/theme";
import "styles/resets.css";

function App({ Component, pageProps }: AppProps) {

    return (
        <>
            <Head>
                <title>Sunrise / Sunset calculator</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />
                <meta property="og:title" content="Sunrise / Sunset calculator" />
                <meta name="description" content="App which shows sunrise and sunset times." />
                <meta name="theme-color" content="#000000" />
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

export default App;