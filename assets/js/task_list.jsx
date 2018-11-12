import React from 'react';
import _ from 'lodash';

export default function TaskList(props) {
  let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
  return <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>done</th>
          </tr>
        </thead>
        <tbody>
          {tasks}
        </tbody>
      </table>
    </div>
  </div>;
}

function Task(props) {
  let {task} = props;
  return <tr>
    <td>{task.title}</td>
    <td>{task.desc}</td>
    <td>{task.done ? "yes" : "no"}</td>
  </tr>;
}