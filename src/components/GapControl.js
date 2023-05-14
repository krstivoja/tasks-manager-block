import {
  RangeControl,
  Button,
  __experimentalUnitControl as UnitControl,
  __experimentalBoxControl as BoxControl,
  Icon,
  Flex,
  BaseControl,
} from "@wordpress/components";
import { useSetting } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { settings } from "@wordpress/icons";
import { useState, useEffect, useMemo } from "@wordpress/element";

// Avoid magic strings
const RANGE_CONTROL = "RangeControl";
const BOX_CONTROL = "BoxControl";

const GapControl = ({ value, onChange }) => {
  const spacingSizes = [...useSetting("spacing.spacingSizes")];
  const additionalSizes = [{ value: 0 }];

  // useMemo to avoid unnecessary calculations on each render
  const marks = useMemo(
    () => additionalSizes.concat(spacingSizes.map((s) => ({ value: s.slug }))),
    [spacingSizes, additionalSizes]
  );
  const max = spacingSizes.length;

  const [showUnitControl, setShowUnitControl] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isUsingRangeControl, setIsUsingRangeControl] = useState(true);

  const handleRangeChange = (newValue) => {
    setIsUsingRangeControl(true);
    onChange(`${marks[newValue]["value"]}px`);
  };

  const handleBoxChange = (newValue) => {
    setIsUsingRangeControl(false);
    onChange(newValue);
  };

  const toggleUnitControl = () => {
    setShowUnitControl(!showUnitControl);
    setIsActive(!isActive);
  };

  useEffect(() => {
    try {
      const storedControlType = localStorage.getItem("blockSpacingControlType");
      if (storedControlType === RANGE_CONTROL) {
        setIsUsingRangeControl(true);
      } else if (storedControlType === BOX_CONTROL) {
        setIsUsingRangeControl(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "blockSpacingControlType",
        isUsingRangeControl ? RANGE_CONTROL : BOX_CONTROL
      );
    } catch (error) {
      console.error(error);
    }
  }, [isUsingRangeControl]);

  return (
    <>
      <BaseControl>
        <Flex direction={["column", "row"]}>
          <BaseControl.VisualLabel>
            Space between columns
          </BaseControl.VisualLabel>

          <Button
            className={`components-button is-small has-icon ${
              isActive ? "is-pressed" : ""
            }`}
            onClick={toggleUnitControl}
          >
            <Icon icon={settings} />
          </Button>
        </Flex>
      </BaseControl>

      {!showUnitControl && (
        <>
          {isUsingRangeControl ? (
            <RangeControl
              initialPosition={marks.findIndex(
                (p) => p.value == parseInt(value, 10)
              )}
              className=""
              separatorType="topFullWidth"
              withInputField={false}
              max={max}
              value={value}
              onChange={handleRangeChange}
            />
          ) : (
            <BoxControl
              allowReset="false"
              className=""
              label="PADDING"
              value={value}
              onChange={handleBoxChange}
            />
          )}
        </>
      )}

      {showUnitControl && (
        <UnitControl onChange={onChange} value={value} className="" />
      )}
    </>
  );
};

export default GapControl;
