/* eslint-env mocha */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'chai';

import { TASKS_METHODS, Tasks } from '../../tasks';

describe('Tasks', () => {
  describe('methods', () => {
    let userId = Random.id();
    let taskId;

    afterEach(() => {
      Tasks.remove({});
      Meteor.users.remove({});
    });

    describe('remove', () => {
      beforeEach(() => {
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
          private: true,
        });
      });

      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers[TASKS_METHODS.REMOVE];

        // Set up a fake method invocation that looks like what the method expects
        const context = { userId };

        // Run the method with 'this' set to fake the invocation
        deleteTask.apply(context, [taskId]);

        // Verify that the method does what we expected
        expect(Tasks.find().count()).to.equal(0);
      });

      it('cannot delete unowned task', () => {
        const deleteTask = Meteor.server.method_handlers[TASKS_METHODS.REMOVE];
        const newUserId = Random.id();
        const context = { userId: newUserId };
        expect(() => deleteTask.apply(context, [taskId])).to.throw('not-authorized');
      });
    });

    describe('insert', () => {
      const insertTask = Meteor.server.method_handlers[TASKS_METHODS.INSERT];
      let text;
      let context;
      const getTaskId = () => insertTask.apply(context, [text]);
      beforeEach(() => {
        userId = Meteor.users.insert({ username: 'test' });
        context = { userId };
        text = 'Clean the dishes';
        taskId = getTaskId();
      });

      it('returns an id', () => {
        expect(typeof taskId).to.equal('string');
        expect(taskId.length).to.be.above(0);
      });

      it('inserts right text', () => {
        const task = Tasks.findOne(taskId);
        expect(task.text).to.equal(text);
      });

      it('disallows to insert a number as text', () => {
        const badTexts = [2, undefined, null, true, {}, []];

        badTexts.forEach((badText) => {
          text = badText;
          expect(() => getTaskId()).to.throw(
            'Match',
            'Match',
            `Failed for: ${JSON.stringify(badText)}`,
          );
        });
      });
    });
  });
});
