/**
 * WordPress Dependencies
 */
import { isEmpty } from "lodash";
import { useSelect } from "@wordpress/data";
import { Placeholder, Spinner } from "@wordpress/components";

/**
 * Custom Dependencies
 */
import maybeProcessThemeVars from "./utils/process-theme-vars";

function TaskList(props) {
  const { terms, hasTermsResolved } = useSelect((select) => {
    const selectorArgs = [
      "taxonomy",
      "progress",
      {
        per_page: -1, // So that it pulls in every term.
      },
    ];

    return {
      /**
       * Using getEntityRecords so that the result is cached accross the block.
       */
      terms: select("core").getEntityRecords(...selectorArgs),
      hasTermsResolved: select("core").hasFinishedResolution(
        "getEntityRecords",
        selectorArgs
      ),
    };
  }, []);

  const { tasks, hasTasksResolved } = useSelect((select) => {
    const selectorArgs = [
      "postType",
      "tasks",
      {
        per_page: 100,
      },
    ];

    return {
      tasks: select("core").getEntityRecords(...selectorArgs),
      hasTasksResolved: select("core").hasFinishedResolution(
        "getEntityRecords",
        selectorArgs
      ),
    };
  }, []);

  if (!hasTermsResolved || !hasTasksResolved) {
    return (
      <Placeholder>
        <Spinner />
      </Placeholder>
    );
  }

  const getGroupedTasks = () => {
    // Safely exiting in case of error.
    if (isEmpty(tasks) || isEmpty(terms)) {
      return {};
    }

    return tasks.reduce((groups, task) => {
      const progressTermId = task.progress[0];
      if (!groups[progressTermId]) {
        groups[progressTermId] = [];
      }
      groups[progressTermId].push(task);
      return groups;
    }, {});
  };

  const groupedTasks = getGroupedTasks();

  return (
    <div
      className="tasks-shortcode"
      style={{
        backgroundColor: props.backgroundColor,
        gap: maybeProcessThemeVars(props.groupSpacing["all"]),
        paddingTop: maybeProcessThemeVars(props.wrapperPadding["top"]),
        paddingLeft: maybeProcessThemeVars(props.wrapperPadding["left"]),
        paddingRight: maybeProcessThemeVars(props.wrapperPadding["right"]),
        paddingBottom: maybeProcessThemeVars(props.wrapperPadding["bottom"]),
      }}
    >
      {terms.map((term) => (
        <div key={term.id} className="tasks-group-wrap">
          <h3>{term.name}</h3>
          {groupedTasks[term.id] && groupedTasks[term.id].length > 0 ? (
            <div
              className="tasks-list"
              style={{
                backgroundColor: props.tasksListBackgroundColor,
                gap: props.sgapSize,
                paddingTop: props.spaddingSize["top"],
                paddingLeft: props.spaddingSize["left"],
                paddingRight: props.spaddingSize["right"],
                paddingBottom: props.spaddingSize["bottom"],
              }}
            >
              {groupedTasks[term.id].map((task) => {
                return (
                  <div
                    key={task.id}
                    className="task-item"
                    style={{ backgroundColor: props.cardBackgroundColor }}
                  >
                    <span className="task-title">{task.title.rendered}</span>

                    <button
                      className="read-more wp-element-button"
                      data-id={task.id}
                    >
                      Read More
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
