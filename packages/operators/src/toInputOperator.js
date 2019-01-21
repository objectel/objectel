import merge from 'callbag-merge';

export default function toInputOperator(component) {
  return props => componentInput$ => {
    const input$ = component(props)(componentInput$);
    const children = Array.isArray(props.children) ? props.children : [];

    return merge(...children.map(element => element(input$)));
  };
};