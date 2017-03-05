import xs from 'xstream';
import { div, h1 } from '@cycle/dom';

import { rowAndColumn } from './foundation';
import Todo from './Todo';


export default function TodoList(sources) {
  const request$ = xs.of({
    url: 'https://jsonplaceholder.typicode.com/todos',
    category: 'TodoList'
  });

  const response$ = sources.HTTP
    .select('TodoList')
    .flatten();

  const todoList$ = response$
    .map(response => response.body)
    .startWith([])
    .debug('Got todo list');

  const todoComponentList$ = todoList$
    .map(todoList => {
      return todoList.map(todo => Todo({ ...sources, props: xs.of({ todo: todo }) }));
    });

  const vdom$ = todoComponentList$
    .map(todoComponentList => {
      const todoListVdom$ = xs.fromArray(todoComponentList)
        .map(component => component.DOM)
        .flatten()
        .compose(toList);

      return todoListVdom$;
    })
    .flatten()
    .map(todoListVdom => {
      return div('.todos', [
        rowAndColumn([
          h1('Todo list')
        ]),
        rowAndColumn(todoListVdom)
      ]);
    });

  return {
    DOM: vdom$,
    HTTP: request$
  };
}


function toList(stream) {
  return stream.fold((list, item) => [...list, item], []);
}
