/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  useSetting,
} from "@wordpress/block-editor";
import { TabPanel, PanelBody, ColorPalette } from "@wordpress/components";

/**
 * Custom Dependencies
 */
import "./editor.scss";
import TaskList from "./tasks-list.js";
import GapControl from "./components/GapControl.js";

const Edit = (props) => {
  const bacis = [...useSetting("spacing.spacingSizes")].map((s) => ({
    value: s.slug,
  }));
  const additional = [{ value: 0 }];
  const marks = additional.concat(bacis);
  const max = bacis.length;
  const { attributes, setAttributes } = props;
  const {
    backgroundColor,
    tasksListBackgroundColor,
    cardBackgroundColor,
    paddingSize,
    gapSize,
    spaddingSize,
    sgapSize,
  } = attributes;

  const setBackgroundColor = (value) => {
    setAttributes({ backgroundColor: value });
  };

  const setTasksListBackgroundColor = (value) => {
    setAttributes({ tasksListBackgroundColor: value });
  };

  const setCardBackgroundColor = (value) => {
    setAttributes({ cardBackgroundColor: value });
  };
  const setsgapSize = (value) => {
    setAttributes({ sgapSize: value });
  };

  const setgapSize = (value) => {
    setAttributes({ gapSize: value });
  };

  const tabs = {
    tab1: (
      <PanelBody title={__("Background", "tasks-manager")}>
        <ColorPalette
          value={backgroundColor}
          colors={[...useSetting("color.palette")]}
          onChange={setBackgroundColor}
        />
        <GapControl value={gapSize} onChange={setgapSize} />
      </PanelBody>
    ),
    tab2: (
      <PanelBody title={__("Background", "tasks-manager")}>
        <ColorPalette
          value={tasksListBackgroundColor}
          colors={[...useSetting("color.palette")]}
          onChange={setTasksListBackgroundColor}
        />
        <GapControl value={sgapSize} onChange={setsgapSize} />

        {/* <Button variant="secondary" label="Set custom size" className="padding-button" icon="admin-settings" onClick={ButtonTActionT}></Button>
            <BoxControl allowReset="false" className="padding-box" label="PADDING" values={spaddingSize} onChange={(value) => { setAttributes({ spaddingSize: value }); }} />
            <RangeControl label="PADDING" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["top"], 10))} className="padding-all" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize} onChange={(value) => { setAttributes({ spaddingSize: { top: `${marks[value]["value"]}px`, bottom: `${marks[value]["value"]}px`, left: `${marks[value]["value"]}px`, right: `${marks[value]["value"]}px` } }); }} />
            <RangeControl label="PADDING TOP" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["top"], 10))} className="padding-top" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize["top"]} onChange={(value) => { setAttributes({ spaddingSize: { top: `${marks[value]["value"]}px`, bottom: spaddingSize["bottom"], left: spaddingSize["left"], right: spaddingSize["right"] } }); }} />
            <RangeControl label="PADDING BOTTOM" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["bottom"], 10))} className="padding-bottom" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize["bottom"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: `${marks[value]["value"]}px`, left: spaddingSize["left"], right: spaddingSize["right"] } }); }} />
            <RangeControl label="PADDING LEFT" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["left"], 10))} className="padding-left" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize["left"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: spaddingSize["bottom"], left: `${marks[value]["value"]}px`, right: spaddingSize["right"] } }); }} />
            <RangeControl label="PADDING RIGHT" initialPosition={marks.findIndex(p => p.value == parseInt(spaddingSize["right"], 10))} className="padding-right" separatorType="topFullWidth" withInputField="false" max={max} value={spaddingSize["right"]} onChange={(value) => { setAttributes({ spaddingSize: { top: spaddingSize["top"], bottom: spaddingSize["bottom"], left: spaddingSize["left"], right: `${marks[value]["value"]}px` } }); }} /> */}
      </PanelBody>
    ),
    tab3: (
      <PanelBody title={__("Background", "tasks-manager")}>
        <ColorPalette
          value={cardBackgroundColor}
          colors={[...useSetting("color.palette")]}
          onChange={setCardBackgroundColor}
        />
      </PanelBody>
    ),
  };

  const onSelect = (tabName) => {
    console.log("Selecting tab", tabName);
  };

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <TabPanel
          className="my-tab-panel"
          activeClass="is-active"
          onSelect={onSelect}
          tabs={[
            {
              name: "tab1",
              title: __("Wrapper", "tasks-manager"),
              className: "tab-one",
            },
            {
              name: "tab2",
              title: __("Lists", "tasks-manager"),
              className: "tab-two",
            },
            {
              name: "tab3",
              title: __("Cards", "tasks-manager"),
              className: "tab-three",
            },
          ]}
        >
          {(tab) => tabs[tab.name]}
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
