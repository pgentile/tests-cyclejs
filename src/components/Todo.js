import { div, h4 } from '@cycle/dom';


export default function Todo(sources) {
  const props$ = sources.props;

  const todo$ = props$.map(props => props.todo);

  const vdom$ = todo$
    .map(todo => {
      const completedText = todo.completed ? '\u2714' : '';
      return div([
        h4(`${todo.title} ${completedText}`),
      ]);
    })

  return {
    DOM: vdom$,
  };
}
