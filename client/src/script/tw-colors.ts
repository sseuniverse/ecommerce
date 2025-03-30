import plugin from "tailwindcss/plugin";

type ColorType =
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

interface Props {
  base?: string;
  colors: Record<ColorType, string>;
}

const createColorPlugin = ({ base, colors }: Props) => {
  return plugin(function ({ addUtilities }) {
    const backgroundUtilities = Object.keys(colors).map((color) => {
      return {
        [`.bg-primary-${color}`]: {
          backgroundColor: colors[color as ColorType],
        },
      };
    });

    const textUtilities = Object.keys(colors).map((color) => {
      return {
        [`.text-primary-${color}`]: {
          color: colors[color as ColorType],
        },
      };
    });

    const borderUtilities = Object.keys(colors).map((color) => {
      return {
        [`.border-primary-${color}`]: {
          borderColor: colors[color as ColorType],
        },
      };
    });

    const ringUtilities = Object.keys(colors).map((color) => {
      return {
        [`.ring-primary-${color}`]: {
          "--tw-ring-color": colors[color as ColorType],
        },
      };
    });

    addUtilities(
      [...backgroundUtilities, ...textUtilities, ...borderUtilities, ...ringUtilities],
      {
        variants: ["responsive", "hover", "focus"],
      }
    );
  });
};

export default createColorPlugin;
