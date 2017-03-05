import xs from 'xstream';
import { div, p, label } from '@cycle/dom';

import Slider from './Slider';


function model(props$, newValue$) {
  const initialValue$ = props$.map(props => props.value).take(1);
  return xs.merge(initialValue$, newValue$)
    .map(newValue => ({
      value: newValue
    }))
    .remember();
}

function view(props$, state$, sliderVdom$) {
  return xs.combine(props$, state$, sliderVdom$)
    .map(([props, state, sliderVdom]) => {
      return div([
        label([
          props.name,
          ' ',
          sliderVdom
        ]),
        p('.help-text', `Value is ${state.value}`)
      ]);
    });
}

export default function SliderWithValue(sources) {
  const slider = Slider(sources);

  const state$ = model(sources.props, slider.value);
  const vdom$ = view(sources.props, state$, slider.DOM);
  const value$ = state$.map(state => state.value);

  return {
    DOM: vdom$,
    value: value$
  };
}
