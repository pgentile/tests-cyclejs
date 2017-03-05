import xs from 'xstream';
import { hr, p } from '@cycle/dom';
import isolate from '@cycle/isolate';

import { column, row } from './foundation';
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
      row([
        column([
          sliderX,
          sliderY,
          hr(),
          p(`Value multiplicated: ${state.value}`)
        ])
      ])
    ));
}

function IsolatedSliderWithValue(sources) {
  return isolate(SliderWithValue)(sources);
}

export default function Multiplicator(sources) {
  const createCommonProps = props => ({
    min: props.min,
    max: props.max
  });

  const props$ = sources.props;

  const sliderXProps$ = props$.map(props => ({ ...createCommonProps(props), value: props.x, name: 'X' }));
  const sliderYProps$ = props$.map(props => ({ ...createCommonProps(props), value: props.y, name: 'Y' }));

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
