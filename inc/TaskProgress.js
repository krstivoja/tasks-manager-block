import React, { useState, useEffect } from "react";
import axios from "axios";

import TasksGroup from "./TasksGroup";

function TasksProgress({
  backgroundColor,
  tasksListBackgroundColor,
  cardBackgroundColor,
  align,
}) {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    axios
      .get("/wp-json/tasks-progress/v1/terms", {
        params: {
          taxonomy: "progress",
          per_page: -1,
          orderby: "menu_order",
          order: "ASC",
        },
      })
      .then((res) => {
        const termsArray = [];
        const posts = res.data;
        posts.forEach((post) => {
          termsArray.push(post.progress[0]);
        });
        const uniqueTerms = [...new Set(termsArray)];
        setTerms(uniqueTerms); // set state to the unique list of progress terms
      })
      .catch((err) => console.log(err));
  }, []); // run once on page load

  const alignClasses = align ? `align${align}` : "";

  return (
    <div
      className={`tasks-shortcode ${alignClasses}`}
      style={{ backgroundColor }}
    >
      {terms.map((term) => (
        <div className="tasks-group-wrap" key={term.id}>
          <h3>{term.name}</h3>
          <div
            className="tasks-list"
            id={term.slug}
            data-term-id={term.id}
            style={{ backgroundColor: tasksListBackgroundColor }}
          >
            <TasksGroup term={term} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksProgress;
