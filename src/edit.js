/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { isEmpty } from "lodash";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
  TabPanel,
  PanelBody,
  __experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";

/**
 * Custom Dependencies
 */
import "./editor.scss";
import TaskList from "./tasks-list.js";

import Colors from "./components/colors";
import Dimensions from "./components/dimensions";
import Border from "./components/border";

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const {
    backgroundColor,
    wrapperPadding,
    groupSpacing,
    wrapperBorder,
    wrapperBackgroundColor,
    listPadding,
    listBorder,
    listBackgroundColor,
    listCardSpacing,
    cardBorder,
    cardPadding,
    cardBackgroundColor,
  } = attributes;

  const tabs = {
    wrapper: (
      <>
        <Colors
          resetAll={() => {
            setAttributes({ wrapperBackgroundColor: "" });
          }}
          settings={[
            {
              value: wrapperBackgroundColor,
              onChange: (newBackgroundColor) => {
                setAttributes({ wrapperBackgroundColor: newBackgroundColor });
              },
              label: __("Background", "tasks-manager"),
              resetAllFilter: () => {
                setAttributes({ wrapperBackgroundColor: "" });
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
        <Border
          value={wrapperBorder}
          onChange={(newWrapperBorder) =>
            props.setAttributes({ wrapperBorder: newWrapperBorder })
          }
        />
      </>
    ),
    lists: (
      <>
        <Colors
          resetAll={() => {
            setAttributes({ listBackgroundColor: "" });
          }}
          settings={[
            {
              value: listBackgroundColor,
              onChange: (newListBackgroundColor) => {
                setAttributes({ listBackgroundColor: newListBackgroundColor });
              },
              label: __("Background", "tasks-manager"),
              resetAllFilter: () => {
                setAttributes({ listBackgroundColor: "" });
              },
            },
          ]}
        />
        <Dimensions
          settings={[
            {
              label: __("Padding", "tasks-manager"),
              hasValue: () => !isEmpty(listPadding),
              sides: ["top", "right", "bottom", "left"],
              onResetAll: () => props.setAttributes({ listPadding: {} }),
              onChange: (newListPadding) =>
                props.setAttributes({ listPadding: newListPadding }),
              values: listPadding,
            },
            {
              label: __("Block Spacing", "tasks-manager"),
              hasValue: () => !isEmpty(listCardSpacing),
              onResetAll: () => props.setAttributes({ listCardSpacing: {} }),
              onChange: (newListCardSpacing) => {
                props.setAttributes({ listCardSpacing: newListCardSpacing });
              },
              sides: ["all"],
              values: listCardSpacing,
            },
          ]}
        />
        <Border
          value={listBorder}
          onChange={(newListBorder) =>
            props.setAttributes({ listBorder: newListBorder })
          }
        />
      </>
    ),
    cards: (
      <>
        <Colors
          resetAll={() => {
            setAttributes({ cardBackgroundColor: "" });
          }}
          settings={[
            {
              value: cardBackgroundColor,
              onChange: (newCardBackgroundColor) => {
                setAttributes({ cardBackgroundColor: newCardBackgroundColor });
              },
              label: __("Background", "tasks-manager"),
              resetAllFilter: () => {
                setAttributes({ cardBackgroundColor: "" });
              },
            },
          ]}
        />
        <Dimensions
          settings={[
            {
              label: __("Padding", "tasks-manager"),
              hasValue: () => !isEmpty(cardPadding),
              sides: ["top", "right", "bottom", "left"],
              onResetAll: () => props.setAttributes({ cardPadding: {} }),
              onChange: (newCardPadding) =>
                props.setAttributes({ cardPadding: newCardPadding }),
              values: cardPadding,
            },
          ]}
        />
        <Border
          value={cardBorder}
          onChange={(newCardBorder) =>
            props.setAttributes({ cardBorder: newCardBorder })
          }
        />
      </>
    ),
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
            {
              name: "lists",
              title: __("Lists", "tasks-manager"),
            },
            {
              name: "cards",
              title: __("Cards", "tasks-manager"),
            },
          ]}
        >
          {(tab) => tabs[tab.name]}
        </TabPanel>
      </InspectorControls>

      <TaskList
        block="tasks-manager/tasks-progress"
        attributes={attributes}
        listBackgroundColor={listBackgroundColor}
        wrapperPadding={wrapperPadding}
        listBorder={listBorder}
        cardBorder={cardBorder}
        cardPadding={cardPadding}
        listPadding={listPadding}
        groupSpacing={groupSpacing}
        wrapperBorder={wrapperBorder}
        listCardSpacing={listCardSpacing}
        cardBackgroundColor={cardBackgroundColor}
        wrapperBackgroundColor={wrapperBackgroundColor}
      />
    </div>
  );
};

export default Edit;
