import xs from 'xstream';
import { div, h1 } from '@cycle/dom';
import isolate from '@cycle/isolate';


import { row, column } from './foundation';
import Todo from './Todo';


export default function TodoList(sources) {
  const todo$ = sources.todo$;

  const proxyDelete$ = xs.create();

  const realTodos$ = todo$
    /*
    .compose(toList)
    .map(todoList => xs.from(todoList))
    .debug('Got todo list')
    .map(todoList$ => {
      return xs.combine(todoList$, proxyDelete$)
        .debug('Combined')
        .map(([todoList, deleteAction]) => {
          console.debug('deleteAction =', deleteAction);
          return todoList;
        });
    })
    .flatten()
    */
    ;

  const todoComponent$ = realTodos$
    .map(todo => {
      return isolate(Todo)({ ...sources, todo$: xs.of(todo) });
    })
    .debug('TODO');

  const todoComponentVdom$ = todoComponent$
    .map(todoComponent => todoComponent.DOM)
    .flatten();

  const vdom$ = todoComponentVdom$
    .compose(toList)
    .debug('VDOM')
    .map(todoComponentVdom => {

      return div('.todos', [
        row(column(h1('Todo list'))),
        row(column(todoComponentVdom))
      ]);

    });

  const deleteTodoArray = todoComponent$.map(component => component.delete$);

  const deleteTodo$ = xs.merge(...deleteTodoArray);

  proxyDelete$.imitate(deleteTodo$);

  return {
    DOM: vdom$,
  };
}


function toList(stream$) {
  return stream$.fold((items, item) => [...items, item], []);
}
