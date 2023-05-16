/**
 * WordPress Dependencies
 */
import { __experimentalToolsPanel as ToolsPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
  useBlockEditContext,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";

function Colors(props) {
  const { clientId } = useBlockEditContext();
  const colorGradientSettings = useMultipleOriginColorsAndGradients();

  const colorSettings = props.settings;

  return (
    <ToolsPanel
      label={__("Color", "tasks-manager")}
      resetAll={props.resetAll}
      panelId={clientId}
    >
      {colorSettings.map(({ onChange, label, value, resetAllFilter }) => {
        return (
          <ColorGradientSettingsDropdown
            __experimentalIsRenderedInSidebar
            settings={[
              {
                colorValue: value,
                label,
                onColorChange: onChange,
                isShownByDefault: true,
                resetAllFilter,
                enableAlpha: true,
              },
            ]}
            panelId={clientId}
            {...colorGradientSettings}
          />
        );
      })}
    </ToolsPanel>
  );
}

export default Colors;
