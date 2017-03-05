import xs from 'xstream';
import { div, hr, p } from '@cycle/dom';
import isolate from '@cycle/isolate';

import SliderWithValue from './SliderWithValue';


function model(props$, x$, y$) {
  const initialValue$ = props$.map(props => ({ x: props.x, y: props.y }));
  const newValue$ = xs.combine(x$, y$).map(([x, y]) => ({ x, y }));
  return xs
    .merge(initialValue$, newValue$)
    .map(({ x, y }) => ({ value: x * y }))
    .remember();
}

function view(state$, sliderX$, sliderY$) {
  return xs.combine(state$, sliderX$, sliderY$)
    .map(([state, sliderX, sliderY]) => (
      div([
        sliderX,
        sliderY,
        hr(),
        p([
          `Value multiplicated: ${state.value}`
        ])
      ])
    ));
}

function IsolatedSliderWithValue(sources) {
  return isolate(SliderWithValue)(sources);
}

export default function Multiplicator(sources) {
  const sliderXProps$ = xs.of({
    name: 'X',
    value: 50,
    min: 0,
    max: 100
  });

  const sliderYProps$ = xs.of({
    name: 'Y',
    value: 0,
    min: -200,
    max: 200
  });

  const initialProps$ = xs.combine(sliderXProps$, sliderYProps$)
    .map(([sliderXProps, sliderYProps]) => ({ x: sliderXProps.value, y: sliderYProps.value }));

  const sliderX = IsolatedSliderWithValue({ ...sources, props: sliderXProps$ });
  const sliderY = IsolatedSliderWithValue({ ...sources, props: sliderYProps$ });

  const state$ = model(initialProps$, sliderX.value, sliderY.value);
  const vdom$ = view(state$, sliderX.DOM, sliderY.DOM);

  return {
    DOM: vdom$
  };
}
