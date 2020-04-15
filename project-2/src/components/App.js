import React from 'react';

import PageTabs from './PageTabs';
import GridViewPage from './GridViewPage.js';
import ListViewPage from './ListViewPage.js';
import AddTaskPage from './AddTaskPage.js';

class App extends React.Component {
  state = {
    view: 'page1' // Testing for invalid pages, change to 'gridViewPage' later
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