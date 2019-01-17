import * as Ol from 'objectel';
import id from '@packages/id';

export default function createEventCreator(type, payloadCreator = id, metaCreator = id) {
  const eventCreator = (payloadSource, metaSource) =>
    Ol.createEvent(type, payloadCreator(payloadSource), metaCreator(metaSource));
  eventCreator[Symbol.toPrimitive] = () => type;

  return eventCreator;
}