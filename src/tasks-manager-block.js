const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { ServerSideRender } = wp.editor;
const { createElement } = wp.element;

registerBlockType('tasks-manager/tasks-progress', {
  title: __('Tasks Progress'),
  icon: 'list-view',
  category: 'common',
  edit: (props) => {
    return createElement(
      'div',
      { className: 'alignfull' },
      createElement(ServerSideRender, {
        block: 'tasks-manager/tasks-progress',
        attributes: props.attributes,
      })
    );
  },
  save: () => {
    // Since this is a dynamic block, the save function returns null.
    return null;
  },
});
