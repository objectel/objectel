import * as Ol from 'objectel';
import { createEventCreators, createEventHandlers } from 'objectel-events';
import { init } from 'snabbdom';

const PATCH_VNODE = Symbol('snabbel/patch-vnode');
const VDOM_UPDATED = Symbol('snabbel/vdom-updated');

export const {
  PATCH_VNODE: patchVnode,
  VDOM_UPDATED: vdomUpdated,
} = createEventCreators({ PATCH_VNODE, VDOM_UPDATED });

export const VDOM = ({ modules = [], container = document.createDocumentFragment(), children = [] }) => {
  const { Emit$, Listen$ } = Ol.createEventBus();
  const patch = init(modules);
  let vdom = container;

  children.forEach(element => Emit$(element(Listen$)));

  return event$ => {
    Emit$(event$);

    return createEventHandlers({
      [patchVnode]: vnode => {
        vdom = patch(vdom, vnode);

        return vdomUpdated();
      },
    })(Listen$);
  }
};