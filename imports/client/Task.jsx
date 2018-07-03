import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { TASKS_METHODS } from '../api/tasks.js';
import Checkbox from './Checkbox';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked = () => {
    // Set the checked property to the opposite of its current value
    Meteor.call(
      TASKS_METHODS.SET_CHECKED,
      this.props.task._id,
      !this.props.task.checked,
    );
  };

  deleteThisTask = () => {
    Meteor.call(TASKS_METHODS.REMOVE, this.props.task._id);
  };

  togglePrivate = () =>
    Meteor.call(
      TASKS_METHODS.SET_PRIVATE,
      this.props.task._id,
      !this.props.task.private,
    );

  render() {
    const { checked, text, username, private: isPrivate } = this.props.task;
    // Give tasks a different className when they are checked off
    // so that we can style them nicely in CSS
    const taskClassName = cx({ checked, isPrivate });

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        {this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            {this.props.task.private ? 'Private' : 'Public'}
          </button>
        ) : null}
        <Checkbox checked={!!checked} onClick={this.toggleChecked} />

        <span className="text">
          <strong>{username}</strong>:{text}
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  showPrivateButton: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
