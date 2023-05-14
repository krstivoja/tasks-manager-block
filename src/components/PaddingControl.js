import { __ } from '@wordpress/i18n';
import { Button, BoxControl, RangeControl } from '@wordpress/components';

const PaddingControl = ({ paddingSize, setAttributes, ButtonAction, classNamePrefix = "" }) => {
    const max = 100; // Adjust this value as needed
    const marks = Array.from({ length: max + 1 }, (_, i) => ({ value: i })); // Create an array of marks with values from 0 to max

    return (
        <>
            <Button variant="secondary" label="Set custom size" className={`${classNamePrefix}padding-button`} icon="admin-settings" onClick={ButtonAction}></Button>
            <BoxControl allowReset="false" className={`${classNamePrefix}padding-box`} label="PADDING" values={paddingSize} onChange={(value) => { setAttributes({ paddingSize: value }); }} />
            <RangeControl label="PADDING" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["top"], 10))} className={`${classNamePrefix}padding-all`} separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize} onChange={(value) => { setAttributes({ paddingSize: { top: `${marks[value]["value"]}px`, bottom: `${marks[value]["value"]}px`, left: `${marks[value]["value"]}px`, right: `${marks[value]["value"]}px` } }); }} />
            <RangeControl label="PADDING TOP" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["top"], 10))}  className={`${classNamePrefix}padding-top`} separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize["top"]} onChange={(value) => { setAttributes({ paddingSize: { top: `${marks[value]["value"]}px`, bottom: paddingSize["bottom"], left: paddingSize["left"], right: paddingSize["right"] } }); }} />
            <RangeControl label="PADDING BOTTOM" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["bottom"], 10))} className={`${classNamePrefix}padding-bottom`} separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize["bottom"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: `${marks[value]["value"]}px`, left: paddingSize["left"], right: paddingSize["right"] } }); }} />
            <RangeControl label="PADDING LEFT" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["left"], 10))} className={`${classNamePrefix}padding-left`} separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize["left"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: paddingSize["bottom"], left: `${marks[value]["value"]}px`, right: paddingSize["right"] } }); }} />
            <RangeControl label="PADDING RIGHT" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["right"], 10))} className={`${classNamePrefix}padding-right`} separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize["right"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: paddingSize["bottom"], left: paddingSize["left"], right: paddingSize["right"] } }); }} />

        </>
    );
};
          
export default PaddingControl;