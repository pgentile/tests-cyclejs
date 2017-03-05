import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver, h1 } from '@cycle/dom';

import { column, row } from './components/foundation';
import Multiplicator from './components/Multiplicator';


function main(sources) {
  const multiplicatorProps$ = xs.of({
    x: 0,
    y: 0,
    min: -200,
    max: 200
  });

  const multiplicator = Multiplicator({ ...sources, props: multiplicatorProps$ });

  const vdom$ = multiplicator.DOM
    .map(multiplicatorVdom => (
      row([
        column([
          h1(['Hello, you !']),
          multiplicatorVdom
        ])
      ])
    ));

  return {
    DOM: vdom$
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);
