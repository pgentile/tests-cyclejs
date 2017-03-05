import xs from 'xstream';
import { p } from '@cycle/dom';

import Slider from './Slider';


export default function SliderWithValue(sources) {
  const props$ = sources.props;

  const sliderProps$ = props$
    .map(props => ({
      value: props.value,
      min: props.min,
      max: props.max
    }));

  const slider = Slider({
    ...sources,
    props: sliderProps$
  });

  const sliderVdom$ = slider.DOM;
  const sliderValue$ = slider.value;

  const state$ = xs
    .combine(props$, sliderValue$)
    .map(([props, sliderValue]) => ({
      name: props.name,
      value: sliderValue,
    }))
    .remember();

  const vdom$ = xs
    .combine(state$, sliderVdom$)
    .map(([state, sliderVdom]) => {
      return p([
        sliderVdom,
        ` Name is ${state.name}, value is ${state.value}`
      ]);
    });

  return {
    DOM: vdom$,
    value: sliderValue$
  };
}
