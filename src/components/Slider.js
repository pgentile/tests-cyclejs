import xs from 'xstream';
import { input } from '@cycle/dom';


function intent(domSource) {
  return domSource.select('.slider').events('change').map(event => Number(event.target.value));
}

function model(props$, newValue$) {
  const initialValue$ = props$.map(props => props.value).take(1);
  return xs.merge(initialValue$, newValue$)
    .map(newValue => ({
      value: newValue
    }))
    .remember();
}

function view(props$, state$) {
  return xs.combine(props$, state$).map(([props, state]) => {
    return input('.slider', { attrs: { type: 'range', min: props.min, max: props.max, value: state.value } });
  })
}

export default function Slider(sources) {
  const newValue$ = intent(sources.DOM);
  const state$ = model(sources.props, newValue$);
  const vdom$ = view(sources.props, state$);
  const value$ = state$.map(state => state.value);

  return {
    DOM: vdom$,
    value: value$
  };
}
