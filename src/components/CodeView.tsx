import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import codeTheme from "react-syntax-highlighter/dist/esm/styles/hljs/github-gist";

SyntaxHighlighter.registerLanguage("javascript", js);

export default function ({ children }: { children: string }) {
  return (
    <SyntaxHighlighter language={"javascript"} style={codeTheme}>
      {children}
    </SyntaxHighlighter>
  );
}
