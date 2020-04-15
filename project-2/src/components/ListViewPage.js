import React from 'react';

import App from './App.js'

import TaskList from './TaskList.js';
import AddTask from './AddTask.js';

const ListViewPage = props => {
	return (
		<div className="list-view-page">
    		<h1>List View Page2: Can be shown through tabs</h1>
	        <AddTask onSubmit={this.onAddTask} />
	        <TaskList tasks={this.state.tasks} onUpdateTaskList={this.onUpdateTaskList} />
 		</div>
  )
}

export default ListViewPage;