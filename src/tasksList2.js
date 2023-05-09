import React, { useState, useEffect } from 'react';

function TaskList(props) {
  const [terms, setTerms] = useState([]);
  const [tasksByGroup, setTasksByGroup] = useState({});

  useEffect(() => {
    async function fetchTerms() {
      const response = await fetch('/wp-json/wp/v2/progress');
      const data = await response.json();
      setTerms(data);
    }
    fetchTerms();
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`/wp-json/wp/v2/tasks?_embed&per_page=100`);
      const data = await response.json();

      const groupedTasks = data.reduce((groups, task) => {
        const progressTermId = task.progress[0];
        if (!groups[progressTermId]) {
          groups[progressTermId] = [];
        }
        groups[progressTermId].push(task);
        return groups;
      }, {});

      setTasksByGroup(groupedTasks);
    }
    fetchTasks();
  }, []);

  return (
    <div className='tasks-shortcode' style={{ backgroundColor: props.backgroundColor }}>
      {terms.map(term => (
        <div key={term.id} className='tasks-group-wrap'>
          <h3>{term.name}</h3>
          {tasksByGroup[term.id] && tasksByGroup[term.id].length > 0 ? (
            <div className='tasks-list' style={{ backgroundColor: props.tasksListBackgroundColor }}>
              {tasksByGroup[term.id].map(task => (
                <div key={task.id} className='task-item' style={{ backgroundColor: props.cardBackgroundColor }}>
                  <span className="task-title">{task.title.rendered}</span>
                  <div dangerouslySetInnerHTML={{ __html: task.content.rendered }}></div>
                  <button className="read-more wp-element-button" data-id={task.id}>Read More</button>

                    <dialog className="task-content" id={`task-content-${task.id}`}>
                    <div className="wrap">
                        <h1>{task.title.rendered}</h1>
                        <div dangerouslySetInnerHTML={{ __html: task.content.rendered }}></div>
                        <div className="actions">
                        {props.isAdmin && (
                            <a className="edit-task" href={`/wp-admin/post.php?post=${task.id}&action=edit`} target="_blank">Edit</a>
                        )}
                        <button className="close-dialog" data-id={task.id}>Close</button>
                        </div>
                    </div>
                    </dialog>

                </div>
              ))}
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