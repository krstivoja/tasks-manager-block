import {  RangeControl, 
  Button, 
  __experimentalUnitControl as UnitControl, 
  __experimentalBoxControl as BoxControl,
  Icon, 
  Flex, 
  FlexItem,
  BaseControl } from '@wordpress/components';

import { useSetting } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { link, adminGeneric } from '@wordpress/icons';
import { useState } from '@wordpress/element'; // import useState

const GapControl = ({ value, onChange }) => {
const spacingSizes = [...useSetting('spacing.spacingSizes')];
const additionalSizes = [{ value: 0 }];
const marks = additionalSizes.concat(spacingSizes.map(s => ({ value: s.slug })));
const max = spacingSizes.length;

const [showUnitControl, setShowUnitControl] = useState(true); // state for toggling

return (
<>
<Flex direction={['column', 'row']}>
<label>Block spacings</label>
<Button 
  variant="secondary"  className="components-button is-small has-icon"
  onClick={() => setShowUnitControl(!showUnitControl)}>
  <Icon icon={ link } />
</Button>
</Flex>

{showUnitControl ? (
<UnitControl onChange={onChange} value={value} className="" />
) : (
<RangeControl
  initialPosition={marks.findIndex(p => p.value == parseInt(value, 10))}
  className=""
  separatorType="topFullWidth"
  withInputField={false}
  max={max}
  value={value}
  onChange={(newValue) => { onChange(`${marks[newValue]["value"]}px`); }}
/>
)}

<BoxControl allowReset="false" className="" label="PADDING" value={value} onChange={onChange} />

</>
);
};

export default GapControl;
