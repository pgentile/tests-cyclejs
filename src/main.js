import { run } from '@cycle/run';
import { makeDOMDriver, div, h1, hr } from '@cycle/dom';

import Multiplicator from './components/Multiplicator';


function main(sources) {
  const multiplicator = Multiplicator(sources);

  const vdom$ = multiplicator.DOM
    .map(multiplicatorVdom => (
      div([
        h1(['Hello, you !']),
        hr(),
        multiplicatorVdom
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
