import createEventCreator from './createEventCreator';

export default function createEventCreators(eventCreatorStructureMap) {
  const types = Object.keys(eventCreatorStructureMap);

  return types.reduce(
    (eventCreatorMap, type) => {
      const { payload: payloadCreator, meta: metaCreator } = eventCreatorStructureMap[type] || {};
      eventCreatorMap[type] = createEventCreator(type, payloadCreator, metaCreator);

      return eventCreatorMap
    }
    , {});
};