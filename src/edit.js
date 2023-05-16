/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { isEmpty } from "lodash";
import {
  useBlockProps,
  InspectorControls,
  useSetting,
} from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";

/**
 * Custom Dependencies
 */
import "./editor.scss";
import TaskList from "./tasks-list.js";

import Colors from "./components/colors";
import Dimensions from "./components/dimensions";

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const { backgroundColor, wrapperPadding, groupSpacing } = attributes;

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
    wrapper: (
      <>
        <Colors
          resetAll={() => {
            setAttributes({ backgroundColor: "" });
          }}
          settings={[
            {
              value: backgroundColor,
              onChange: (newBackgroundColor) => {
                setAttributes({ backgroundColor: newBackgroundColor });
              },
              label: __("Background", "tasks-manager"),
              resetAllFilter: () => {
                setAttributes({ backgroundColor: "" });
              },
            },
          ]}
        />
        <Dimensions
          settings={[
            {
              label: __("Padding", "tasks-manager"),
              hasValue: () => !isEmpty(wrapperPadding),
              sides: ["top", "right", "bottom", "left"],
              onResetAll: () => props.setAttributes({ wrapperPadding: {} }),
              onChange: (newWrapperPadding) =>
                props.setAttributes({ wrapperPadding: newWrapperPadding }),
              values: wrapperPadding,
            },
            {
              label: __("Spacing", "tasks-manager"),
              hasValue: () => !isEmpty(groupSpacing),
              onResetAll: () => props.setAttributes({ groupSpacing: {} }),
              onChange: (newGroupSpacing) => {
                props.setAttributes({ groupSpacing: newGroupSpacing });
              },
              sides: ["all"],
              values: groupSpacing,
            },
          ]}
        />
      </>
    ),
    // lists: (
    //   <PanelBody title={__("Background", "tasks-manager")}>
    //     <ColorPalette
    //       value={tasksListBackgroundColor}
    //       colors={[...useSetting("color.palette")]}
    //       onChange={setTasksListBackgroundColor}
    //     />
    //     <GapControl value={sgapSize} onChange={setsgapSize} />
    //   </PanelBody>
    // ),
    // cards: (
    //   <PanelBody title={__("Background", "tasks-manager")}>
    //     <ColorPalette
    //       value={cardBackgroundColor}
    //       colors={[...useSetting("color.palette")]}
    //       onChange={setCardBackgroundColor}
    //     />
    //   </PanelBody>
    // ),
  };

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <TabPanel
          tabs={[
            {
              name: "wrapper",
              title: __("Wrapper", "tasks-manager"),
            },
            // {
            //   name: "lists",
            //   title: __("Lists", "tasks-manager"),
            // },
            // {
            //   name: "cards",
            //   title: __("Cards", "tasks-manager"),
            // },
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
        groupSpacing={groupSpacing}
        cardBackgroundColor={attributes.cardBackgroundColor}
        wrapperPadding={wrapperPadding}
        gapSize={attributes.gapSize}
        spaddingSize={attributes.spaddingSize}
        sgapSize={attributes.sgapSize}
      />
    </div>
  );
};

export default Edit;
