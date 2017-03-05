// import xs from 'xstream';
import { input } from '@cycle/dom';


export default function Slider(sources) {
  const newValue$ = sources.DOM.select('.slider').events('change')
    .map(event => Number(event.target.value));

  const state$ = sources.props
    .map(props => {
      return newValue$
        .map(newValue => ({
          ...props,
          value: newValue,
        }))
        .startWith(props);
    })
    .flatten()
    .remember();

  const vdom$ = state$
    .map(state => (
      input('.slider', { attrs: { type: 'range', min: state.min, max: state.max, value: state.value } })
    ));

  const value$ = state$.map(state => state.value);

  return {
    DOM: vdom$,
    value: value$
  };
}
