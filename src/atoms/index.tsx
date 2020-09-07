import React from "react";
import { css, Global } from "@emotion/core";

export function Theme() {
  return (
    <Global
      styles={css`
        :root {
          --border-radius: 5px;
          --box-shadow: 2px 2px 10px;
          --color: #118bee;
          --color-accent: #118bee15;
          --color-bg: #fff;
          --color-bg-secondary: #e9e9e9;
          --color-secondary: #920de9;
          --color-secondary-accent: #920de90b;
          --color-shadow: #f4f4f4;
          --color-text: #000;
          --color-text-secondary: #999;
          --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
          --hover-brightness: 1.2;
          --justify-important: center;
          --justify-normal: left;
          --line-height: 1.5;
          --width-card: 285px;
          --width-card-medium: 460px;
          --width-card-wide: 800px;
          --width-content: 1080px;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --color: #0097fc;
            --color-accent: #0097fc4f;
            --color-bg: #333;
            --color-bg-secondary: #555;
            --color-secondary: #e20de9;
            --color-secondary-accent: #e20de94f;
            --color-shadow: #bbbbbb20;
            --color-text: #f7f7f7;
            --color-text-secondary: #aaa;
          }
        }

        h1,
        h2,
        h3 {
          text-align: center;
        }
      `}
    />
  );
}

export { Box } from "./Box";
export { Select } from "./Select";
export { Footer } from "./Footer";
