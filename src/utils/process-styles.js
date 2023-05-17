import { isEmpty } from "lodash";

export default function processStyles(styleObject) {
  let styleString = "";

  for (const [key, value] of Object.entries(styleObject)) {
    if (
      value !== undefined &&
      value !== " " &&
      value !== "" &&
      !isEmpty(value)
    ) {
      // Convert camelCase to kebab-case
      const kebabCaseKey = key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();

      styleString += `${kebabCaseKey}: ${value}; `;
    }
  }

  return styleString.trim();
}
