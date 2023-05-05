import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import { TabPanel, ColorPalette } from '@wordpress/components';
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
            <TabPanel
                className="tasks-manager-tab-panel"
                activeClass="active-tab"
                tabs={[
                    {
                        name: 'wrapper-background-color',
                        title: __('Wrapper Background Color', 'tasks-manager'),
                        className: 'tasks-manager-tab-panel'
                    },
                    {
                        name: 'columns-background-color',
                        title: __('Columns Background Color', 'tasks-manager'),
                        className: 'tasks-manager-tab-panel',
                    },
                    {
                        name: 'card-background-color',
                        title: __('Card Background Color', 'tasks-manager'),
                        className: 'tasks-manager-tab-panel'
                    }
                ]}
            >
                { (tab) => {
                    switch (tab.name) {
                        case 'wrapper-background-color':
                            return (
                                <ColorPalette
                                    value={backgroundColor}
                                    colors={[...useSetting('color.palette')]}
                                    onChange={setBackgroundColor}
                                />
                            );
                        case 'columns-background-color':
                            return (
                                <ColorPalette
                                    value={tasksListBackgroundColor}
                                    colors={[...useSetting('color.palette')]}
                                    onChange={setTasksListBackgroundColor}
                                />
                            );
                        case 'card-background-color':
                            return (
                                <ColorPalette
                                    value={cardBackgroundColor}
                                    colors={[...useSetting('color.palette')]}
                                    onChange={setCardBackgroundColor}
                                />
                            );
                        default:
                            return null;
                    }
                } }
            </TabPanel>
        </InspectorControls>
            <ServerSideRender block="tasks-manager/tasks-progress" attributes={attributes} />
        </div>
    );
};

export default Edit;
