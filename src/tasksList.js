import React, { Component } from 'react';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],
      tasksByGroup: {},
    };
  }

  componentDidMount() {
    this.fetchTerms();
    this.fetchTasks();
  }

  async fetchTerms() {
    const response = await fetch('/wp-json/wp/v2/progress');
    const data = await response.json();
    this.setState({ terms: data });
  }

  async fetchTasks() {
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

    this.setState({ tasksByGroup: groupedTasks });
  }

  render() {
    const { terms, tasksByGroup } = this.state;
    const { backgroundColor } = this.props;
  
    return (
        <div className='tasks-shortcode' style={{ backgroundColor, gap: this.props.gapSize, paddingTop: this.props.paddingSize["top"], paddingLeft: this.props.paddingSize["left"], paddingRight: this.props.paddingSize["right"], paddingBottom: this.props.paddingSize["bottom"] }}>
      {terms.map(term => (
        <div key={term.id} className='tasks-group-wrap'>
          <h3>{term.name}</h3>
          {tasksByGroup[term.id] && tasksByGroup[term.id].length > 0 ? (
                  <div className='tasks-list' style={{ backgroundColor: this.props.tasksListBackgroundColor, gap: this.props.sgapSize, paddingTop: this.props.spaddingSize["top"], paddingLeft: this.props.spaddingSize["left"], paddingRight: this.props.spaddingSize["right"], paddingBottom: this.props.spaddingSize["bottom"] }}>
              {tasksByGroup[term.id].map(task => (
                <div key={task.id} className='task-item' style={{ backgroundColor: this.props.cardBackgroundColor }}>
                  <span className="task-title">{task.title.rendered}</span>
                  <div dangerouslySetInnerHTML={{ __html: task.content.rendered }}></div>
                  <button className="read-more wp-element-button" data-id={task.id}>Read More</button>
  
                    <dialog className="task-content" id={`task-content-${task.id}`}>
                    <div className="wrap">
                        <h1>{task.title.rendered}</h1>
                        <div dangerouslySetInnerHTML={{ __html: task.content.rendered }}></div>
                        <div className="actions">
                        {this.props.isAdmin && (
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
  
}

export default TaskList;
