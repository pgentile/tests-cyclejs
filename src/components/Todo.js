import { div, h4, a, p } from '@cycle/dom';
import xs from 'xstream';


export default function Todo(sources) {
  const todo$ = sources.todo$;

  const deleteClick$ = sources.DOM.select('.delete').events('click').debug('Clicked');

  const delete$ = xs.combine(todo$, deleteClick$)
    .map(([todo]) => todo.id)
    .debug('Delete clicked');

  const vdom$ = todo$
    .map(todo => {
      const completedText = todo.completed ? '\u2714' : '';
      return div([
        h4(`${todo.title} ${completedText}`),
        p(a('.delete', 'Delete todo'))
      ]);
    })

  return {
    DOM: vdom$,
    delete$
  };
}
