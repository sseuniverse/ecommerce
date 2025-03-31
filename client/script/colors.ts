type Shades =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

type ColorMap = {
  [K in Shades]: string;
};

const generateCSS = (colors: ColorMap): string => {
  const cssStyles = `
/* Primary Color Definitions */
@layer blue {
  :root {
    ${Object.entries(colors)
      .map(([shade, color]) => `--primary-${shade}: ${color};`)
      .join("\n    ")}
  }

  /* Background Colors */
  ${Object.keys(colors)
    .map(
      (shade) => `
  .bg-primary-${shade} {
    background-color: var(--primary-${shade});
  }`
    )
    .join("")}

  /* Text Colors */
  ${Object.keys(colors)
    .map(
      (shade) => `
  .text-primary-${shade} {
    color: var(--primary-${shade});
  }`
    )
    .join("")}

  /* Border Colors */
  ${Object.keys(colors)
    .map(
      (shade) => `
  .border-primary-${shade} {
    border-color: var(--primary-${shade});
  }`
    )
    .join("")}

  /* Ring Colors */
  ${Object.keys(colors)
    .map(
      (shade) => `
  .ring-primary-${shade} {
    --tw-ring-color: var(--primary-${shade});
  }`
    )
    .join("")}

    /* Dark Colors */
  ${Object.keys(colors)
    .map(
      (shade) => `
  ring-primary-${shade} {
    --tw-ring-color: var(--primary-${shade});
  }`
    )
    .join("")}
}
`;

  return cssStyles;
};
