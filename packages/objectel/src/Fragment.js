import merge from 'callbag-merge';

export default function Fragment({ children }) {
  return event$ => merge(...children.map(element => element(event$)));
};