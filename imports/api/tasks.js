import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function publishTasks() {
    return Tasks.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }],
    });
  });
}

export const TASKS_METHODS = {
  INSERT: 'tasks.insert',
  REMOVE: 'tasks.remove',
  SET_CHECKED: 'tasks.setChecked',
  SET_PRIVATE: 'tasks.setPrivate',
};

Meteor.methods({
  [TASKS_METHODS.INSERT](text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  [TASKS_METHODS.REMOVE](taskId) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);

    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  [TASKS_METHODS.SET_CHECKED](taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  [TASKS_METHODS.SET_PRIVATE](taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // Make sure only the owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('non-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});
