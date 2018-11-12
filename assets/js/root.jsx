import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

//import UserList from './user_list';
//import TaskList from './task_list';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      users: [],
      session: null,
    };

    this.fetch_tasks();
    this.fetch_users();
    this.create_session("bob@example.com");
  }

  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  fetch_tasks() {
    this.fetch_path(
      "/api/v1/tasks",
      (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      }
    );
  }
  
  create_session(email) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email}),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      }
    });
}
  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      }
    );
  }

  post(path, req, on_success) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(req),
      success: on_success,
    });
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header root={this} />
          <Route path="/" exact={true} render={() =>
            <TaskList tasks={this.state.tasks} />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  let {root} = props;
  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"}>Task Tracker 3</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
    </div>
    <div className="col-6">
      <div className="form-inline my-2">
        <input type="email" placeholder="email" />
        <button className="btn btn-secondary">Login</button>
      </div>
    </div>
  </div>;
}

function TaskList(props) {
  let tasks = _.map(props.tasks, (p) => <Task key={p.id} task={p} />);
  return <div className="row">
    {tasks}
  </div>;
}

function Task(props) {
  let {task} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">{task.desc} <br/>
        done: {task.done ? "yes" : "no"} <br/>
        time: {task.time}</p>
    </div>
  </div>;
}

function UserList(props) {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>email</th>
            <th>admin?</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
}


function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
    <td>{user.admin ? "yes" : "no"}</td>
  </tr>;
}










// //import { Link, BrowserRouter as Router, Route } from 'react-router-dom';


// export default function root_init(node) {
//   let tasks = window.tasks;
//   ReactDOM.render(<Root tasks={tasks}/>, node);
// }
// class Root extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       tasks: props.tasks,
//   //    users: [],
//   //    add_tasks_forms: new Map(),
//     };
//   //  this.fetch_tasks();
//   //  this.fetch_users();
//   //  this.create_session("bob@example.com", "pass1");
//   }

// //  fetch_path(path, callback) {
// //    $.ajax(path, {
// //      method: "get",
// //      dataType: "json",
// //      contentType: "application/json; charset=UTF-8",
// //      data: "",
// //      success: callback,
// //    });


// }

//   fetch_tasks() {
//   $.ajax("/api/v1/tasks", {
//       method: "get",
//       dataType: "json",
//       contentType: "application/json; charset=UTF-8",
//       data: "",
//       success: (resp) => {
//         let state1 = _.assign({}, this.state, { tasks: resp.data });
//         this.setState(state1);
//       }
//     });
//   }

//   create_session(email, password) {
//     $.ajax("/api/v1/sessions", {
//         method: "post",
//         dataType: "json",
//         contentType: "application/json; charset=UTF-8",
//         data: JSON.stringify({email, password}),
//         success: (resp) => {
//           let state1 = _.assign({}, this.state, { session: resp.data });
//           this.setState(state1);
//         }
//       });
//     }
  
//   fetch_users() {
//     $.ajax("/api/v1/users", {
//         method: "get",
//         dataType: "json",
//         contentType: "application/json; charset=UTF-8",
//         data: "",
//         success: (resp) => {
//           let state1 = _.assign({}, this.state, { users: resp.data });
//           this.setState(state1);
//         },
//       });
//     }

//     post(path, req, on_success) {
//       $.ajax(path, {
//         method: "post",
//         dataType: "json",
//         contentType: "application/json; charset=UTF-8",
//         data: JSON.stringify(req),
//         success: on_success,
//       });
//     }
  
//   render() {
//       return <div>
//         <Router>
//           <div>
//             <Header root={this} />
//             <Route path="/" exact={true} render={() =>
//               <TaskList tasks={this.state.tasks} />
//             } />
//             <Route path="/users" exact={true} render={() =>
//               <UserList users={this.state.users} />
//             } />
//           </div>
//         </Router>
//       </div>;
//   }
// }

// function Header(props) {
//   let {root} = props;
//   return <div className="row my-2">
//     <div className="col-4">
//       <h1><Link to={"/"}>Task Tracker 3</Link></h1>
//     </div>
//     <div className="col-2">
//       <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
//     </div>
//     <div className="col-6">
//       <div className="form-inline my-2">
//         <input type="email" placeholder="email" />
//         <button className="btn btn-secondary">Login</button>
//       </div>
//     </div>
//   </div>;
// }

// function TaskList(props) {
//   let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
//   return <div className="row">
//     {tasks}
//   </div>;
// }

// function Task(props) {
//   let {task} = props;
//   return <div className="card col-4">
//     <div className="card-body">
//       <h2 className="card-title">{task.title}</h2>
//       <p className="card-text">{task.desc} <br/>
//       done: {task.done ? "yes" : "no"} <br/>
//       time: {task.time}</p>
//     </div>
//   </div>;
// }

// function UserList(props) {
//   let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
//   return <div className="row">
//     <div className="col-12">
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows}
//         </tbody>
//       </table>
//     </div>
//   </div>;
// }

// function User(props) {
//   let {user} = props;
//   return <tr>
//     <td>{user.email}</td>
//   </tr>;
// }