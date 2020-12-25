import * as React from "react";
import { ReactElement } from "react";
import NextDocument, {
    DocumentContext,
    Head,
    Main,
    NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class Document extends NextDocument<{ styleTags: Array<ReactElement<{}>> }> {
    // Styled-components and @xcorejs/ui have some problems with style loading without this when app is builded
    public static async getInitialProps({ renderPage }: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props}/>));
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }

    public render() {
        const { styleTags } = this.props;

        return (
            <html lang="en">
            <Head>
                <title>Sunrise / Sunset calculator</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />
                <meta property="og:title" content="Sunrise / Sunset calculator" />
                <meta name="description" content="App which shows sunrise and sunset times." />
                <meta name="theme-color" content="#000000" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
                {styleTags}
            </Head>
            <body>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        );
    }
}

export default Document;