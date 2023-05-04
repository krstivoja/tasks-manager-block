import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/editor';
import './editor.scss';

const Edit = (props) => {
  return (
    <div { ...useBlockProps() }>
      <ServerSideRender
        block="tasks-manager/tasks-progress"
        attributes={props.attributes}
      />
    </div>
  );
};

export default Edit;
