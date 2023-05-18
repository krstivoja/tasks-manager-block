/**
 * WordPress Dependencies
 */
import { isEmpty } from "lodash";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import {
  FontSizePicker,
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";

function Typography(props) {
  const fallbackFontSizes = [
    {
      name: "Small",
      size: 12,
      slug: "small",
    },
    {
      name: "Normal",
      size: 16,
      slug: "normal",
    },
    {
      name: "Big",
      size: 26,
      slug: "big",
    },
  ];
  const themeFontSizes = useSelect((select) => {
    return (
      select("core/editor")?.getEditorSettings()?.fontSizes ?? fallbackFontSizes
    );
  });

  return (
    <ToolsPanel label={__("Typography", "tasks-manager")}>
      <ToolsPanelItem
        isShownByDefault
        label={__("Font Size", "tasks-manager")}
        hasValue={() => !isEmpty(props.value)}
      >
        <FontSizePicker
          withSlider
          fontSizes={themeFontSizes}
          onChange={props.onChange}
          value={props.value}
          units={["px", "em", "rem"]}
          label={__("Size", "tasks-manager")}
        />
      </ToolsPanelItem>
    </ToolsPanel>
  );
}

export default Typography;
