import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver, h1, div } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

import { rowAndColumn } from './components/foundation';
import Multiplicator from './components/Multiplicator';
import TodoList from './components/TodoList';


function main(sources) {
  const multiplicatorProps$ = xs.of({
    x: 0,
    y: 0,
    min: -200,
    max: 200
  });

  const multiplicator = Multiplicator({ ...sources, props: multiplicatorProps$ });

  const todoList = TodoList(sources);

  const vdom$ = xs
    .combine(multiplicator.DOM, todoList.DOM)
    .map(([multiplicatorVdom, todoListVdom]) => (
      div([
        rowAndColumn([
          h1(['Hello, you !']),
        ]),
        rowAndColumn([
          multiplicatorVdom
        ]),
        rowAndColumn([
          todoListVdom
        ])
      ])

    ));

  const request$ = todoList.HTTP;

  return {
    DOM: vdom$,
    HTTP: request$
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
};

run(main, drivers);
