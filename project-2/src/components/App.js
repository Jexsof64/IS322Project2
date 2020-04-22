import React from 'react';
import axios from 'axios';

import PageTabs from './PageTabs';
import TaskList from './TaskList.js';
import AddTask from './AddTask.js';

class App extends React.Component {
  state = {
    tasks: [],
    errorMessage: '',
    view: 'page1' // Testing for invalid pages, change to 'gridViewPage' later

  }

  componentDidMount() {
    this.getData();
  }

  getData() 
  {
    axios.get('http://my-json-server.typicode.com/bnissen24/project2DB/posts')
      .then(response => {
        this.setState({ tasks: response.data });
      }).catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  onAddTask = (taskName) => {
    let tasks = this.state.tasks;
    tasks.push({
      title: taskName,
      id: this.state.tasks.length + 1,
      type: 'task',
      column: 'todo'
    });

    this.setState({ tasks });
  }

  onUpdateTaskList = (newTaskList) => {
    this.setState({ tasks: newTaskList });
  }
  
  onViewChange(view) {
    this.setState({ view });
  }

  wrapPage(jsx) {
    const { view } = this.state;
    return (
      <div className="container">
        <PageTabs currentView={view}
                  onViewChange={this.onViewChange.bind(this)}/>
        {jsx}
      </div>
    );
  }

  render() 
  {
    const { view } = this.state;

    switch (view) {
      case 'gridViewPage':
        return (this.wrapPage(
          <div>
            <h1>Grid View</h1>
          </div>
        ));
      case 'listViewPage':
        return (this.wrapPage(
          <div>

            <h1>List View</h1>

            <aside class="filter-bar">
              <div class="form-group">
                <label for="orderBy">Sort:</label>
                <select id="orderBy" name="orderBy">
                  <option value="">Select Sorting Value</option>
                  <option value="name">Task Name (A to Z)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="status">Status:</label>
                <select id="status" name="status">
                  <option value="">Select Status</option>
                  <option value="todo">To-Do</option>
                  <option value="inProgress">In-Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div class="form-group">
                <label for="type">Type:</label>
                <select id="type" name="type">
                  <option value="">Select Type</option>
                  <option value="feature">Feature</option>
                  <option value="task">Task</option>
                  <option value="bug">Bug</option>
                </select>
              </div>
            </aside>

            <TaskList tasks={this.state.tasks} onUpdateTaskList={this.onUpdateTaskList} />
          </div>
        ));
      case 'addTaskPage':
        return (this.wrapPage(
          <div>
            <h1>Add Task Form</h1>
            <AddTask onSubmit={this.onAddTask} />

            <div class="form-group">
              <label for="addType">Type:</label>
              <select id="addType" name="addType">
                <option value="">Select Type</option>
                <option value="feature">Feature</option>
                <option value="task">Task</option>
                <option value="bug">Bug</option>
              </select>
            </div>

     
          </div>
        ));
      default:
        return (this.wrapPage(
          <div>
            <h2>Invalid Tab, choose another</h2>
          </div>
        ));
    }
  }
}

export default App;