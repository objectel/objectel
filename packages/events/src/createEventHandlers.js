import pipe from 'callbag-pipe';
import map from 'callbag-map';
import filter from 'callbag-filter';
import id from '@packages/id';

export default function createEventHandlers(eventHandlerMap) {
  return event$ => pipe(
    event$,
    filter(({ type }) => type in eventHandlerMap),
    map(({ type, payload }) => (eventHandlerMap[type] || id)(payload)),
  );
};