import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';

import './style.scss';

registerBlockType('tasks-manager/tasks-progress', {
  title: __('Tasks Manager Block'),
  icon: 'calendar',
  category: 'common',
  edit: Edit,
  save: Save
});
