import { has, mapKeys, capitalize, mapValues, clone } from "lodash";

export default function processBorder(border) {
  const isSplitted = has(border, "top");

  if (isSplitted) {
    const finalBorder = {};

    Object.keys(border).forEach((borderDirection) => {
      const borderValue = border[borderDirection];
      const normalizedDirection = capitalize(borderDirection);

      if (has(borderValue, "width")) {
        finalBorder[`border${normalizedDirection}Width`] = borderValue.width;
      }

      if (has(borderValue, "color")) {
        finalBorder[`border${normalizedDirection}Color`] = borderValue.color;
      }

      if (has(borderValue, "style")) {
        finalBorder[`border${normalizedDirection}Style`] = borderValue.style;
      }
    });

    return finalBorder;
  }

  return {
    border: `${border?.width} ${border?.style ?? "solid"} ${border?.color}`,
  };
}
