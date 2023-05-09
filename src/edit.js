import './editor.scss';

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import { TabPanel, PanelBody, ColorPalette, __experimentalUnitControl as UnitControl, Button, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import TaskList from './tasksList.js';

const Edit = (props) => {
    const marks = [
        {
            value: 0
        },
        {
            value: 20
        },
        {
            value: 40
        },
        {
            value: 60
        },
        {
            value: 80
        },
        {
            value: 100
        },
    ];
    const { attributes, setAttributes } = props;
    const { backgroundColor, tasksListBackgroundColor, cardBackgroundColor, paddingSize, gapSize, spaddingSize, sgapSize} = attributes;

    const setBackgroundColor = (value) => {
        setAttributes({ backgroundColor: value });
    };

    const setTasksListBackgroundColor = (value) => {
        setAttributes({ tasksListBackgroundColor: value });
    };

    const setCardBackgroundColor = (value) => {
        setAttributes({ cardBackgroundColor: value });
    };
    const ButtonAction = () => {
        var tab = document.querySelector(".tab-one");
        if (tab.classList.contains("is-active")) {
            let textElement = tab.parentElement.parentElement.querySelector('.components-tab-panel__tab-content');
            if (textElement) {
                textElement.classList.toggle('gap');
            }
        }
    };
    const ButtonTAction = () => {
        var tab = document.querySelector(".tab-one");
        if (tab.classList.contains("is-active")) {
            let textElement1 = tab.parentElement.parentElement.querySelector('.components-tab-panel__tab-content');
            if (textElement1) {
                if (textElement1.classList.contains("padding-full")) {
                    textElement1.classList.add('padding-diff');
                    textElement1.classList.remove('padding-full');
                } else if (textElement1.classList.contains("padding-diff")) {
                    textElement1.classList.remove('padding-diff');
                } else {
                    textElement1.classList.add('padding-full');
                }
            }
        }
    };

    const ButtonActionT = () => {
        var tab = document.querySelector(".tab-two");
        if (tab.classList.contains("is-active")) {
            let textElement = tab.parentElement.parentElement.querySelector('.components-tab-panel__tab-content');
            if (textElement) {
                textElement.classList.toggle('gap');
            }
        }
    };
    const ButtonTActionT = () => {
        var tab = document.querySelector(".tab-two");
        if (tab.classList.contains("is-active")) {
            let textElement1 = tab.parentElement.parentElement.querySelector('.components-tab-panel__tab-content');
            if (textElement1) {
                if (textElement1.classList.contains("padding-full")) {
                    textElement1.classList.add('padding-diff');
                    textElement1.classList.remove('padding-full');
                } else if (textElement1.classList.contains("padding-diff")) {
                    textElement1.classList.remove('padding-diff');
                } else {
                    textElement1.classList.add('padding-full');
                }
            }
        }
    };
    const setsgapSize = (value) => {
        setAttributes({ sgapSize: value });
    };

    const setgapSize = (value) => {
        setAttributes({ gapSize: value });
    };

    const pattletes = {
        tab1:
            <PanelBody title={__('Background', 'tasks-manager')} >
                <ColorPalette
                    value={backgroundColor}
                    colors={[...useSetting('color.palette')]}
                    onChange={setBackgroundColor}
                />
                <Button variant="secondary" label="Set custom size" className="gap-button" icon="settings" onClick={ButtonAction}></Button>
                <UnitControl onChange={setgapSize} value={gapSize} label="BLOCK SPACING" className="gap-text" />
                <RangeControl label="BLOCK SPACING" initialPosition={parseInt(gapSize, 10)} marks={marks} className="gap-line" separatorType="topFullWidth" withInputField="false" step={20} value={gapSize} onChange={(value) => { setAttributes({ gapSize: `${value}px` }); }} />
                <Button variant="secondary" label="Set custom size" className="padding-button" icon="settings" onClick={ButtonTAction}></Button>
                <BoxControl allowReset="false" className="padding-box" label="PADDING" values={paddingSize} onChange={(value) => { setAttributes({ paddingSize: value }); }} />
                <RangeControl label="PADDING" initialPosition={parseInt(paddingSize["top"], 10)} marks={marks} className="padding-all" separatorType="topFullWidth" withInputField="false" step={20} value={paddingSize} onChange={(value) => { setAttributes({ paddingSize: { top: `${value}px`, bottom: `${value}px`, left: `${value}px`, right: `${value}px` }); }} />
                <RangeControl label="PADDING TOP" initialPosition={parseInt(paddingSize["top"], 10)}  marks={marks} className="padding-top" separatorType="topFullWidth" withInputField="false" step={20} value={paddingSize["top"]} onChange={(value) => { setAttributes({ paddingSize: { top: `${value}px`, bottom: paddingSize["bottom"], left: paddingSize["left"], right: paddingSize["right"] } }); }} />
                <RangeControl label="PADDING BOTTOM" initialPosition={parseInt(paddingSize["bottom"], 10)} marks={marks} className="padding-bottom" separatorType="topFullWidth" withInputField="false" step={20} value={paddingSize["bottom"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: `${value}px`, left: paddingSize["left"], right: paddingSize["right"] } }); }} />
                <RangeControl label="PADDING LEFT" initialPosition={parseInt(paddingSize["left"], 10)} marks={marks} className="padding-left" separatorType="topFullWidth" withInputField="false" step={20} value={paddingSize["left"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: paddingSize["bottom"], left: `${value}px`, right: paddingSize["right"] } }); }} />
                <RangeControl label="PADDING RIGHT" initialPosition={parseInt(paddingSize["right"], 10)} marks={marks} className="padding-right" separatorType="topFullWidth" withInputField="false" step={20} value={paddingSize["right"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: paddingSize["bottom"], left: paddingSize["left"], right: `${value}px` } }); }} />

            </PanelBody>
        ,

        tab2: 
        <PanelBody title={__('Background', 'tasks-manager')} >
        <ColorPalette
            value={tasksListBackgroundColor}
            colors={[...useSetting('color.palette')]}
            onChange={setTasksListBackgroundColor}
                />
                <Button variant="secondary" label="Set custom size" className="gap-button" icon="settings" onClick={ButtonActionT}></Button>
                <UnitControl onChange={setsgapSize} value={sgapSize} label="BLOCK SPACING" className="gap-text" />
                <RangeControl label="BLOCK SPACING" initialPosition={parseInt(sgapSize, 10)} marks={marks} className="gap-line" separatorType="topFullWidth" withInputField="false" step={20} value={sgapSize} onChange={(value) => { setAttributes({ sgapSize: `${value}px` }); }} />
                <Button variant="secondary" label="Set custom size" className="padding-button" icon="settings" onClick={ButtonTActionT}></Button>
                <BoxControl allowReset="false" className="padding-box" label="PADDING" values={spaddingSize} onChange={(value) => { setAttributes({ spaddingSize: value }); }} />
                <RangeControl label="PADDING" initialPosition={parseInt(spaddingSize["top"], 10)} marks={marks} className="padding-all" separatorType="topFullWidth" withInputField="false" step={20} value={spaddingSize} onChange={(value) => { setAttributes({ spaddingSize: { top: `${value}px`, bottom: `${value}px`, left: `${value}px`, right: `${value}px` }); }} />
                <RangeControl label="PADDING TOP" initialPosition={parseInt(spaddingSize["top"], 10)} marks={marks} className="padding-top" separatorType="topFullWidth" withInputField="false" step={20} value={spaddingSize["top"]} onChange={(value) => { setAttributes({ spaddingSize: { top: `${value}px`, bottom: spaddingSize["bottom"], left: spaddingSize["left"], right: spaddingSize["right"] } }); }} />
                <RangeControl label="PADDING BOTTOM" initialPosition={parseInt(spaddingSize["bottom"], 10)} marks={marks} className="padding-bottom" separatorType="topFullWidth" withInputField="false" step={20} value={spaddingSize["bottom"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: `${value}px`, left: spaddingSize["left"], right: spaddingSize["right"] } }); }} />
                <RangeControl label="PADDING LEFT" initialPosition={parseInt(spaddingSize["left"], 10)} marks={marks} className="padding-left" separatorType="topFullWidth" withInputField="false" step={20} value={spaddingSize["left"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: spaddingSize["bottom"], left: `${value}px`, right: spaddingSize["right"] } }); }} />
                <RangeControl label="PADDING RIGHT" initialPosition={parseInt(spaddingSize["right"], 10)} marks={marks} className="padding-right" separatorType="topFullWidth" withInputField="false" step={20} value={spaddingSize["right"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: spaddingSize["bottom"], left: spaddingSize["left"], right: `${value}px` } }); }} />

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

            <TaskList 
                block="tasks-manager/tasks-progress" 
                attributes={attributes} 
                backgroundColor={attributes.backgroundColor} 
                tasksListBackgroundColor={attributes.tasksListBackgroundColor} 
                cardBackgroundColor={attributes.cardBackgroundColor}
                paddingSize={attributes.paddingSize}
                gapSize={attributes.gapSize}
                spaddingSize={attributes.spaddingSize}
                sgapSize={attributes.sgapSize}
            />


        </div>
    );
};

export default Edit;
