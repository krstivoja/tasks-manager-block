/**
 * WordPress Dependencies
 */
import {
  __experimentalToolsPanel as ToolsPanel,
  PanelBody,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
  useBlockEditContext,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";

/**
 * External dependencies
 */
import styled from "@emotion/styled";

const SingleColorGradientSettingsDropdown = styled("div")`
  grid-column: 1 / -1;
  border-top: 1px solid #eeeeee;
`;

function Colors(props) {
  const { clientId } = useBlockEditContext();
  const colorGradientSettings = useMultipleOriginColorsAndGradients();

  const colorSettings = props.settings;
  const colorGradientListSettings = colorSettings.map(
    ({ onChange, label, value, resetAllFilter }) => {
      return {
        colorValue: value,
        label,
        onColorChange: onChange,
        isShownByDefault: true,
        resetAllFilter,
        enableAlpha: true,
      };
    }
  );

  return (
    <ToolsPanel
      label={__("Color", "tasks-manager")}
      resetAll={props.resetAll}
      panelId={clientId}
    >
      <SingleColorGradientSettingsDropdown>
        <ColorGradientSettingsDropdown
          __experimentalIsRenderedInSidebar
          settings={colorGradientListSettings}
          panelId={clientId}
          {...colorGradientSettings}
        />
      </SingleColorGradientSettingsDropdown>
    </ToolsPanel>
  );
}

export default Colors;
