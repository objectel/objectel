import merge from 'callbag-merge';

export default function toOutputOperator(component) {
  return props => childrenInput$ => {
    const children = Array.isArray(props.children) ? props.children : [];
    const input$ = merge(...children.map(element => element(childrenInput$)));

    return component(props)(input$);
  };
};