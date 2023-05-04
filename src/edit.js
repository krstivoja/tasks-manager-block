import { ServerSideRender } from '@wordpress/editor';

const Edit = (props) => {
  return (
    <div className="alignfull">
      <ServerSideRender
        block="tasks-manager/tasks-progress"
        attributes={props.attributes}
      />
    </div>
  );
};

export default Edit;
