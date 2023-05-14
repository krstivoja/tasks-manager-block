import './editor.scss';
import { useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import { TabPanel, PanelBody, RangeControl, ColorPalette, __experimentalUnitControl as UnitControl, Button, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import TaskList from './tasksList.js';
import GapControl from './components/GapControl.js';

const Edit = (props) => {
    const bacis = [...useSetting('spacing.spacingSizes')].map(s => ({ value: s.slug }));
    const additional = [{ "value": 0 }];
    const marks = additional.concat(bacis);
    const max = bacis.length;
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
                <ColorPalette value={backgroundColor} colors={[...useSetting('color.palette')]} onChange={setBackgroundColor} />
                <GapControl value={gapSize} onChange={setgapSize} />

                <Button variant="secondary" label="Set custom size" className="padding-button" icon="admin-settings" onClick={ButtonTAction}></Button>
                <BoxControl allowReset="false" className="padding-box" label="PADDING" values={paddingSize} onChange={(value) => { setAttributes({ paddingSize: value }); }} />
                <RangeControl label="PADDING" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["top"], 10))} className="padding-all" separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize} onChange={(value) => { setAttributes({ paddingSize: { top: `${marks[value]["value"]}px`, bottom: `${marks[value]["value"]}px`, left: `${marks[value]["value"]}px`, right: `${marks[value]["value"]}px` } }) }} />
                <RangeControl label="PADDING TOP" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["top"], 10))}  className="padding-top" separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize["top"]} onChange={(value) => { setAttributes({ paddingSize: { top: `${marks[value]["value"]}px`, bottom: paddingSize["bottom"], left: paddingSize["left"], right: paddingSize["right"] } }); }} />
                <RangeControl label="PADDING BOTTOM" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["bottom"], 10))} className="padding-bottom" separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize["bottom"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: `${marks[value]["value"]}px`, left: paddingSize["left"], right: paddingSize["right"] } }); }} />
                <RangeControl label="PADDING LEFT" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["left"], 10))} className="padding-left" separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize["left"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: paddingSize["bottom"], left: `${marks[value]["value"]}px`, right: paddingSize["right"] } }); }} />
                <RangeControl label="PADDING RIGHT" initialPosition={marks.findIndex(p => p.value == parseInt(paddingSize["right"], 10))} className="padding-right" separatorType="topFullWidth" withInputField="false" max={max} value={paddingSize["right"]} onChange={(value) => { setAttributes({ paddingSize: { top: paddingSize["top"], bottom: paddingSize["bottom"], left: paddingSize["left"], right: `${marks[value]["value"]}px` } }); }} />

            </PanelBody>
        ,

        tab2: 
        <PanelBody title={__('Background', 'tasks-manager')} >
            <ColorPalette value={tasksListBackgroundColor} colors={[...useSetting('color.palette')]} onChange={setTasksListBackgroundColor} />                
            <GapControl value={sgapSize} onChange={setsgapSize} />

            <Button variant="secondary" label="Set custom size" className="padding-button" icon="admin-settings" onClick={ButtonTActionT}></Button>
            <BoxControl allowReset="false" className="padding-box" label="PADDING" values={spaddingSize} onChange={(value) => { setAttributes({ spaddingSize: value }); }} />
            <RangeControl label="PADDING" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["top"], 10))} className="padding-all" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize} onChange={(value) => { setAttributes({ spaddingSize: { top: `${marks[value]["value"]}px`, bottom: `${marks[value]["value"]}px`, left: `${marks[value]["value"]}px`, right: `${marks[value]["value"]}px` } }); }} />
            <RangeControl label="PADDING TOP" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["top"], 10))} className="padding-top" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize["top"]} onChange={(value) => { setAttributes({ spaddingSize: { top: `${marks[value]["value"]}px`, bottom: spaddingSize["bottom"], left: spaddingSize["left"], right: spaddingSize["right"] } }); }} />
            <RangeControl label="PADDING BOTTOM" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["bottom"], 10))} className="padding-bottom" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize["bottom"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: `${marks[value]["value"]}px`, left: spaddingSize["left"], right: spaddingSize["right"] } }); }} />
            <RangeControl label="PADDING LEFT" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["left"], 10))} className="padding-left" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize["left"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: spaddingSize["bottom"], left: `${marks[value]["value"]}px`, right: spaddingSize["right"] } }); }} />
            <RangeControl label="PADDING RIGHT" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["right"], 10))} className="padding-right" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize["right"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: spaddingSize["bottom"], left: spaddingSize["left"], right: `${marks[value]["value"]}px` } }); }} />

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
