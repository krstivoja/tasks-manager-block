import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Task Manager Block – hello from the editor!',
				'task-manager-block'
			) }
		</p>
	);
}
