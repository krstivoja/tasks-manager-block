import React, { useState, useEffect, useMemo, useCallback } from "react";
import { RangeControl, Button, Icon, Flex, BaseControl } from "@wordpress/components";
import { useSetting } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { settings } from "@wordpress/icons";
import { __experimentalUnitControl as UnitControl, __experimentalBoxControl as BoxControl } from "@wordpress/components";

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

  const handleRangeChange = useCallback(
    (newValue) => {
      setIsUsingRangeControl(true);
      onChange(`${marks[newValue]["value"]}px`);
    },
    [onChange, marks]
  );

  const handleBoxChange = useCallback(
    (newValue) => {
      setIsUsingRangeControl(false);
      onChange(newValue);
    },
    [onChange]
  );

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
            onClick={() => {
              setShowUnitControl(!showUnitControl);
              setIsActive(!isActive);
            }}
          >
            <Icon icon={settings} />
          </Button>
        </Flex>
      </BaseControl>

      {!showUnitControl && isUsingRangeControl ? (
        <RangeControl
          initialPosition={marks.findIndex(
            (p) => p.value === parseInt(value, 10)
          )}
          separatorType="topFullWidth"
          withInputField={false}
          max={max}
          value={value}
          onChange={handleRangeChange}
        />
      ) : (
        <BoxControl
          allowReset={false}
          label="PADDING"
          value={value}
          onChange={handleBoxChange}
        />
      )}

      {showUnitControl && (
        <UnitControl onChange={onChange} value={value} />
      )}
    </>
  );
};

export default GapControl;
