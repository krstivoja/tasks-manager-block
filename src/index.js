import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { ServerSideRender } from '@wordpress/editor';
import { createElement } from '@wordpress/element';
import Edit from './edit';

registerBlockType('tasks-manager/tasks-progress', {
  title: __('Tasks Progress'),
  icon: 'list-view',
  category: 'common',
  edit: Edit,
  save: () => {
    // Since this is a dynamic block, the save function returns null.
    return null;
  },
});
