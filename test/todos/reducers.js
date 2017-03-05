import expect from 'expect';
import Immutable from 'immutable';

import * as actions from '../../src/todos/actions';
import * as reducers from '../../src/todos/reducers';


describe('Todo reducer', () => {

  describe('state', () => {

    function createTodosWithThreeItems() {
      let state = undefined;

      const items = ['Item A', 'Item B', 'Item C'];

      items.forEach(item => {
        state = reducers.todos(state, actions.addTodo(item));
      });

      return state;
    }

    it('should return the initial state', () => {
      // given

      // when
      const state = reducers.todos(undefined, {});

      // then
      expect(state).toEqual(Immutable.List());
    });

    it('should append new todo items on addTodo action', () => {
      // given
      let state = undefined;

      const items = ['Item A', 'Item B'];
      const newActions = items.map(item => actions.addTodo(item));

      // when
      newActions.forEach(action => {
        state = reducers.todos(state, action);
      });

      // then
      expect(state.size).toEqual(items.length);

      items.forEach((item, index) => {
        expect(state.get(index)).toMatch({
          id: /^[a-z0-9-]+$/,
          content: item,
          done: false,
        });
      });
    });

    it('should mark todo item as done', () => {
      // given
      const initialState = createTodosWithThreeItems();

      // when
      const itemIndex = 1;
      const markDoneAction = actions.markDone(initialState.get(itemIndex).id);
      const newState = reducers.todos(initialState, markDoneAction);

      // then
      expect(newState.length).toEqual(initialState.length);

      newState.forEach((item, index) => {
        expect(item).toMatch({
          done: (index === itemIndex),
        });
      });
    });

    it('should delete todo item', () => {
      // given
      const initialState = createTodosWithThreeItems();

      // when
      const itemIndex = 1;
      const itemToDeleteId = initialState.get(itemIndex).id;
      const deleteTodoAction = actions.deleteTodo(itemToDeleteId);
      const newState = reducers.todos(initialState, deleteTodoAction);

      // then
      expect(newState.size).toEqual(initialState.size - 1);

      newState.forEach((item) => {
        expect(item.id).toNotEqual(itemToDeleteId);
      });
    });

  });
});
