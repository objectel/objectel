import { once, noop } from './utils';
import merge from 'callbag-merge';
import pipe from 'callbag-pipe';
import map from 'callbag-map'

export default function component(propsToModel = noop, modelToResult, eventMap = {}) {
  return props => event$ => {
    const eventHandler = event$ => (start, sink) => {
      if (start !== 0) return;

      event$(0, (t, d) => {
        if (t === 1) {
          const handler = eventMap[d.type];

          if (typeof handler === 'function') {
            prevModel = handler(d.payload, props, prevModel);
            sink(1, prevModel);
          }
        } else sink(t, d);
      });
    };
    const initModel = propsToModel(props);
    let prevModel = initModel;

    if (prevModel === undefined) {
      return pipe(
        event$,
        eventHandler,
        map(model => modelToResult(model, props)),
      );
    } else {
      return pipe(
        merge(eventHandler(event$), once(initModel)),
        map(model => modelToResult(model, props)),
      );
    }
  };
};