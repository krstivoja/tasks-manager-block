import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/server-side-render';
import './editor.scss';

export default function Edit(props) {
  console.log(props); // log the props object
  const blockProps = useBlockProps({ className: 'alignfull' });
  return (
    <div {...blockProps}>
      <ServerSideRender
        block="tasks-manager/tasks-progress"
        attributes={props.attributes}
      />
    </div>
  );
}
