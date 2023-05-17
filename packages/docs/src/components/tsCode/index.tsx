import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React from "react";

const TsCode = ({ children }: { children: string }) => {
  return (
    <SyntaxHighlighter language="typescript" style={atomOneLight}>
      {children}
    </SyntaxHighlighter>
  );
};

export default TsCode;
