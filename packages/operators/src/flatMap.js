import { compose } from 'ramda';
import map from 'callbag-map';
import flatten from 'callbag-flatten';

export default transformer => compose(flatten, map(transformer));