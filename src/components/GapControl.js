import { RangeControl, Button, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { useSetting } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const GapControl = ({ value, onChange }) => {
  const spacingSizes = [...useSetting('spacing.spacingSizes')];
  const additionalSizes = [{ value: 0 }];
  const marks = additionalSizes.concat(spacingSizes.map(s => ({ value: s.slug })));
  const max = spacingSizes.length;

  return (
    <>
      <Button variant="secondary" label={__('Set custom size', 'tasks-manager')} className="gap-button" icon="admin-settings" onClick={() => {
        const el = document.querySelector('.gap-range-control');
        if (el) {
          el.classList.toggle('visible');
        }
      }}></Button>
      <UnitControl onChange={onChange} value={value} label={__('Block spacing', 'tasks-manager')} className="gap-text" />
      <RangeControl
        label={__('Block spacing', 'tasks-manager')}
        initialPosition={marks.findIndex(p => p.value == parseInt(value, 10))}
        className="gap-range-control"
        separatorType="topFullWidth"
        withInputField="false"
        max={max}
        value={value}
        onChange={(newValue) => { onChange(`${marks[newValue]["value"]}px`); }}
      />
    </>
  );
};

export default GapControl;
