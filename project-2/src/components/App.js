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

            <div class="form-group">
              <label for="orderBy">Sort By:</label>
              <select id="orderBy" name="orderBy">
                <option value="">Select Sorting Value</option>
                <option value="name">Name (A to Z)</option>
                <option value="price">Price (Low to High)</option>
              </select>
            </div>

            <TaskList tasks={this.state.tasks} onUpdateTaskList={this.onUpdateTaskList} />
          </div>
        ));
      case 'addTaskPage':
        return (this.wrapPage(
          <div>
            <h1>Add Task Form</h1>
            <AddTask onSubmit={this.onAddTask} />
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