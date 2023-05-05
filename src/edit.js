import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import { TabPanel, PanelBody, ColorPalette } from '@wordpress/components';
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

    
    const pattletes = {
        tab1: 
            <PanelBody title={__('Background', 'tasks-manager')} >
                <ColorPalette
                    value={backgroundColor}
                    colors={[...useSetting('color.palette')]}
                    onChange={setBackgroundColor}
                />
            </PanelBody>     
        ,

        tab2: 
        <PanelBody title={__('Background', 'tasks-manager')} >
        <ColorPalette
            value={tasksListBackgroundColor}
            colors={[...useSetting('color.palette')]}
            onChange={setTasksListBackgroundColor}
        />
        </PanelBody>
        ,

        tab3: 
        <PanelBody title={__('Background', 'tasks-manager')} >
        <ColorPalette
            value={cardBackgroundColor}
            colors={[...useSetting('color.palette')]}
            onChange={setCardBackgroundColor}
        />
        </PanelBody>        
    }

    const onSelect = ( tabName ) => {
        console.log( 'Selecting tab', tabName );
    };

    return (
        <div {...useBlockProps()}>
            
            <InspectorControls>
                <TabPanel
                    className="my-tab-panel"
                    activeClass="is-active"
                    onSelect={ onSelect }
                    tabs={ [
                        {
                            name: 'tab1',
                            title: __('Wrapper', 'tasks-manager'),
                            className: 'tab-one',
                        },
                        {
                            name: 'tab2',
                            title: __('Lists', 'tasks-manager'),
                            className: 'tab-two',
                        },
                        {
                            name: 'tab3',
                            title: __('Cards', 'tasks-manager'),
                            className: 'tab-three',
                        },
                    ] }
                >
                    { ( tab ) => pattletes[tab.name] }
                </TabPanel>
            </InspectorControls>

            <ServerSideRender block="tasks-manager/tasks-progress" attributes={attributes} />
        </div>
    );
};

export default Edit;
