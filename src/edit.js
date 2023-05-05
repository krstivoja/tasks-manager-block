import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

const Edit = (props) => {
    const { attributes, setAttributes } = props;
    const { backgroundColor, tasksListBackgroundColor, cardBackgroundColor } = attributes;

    const setBackgroundColor = (value) => {
        setAttributes({ backgroundColor: value });
    };

    const setTasksListBackgroundColor = (value) => {
        setAttributes({ tasksListBackgroundColor: value });
    };

    const setCardBackgroundColor = (value) => {
        setAttributes({ cardBackgroundColor: value });
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
                <PanelBody title={__('Lists Background Color', 'tasks-manager')} >
                    <ColorPalette
                        value={tasksListBackgroundColor}
                        colors={[...useSetting('color.palette')]}
                        onChange={setTasksListBackgroundColor}
                    />
                </PanelBody>
                <PanelBody title={__('Cards Background Color', 'tasks-manager')} >
                    <ColorPalette
                        value={cardBackgroundColor}
                        colors={[...useSetting('color.palette')]}
                        onChange={setCardBackgroundColor}
                    />
                </PanelBody>
            </InspectorControls>

            <ServerSideRender block="tasks-manager/tasks-progress" attributes={attributes} />
        </div>
    );
};

export default Edit;
