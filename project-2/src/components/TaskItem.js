import React from 'react';

import PageTabs from './PageTabs';

const TaskItem = props => {
  return (
    <li className="list-group-item">
      { props.task.title }
      { props.task.column }
      { props.task.type }
    </li>
  )
};

export default TaskItem;