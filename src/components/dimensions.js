/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
import { __experimentalSpacingSizesControl as SpacingSizesControl } from "@wordpress/block-editor";

function Dimensions(props) {
  return (
    <ToolsPanel label={__("Dimensions", "tasks-manager")}>
      {props.settings.map((setting) => {
        return (
          <ToolsPanelItem
            label={setting.label}
            onResetAll={setting.onResetAll}
            hasValue={setting.hasValue}
          >
            <div className="tools-panel-item-spacing">
              <SpacingSizesControl
                values={setting.values}
                onChange={setting.onChange}
                label={setting.label}
                sides={setting.sides}
                allowReset={setting?.allowReset ?? false}
                splitOnAxis={false}
              />
            </div>
          </ToolsPanelItem>
        );
      })}
    </ToolsPanel>
  );
}

export default Dimensions;
