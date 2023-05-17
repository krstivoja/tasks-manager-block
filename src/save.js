/**
 * WordPress Dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Custom Dependencies
 */
import processStyles from "./utils/process-styles";
import maybeProcessThemeVars from "./utils/process-theme-vars";
import processBorder from "./utils/process-border";

function save({ attributes }) {
  const blockProps = useBlockProps.save();

  // Providing necessary calculated attributes for frontend.
  return JSON.stringify({
    blockProps,
    cardStyles: processStyles({
      backgroundColor: attributes.cardBackgroundColor,
      paddingTop: maybeProcessThemeVars(attributes.cardPadding["top"]),
      paddingLeft: maybeProcessThemeVars(attributes.cardPadding["left"]),
      paddingRight: maybeProcessThemeVars(attributes.cardPadding["right"]),
      paddingBottom: maybeProcessThemeVars(attributes.cardPadding["bottom"]),
      ...processBorder(attributes.cardBorder),
    }),
    listStyles: processStyles({
      gap: maybeProcessThemeVars(attributes.listCardSpacing?.all),
      backgroundColor: attributes.listBackgroundColor,
      paddingTop: maybeProcessThemeVars(attributes.listPadding["top"]),
      paddingLeft: maybeProcessThemeVars(attributes.listPadding["left"]),
      paddingRight: maybeProcessThemeVars(attributes.listPadding["right"]),
      paddingBottom: maybeProcessThemeVars(attributes.listPadding["bottom"]),
      ...processBorder(attributes.listBorder),
    }),
    wrapperStyles: processStyles({
      backgroundColor: attributes.wrapperBackgroundColor,
      gap: maybeProcessThemeVars(attributes.groupSpacing["all"]),
      paddingTop: maybeProcessThemeVars(attributes.wrapperPadding["top"]),
      paddingLeft: maybeProcessThemeVars(attributes.wrapperPadding["left"]),
      paddingRight: maybeProcessThemeVars(attributes.wrapperPadding["right"]),
      paddingBottom: maybeProcessThemeVars(attributes.wrapperPadding["bottom"]),
      ...processBorder(attributes.wrapperBorder),
    }),
  });
}

export default save;
