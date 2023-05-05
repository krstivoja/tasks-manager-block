import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

const Edit = (props) => {
    const { attributes, setAttributes } = props;
    const { backgroundColor } = attributes;

    const updateBackgroundColor = (value) => {
        setAttributes({ backgroundColor: value.hex });
    };

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody title={__('Background Color', 'tasks-manager')}>
                    <ColorPicker
                        color={backgroundColor}
                        onChangeComplete={updateBackgroundColor}
                    />
                </PanelBody>
            </InspectorControls>
            <ServerSideRender
                block="tasks-manager/tasks-progress"
                attributes={attributes}
            />
        </div>
    );
};

export default Edit;
