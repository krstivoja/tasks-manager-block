import { isString } from "lodash";

export default function maybeProcessThemeVars(value) {
  if (isString(value) && value.startsWith("var:")) {
    const entities = value.replace("var:", "").split("|");
    const variable = "--wp--" + entities.join("--");

    return "var(" + variable + ")";
  } else {
    return value;
  }
}
