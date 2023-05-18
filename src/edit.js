/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { isEmpty } from "lodash";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";

/**
 * Custom Dependencies
 */
import "./editor.scss";
import TaskList from "./tasks-list.js";

import Colors from "./components/colors";
import Dimensions from "./components/dimensions";
import Border from "./components/border";
import Typography from "./components/typography";

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const {
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
    listTextColor,
    cardTextColor,
    listTextSize,
    cardTextSize,
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
            {
              value: listTextColor,
              label: __("Color", "tasks-manager"),
              onChange: (newListTextColor) => {
                setAttributes({ listTextColor: newListTextColor });
              },
              resetAllFilter: () => {
                setAttributes({ listTextColor: "" });
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
        <Typography
          value={listTextSize}
          onChange={(newListTextSize) =>
            props.setAttributes({ listTextSize: newListTextSize })
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
            {
              value: cardTextColor,
              label: __("Color", "tasks-manager"),
              onChange: (newCardTextColor) => {
                setAttributes({ cardTextColor: newCardTextColor });
              },
              resetAllFilter: () => {
                setAttributes({ cardTextColor: "" });
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
        <Typography
          value={cardTextSize}
          onChange={(newCardTextSize) =>
            props.setAttributes({ cardTextSize: newCardTextSize })
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
        wrapperPadding={wrapperPadding}
        listBorder={listBorder}
        cardBorder={cardBorder}
        cardPadding={cardPadding}
        listPadding={listPadding}
        groupSpacing={groupSpacing}
        wrapperBorder={wrapperBorder}
        listTextColor={listTextColor}
        listTextSize={listTextSize}
        cardTextColor={cardTextColor}
        cardTextSize={cardTextSize}
        listCardSpacing={listCardSpacing}
        listBackgroundColor={listBackgroundColor}
        cardBackgroundColor={cardBackgroundColor}
        wrapperBackgroundColor={wrapperBackgroundColor}
      />
    </div>
  );
};

export default Edit;
