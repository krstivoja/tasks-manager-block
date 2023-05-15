import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import "./style.scss";

registerBlockType("tasks-manager/tasks-progress", {
  title: __("Tasks Manager Block"),
  icon: "calendar",
  category: "common",
  edit: Edit,

  // Handled via PHP (Server Side).
  save: () => null,
});
