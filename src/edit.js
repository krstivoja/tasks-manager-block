import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/editor';
import './editor.scss';

import {
  ColorPalette,
  RangeControl,
  ToggleControl,
  TabPanel,
} from '@wordpress/components';

const Edit = (props) => {
  return (
    <div {...useBlockProps()}>
      <ServerSideRender
        block="tasks-manager/tasks-progress"
        attributes={props.attributes}
      />
      <InspectorControls>
        <TabPanel
          className="my-tabs"
          activeClass="is-active"
          tabs={[
            {
              name: 'wrapper',
              title: __('Wrapper'),
              className: 'my-tab-wrapper',
            },
            {
              name: 'columns',
              title: __('Columns'),
              className: 'my-tab-columns',
            },
            {
              name: 'cards',
              title: __('Cards'),
              className: 'my-tab-cards',
            },
          ]}
        >
          {(tab) => {
            switch (tab.name) {
              case 'wrapper':
                return (
                  <div className="my-tab-panel">
                    <ToggleControl label={ __('My Toggle Control') } />
                  </div>
                );
              case 'columns':
                return (
                  <div className="my-tab-panel">
                    <ColorPalette label={ __('My Color Palette') } />
                  </div>
                );
              case 'cards':
                return (
                  <div className="my-tab-panel">
                    <ToggleControl label={ __('My Other Toggle Control') } />
                  </div>
                );
              default:
                return null;
            }
          }}
        </TabPanel>
      </InspectorControls>
    </div>
  );
};

export default Edit;
