import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, ColorPalette } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

const Edit = (props) => {
    const { attributes, setAttributes } = props;
    const { backgroundColor, tasksListBackgroundColor } = attributes;

    const setBackgroundColor = (value) => {
        setAttributes({ backgroundColor: value });
    };

    const setTasksListBackgroundColor = (value) => {
        setAttributes({ tasksListBackgroundColor: value });
    };

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody title={__('Background Color', 'tasks-manager')} >
                    <ColorPalette
                        value={backgroundColor}
                        colors={[...useSetting('color.palette')]}
                        onChange={setBackgroundColor}
                    />
                </PanelBody>
                <PanelBody title={__('Tasks List Color', 'tasks-manager')} >
                    <ColorPalette
                        value={tasksListBackgroundColor}
                        colors={[...useSetting('color.palette')]}
                        onChange={setTasksListBackgroundColor}
                    />
                </PanelBody>
            </InspectorControls>
            <ServerSideRender block="tasks-manager/tasks-progress" attributes={attributes} />
        </div>
    );
};

export default Edit;
