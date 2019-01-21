import { createEventBus } from '@objectel/objectel';
import merge from 'callbag-merge';

export default function toEcoshpere(component) {
  return props => outsideInput$ => {
    const { Emit$, Listen$ } = createEventBus();
    const input$ = merge(outsideInput$, Listen$);

    Emit$(component(props)(input$));
    return Listen$;
  };
}