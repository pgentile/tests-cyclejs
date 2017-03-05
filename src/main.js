import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver, div, h1, hr, p } from '@cycle/dom';
import isolate from '@cycle/isolate';

import SliderWithValue from './components/SliderWithValue';


function main(sources) {
  const slider1Props$ = xs.of({
    name: 'X',
    value: 50,
    min: 0,
    max: 100
  });

  const slider2Props$ = xs.of({
    name: 'Y',
    value: 0,
    min: -200,
    max: 200
  });

  const slider1$ = isolate(SliderWithValue)({ ...sources, props: slider1Props$ });
  const slider2$ = isolate(SliderWithValue)({ ...sources, props: slider2Props$ });

  const state$ = xs
    .combine(slider1$.value, slider2$.value)
    .map(([slider1Value, slider2Value]) => {
      return {
        value: slider1Value * slider2Value
      };
    })
    .remember();

  const vdom$ = xs.combine(slider1$.DOM, slider2$.DOM, state$)
    .map(([slider1, slider2, state]) => (
      div([
        h1(['Hello, you !']),
        hr(),
        slider1,
        slider2,
        hr(),
        p([
          `Value multiplicated: ${state.value}`
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
