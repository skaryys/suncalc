import * as React from "react";
import { ReactElement } from "react";
import NextDocument, {
    DocumentContext,
    Head,
    Main,
    NextScript,
    Html
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
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
                    {styleTags}
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}

export default Document;