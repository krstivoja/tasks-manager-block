import React, { useState, useEffect } from "react";

function TasksShortcode({
  backgroundColor,
  tasksListBackgroundColor,
  cardBackgroundColor,
  align,
}) {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    fetch("/wp-json/tasks-progress/v1/terms")
      .then((response) => response.json())
      .then((data) => setTerms(data));
  }, []);

  const alignClass = align ? `align${align}` : "";

  return (
    <div
      className={`tasks-shortcode ${alignClass}`}
      style={{ backgroundColor }}
    >
      {terms.map((term) => (
        <div className="tasks-group-wrap" key={term.term_id}>
          <h3>{term.name}</h3>
          <div
            className="tasks-list"
            id={term.slug}
            data-term-id={term.term_id}
            style={{ backgroundColor: tasksListBackgroundColor }}
          >
            {/* TODO: Implement WP_Query in React */}
            {/* TODO: Render task items */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksShortcode;
