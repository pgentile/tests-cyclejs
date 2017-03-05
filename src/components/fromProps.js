
export default function fromProps(props$, combineFunc) {
  // Operator for compose operation that can merge props and new state
  return function combinePropsAndState(newState$) {
    return props$
      .map(props => {
        // Combine new state with props, returns a new props object and starts with input props
        return newState$
          .map(newState => combineFunc(props, newState))
          .startWith(props);
      })
      .flatten()
      .remember();
  };
}
