declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  // `oneDark` is a style object used for the syntax highlighter.
  export const oneDark: Record<string, React.CSSProperties>;
}

declare module 'react-syntax-highlighter/dist/esm/prism-light' {
  import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/prism' {
  import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
  export default SyntaxHighlighter;
}
