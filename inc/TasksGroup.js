import { useEffect, useState } from 'react';
import axios from 'axios';

function TaskItem({ id, cardBackgroundColor, title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="task-item" data-id={id} style={{ backgroundColor: cardBackgroundColor }}>
      <span className="task-title">{title}</span>
      <button className="read-more wp-element-button" data-id={id} onClick={() => setOpen(true)}>Read More</button>
      {open && (
        <dialog className="task-content" id={`task-content-${id}`} open={open}>
          <div className="wrap">
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div className="actions">
              {userIsAdmin && <a className="edit-task" href={`/wp-admin/post.php?post=${id}&action=edit`} target="_blank">Edit</a>}
              <button className="close-dialog" data-id={id} onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

function TasksList({ tasks, cardBackgroundColor }) {
  return (
    <>
      {tasks.map(task => (
        <TaskItem key={task.id} id={task.id} title={task.title.rendered} content={task.content.rendered} cardBackgroundColor={cardBackgroundColor} />
      ))}
    </>
  );
}

function TasksGroup({ term }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/wp-json/wp/v2/tasks?taxonomy=progress&per_page=-1&orderby=menu_order&order=ASC&progress=${term.id}`)
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, [term]); // update only when term changes

  return (
    <div className="tasks-group-wrap">
      <h3>{term.name}</h3>
      <div className="tasks-list" id={term.slug} data-term-id={term.id} style={{ backgroundColor: `${atts.tasksListBackgroundColor}` }}>
        <TasksList tasks={tasks} cardBackgroundColor={atts.cardBackgroundColor} />
      </div>
    </div>
  );
}

export default TasksGroup;
