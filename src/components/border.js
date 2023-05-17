/**
 * WordPress Dependencies
 */
import { isEmpty } from "lodash";
import { __ } from "@wordpress/i18n";
import {
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
  __experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";
import { useSetting } from "@wordpress/block-editor";

function Border(props) {
  const colorPalette = useSetting("color.palette.theme");

  return (
    <ToolsPanel label={__("Border", "tasks-manager")}>
      <ToolsPanelItem
        label={__("Border", "tasks-manager")}
        hasValue={() => !isEmpty(props.value)}
        isShownByDefault
        __experimentalIsRenderedInSidebar
        onResetAll={() => console.log("RESET")}
      >
        <BorderBoxControl
          value={props.value}
          colors={colorPalette}
          onChange={(newWrapperBorder) => props.onChange(newWrapperBorder)}
        />
      </ToolsPanelItem>
    </ToolsPanel>
  );
}

export default Border;
