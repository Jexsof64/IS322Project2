import React from 'react';
import axios from 'axios';

import PageTabs from './PageTabs';
import GridViewPage from './GridViewPage.js';
import ListViewPage from './ListViewPage.js';
import AddTaskPage from './AddTaskPage.js';
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
          <GridViewPage />
        ));
      case 'listViewPage':
        return (this.wrapPage(
          <ListViewPage />
        ));
      case 'addTaskPage':
        return (this.wrapPage(
          <AddTaskPage />
        ));
      default:
        return (this.wrapPage(
          <h2>Invalid Tab, choose another</h2>
        ));
    }
  }
}

export default App;