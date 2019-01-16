# snabbel

snabbel is library that provides some components and functions to use [snabbdom](https://github.com/snabbdom/snabbdom) in [objectel](https://github.com/ENvironmentSet/objectel) well.

## API

### VDOM({ [modules], [container], [children] })

| Arguments | Description |
|-----------|-------------|
| modules | modules for `snabbdom.init`, check [snabbdom's document](https://github.com/snabbdom/snabbdom#modules-documentation) about this. default value is empty array. |
| container | Root of Virtual dom. default value is DOM Fragment. |
| children | elements which will be applied vdom's event stream. |

* returns an element

Examples

Simple Counter

```jsx harmony
import { VDOM } from 'snabbel';
import * as Ol from 'objectel';

import Counter from './Counter';
import IncreaseButton from './IncreaseButton';

const app = document.getElementById('app');
const globalEventBus = Ol.createEventBus();
const vdom = (
  <VDOM container={app}>
    <Counter />
    <IncreaseButton amount={100} />
  </VDOM>
);

globalEventBus.Emit$(vdom(globalEventBus.Listen$));
```

### patchVnode(vnode)

| Arguments | Description |
|-----------|-------------|
| vnode | virtual node what you'd want to patch to vdom |

* returns `PATCH_VNODE` type event which be accepted by `VDOM` element

```jsx harmony
import { VDOM, patchVnode } from 'snabbel';
import * as Ol from 'objectel';
import h from 'snabbdom/h';

const once = value => (start, sink) => {
  if ( start !== 0) return;

  sink(0, () => {});
  sink(1, value);
  sink(2);
};

const app = document.getElementById('app');
const globalEventBus = Ol.createEventBus();
const vdom = <VDOM container={app} />;

globalEventBus.Emit$(once(patchVnode(h('p', {}, 'text'))));
globalEventBus.Emit$(vdom(globalEventBus.Listen$));
```

## vdomUpdated()

| Arguments | Description |
|-----------|-------------|

* returns `VDOM_UPDATED` type event which means "vdom has been updated'