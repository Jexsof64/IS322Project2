import React from 'react';

import './PageTabs.css';

class PageTabs extends React.Component 
{

  isActiveTab(tabName) 
  {
    return (tabName === this.props.currentView) ? 'nav-link active' : 'nav-link';
  }

  onTabClick(event, tabName) 
  {
    event.preventDefault();
    this.props.onViewChange(tabName);
  }

  render () 
  {
    return (
      <ul className="topnav">
        <li>
          <a className={this.isActiveTab('gridViewPage')}
             onClick={(e) => this.onTabClick(e, 'gridViewPage')}>
            Grid View
          </a>
        </li>
        <li>
          <a className={this.isActiveTab('listViewPage')}
             onClick={(e) => this.onTabClick(e, 'listViewPage')}>
            List View
          </a>
        </li>
        <li>
          <a className={this.isActiveTab('addTaskPage')}
             onClick={(e) => this.onTabClick(e, 'addTaskPage')}>
            Add Task
          </a>
        </li>
      </ul>
    )
  }
};

export default PageTabs;