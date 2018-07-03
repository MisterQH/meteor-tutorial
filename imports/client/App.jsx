import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tasks, TASKS_METHODS } from '../api/tasks';

import AppLayout from './AppLayout';
import Task from './Task';
import AppForm from './AppForm';
import Checkbox from './Checkbox';

import AccountsUIWrapper from './AccountsUIWrapper';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textValue: '',
      hideCompleted: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    Meteor.call(TASKS_METHODS.INSERT, this.state.textValue);
    this.setState({ textValue: '' });
  };

  toggleHideCompleted = () => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  };

  handleChange = event => this.setState({ textValue: event.target.value });

  renderTasks = () => {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId =
        this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  };

  render() {
    const { textValue, hideCompleted } = this.state;
    const { incompleteCount, currentUser } = this.props;

    return (
      <AppLayout>
        <header>
          <h1>Todo list ({incompleteCount})</h1>

          <Checkbox
            label="Hide completed tasks"
            className="hide-completed"
            checked={hideCompleted}
            onClick={this.toggleHideCompleted}
          />

          <AccountsUIWrapper />

          {currentUser && (
            <AppForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              value={textValue}
            />
          )}
        </header>

        <ul>{this.renderTasks()}</ul>
      </AppLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
