import * as Ol from 'objectel';
import pipe from 'callbag-pipe';
import map from 'callbag-map';
import id from '@packages/id';

export default function createEventHandler(type, handler = id) {
  return event$ => pipe(
    event$,
    Ol.operators.ofType(type),
    map(({ payload }) => handler(payload)),
  );
};