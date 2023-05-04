import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/editor';
import './editor.scss';

const Edit = (props) => {

  const wrapperPanel = (
    <Panel header="Task Manager Settings">
      <PanelBody title="Wrapper" initialOpen={ false }>
          <PanelRow>Wrapper Settings - My Panel Inputs and Labels</PanelRow>
      </PanelBody>
      <PanelBody title="Columns" initialOpen={ false }>
          <PanelRow>Columns Settings - My Panel Inputs and Labels</PanelRow>
      </PanelBody>
      <PanelBody title="Cards" initialOpen={ false }>
          <PanelRow>Cards Settings - My Panel Inputs and Labels</PanelRow>
      </PanelBody>
    </Panel>    
  );

  return (
    <div { ...useBlockProps() }>
      <ServerSideRender
        block="tasks-manager/tasks-progress"
        attributes={props.attributes}
      />
      <InspectorControls>
        { wrapperPanel }
      </InspectorControls>

    </div>
  );
};

export default Edit;
