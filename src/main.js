import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver, h1, div } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

import { row, column } from './components/foundation';
import Multiplicator from './components/Multiplicator';


function main(sources) {
  const multiplicatorProps$ = xs.of({
    x: 0,
    y: 0,
    min: -200,
    max: 200,
  });

  const multiplicator = Multiplicator({ ...sources, props: multiplicatorProps$ });

  const vdom$ = multiplicator.DOM.map(multiplicatorVdom => (
    div([
      row(column(h1('Hello, you !'))),
      row(column(multiplicatorVdom)),
    ])
  ));

  return {
    DOM: vdom$
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
};

run(main, drivers);
