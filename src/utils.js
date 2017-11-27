export function match(x) {
  return {
    on: (pred, fn) => {
      const matchSuccess = typeof pred === 'function' ? pred(x) : pred === x;
      return matchSuccess ? matched(fn(x)) : match(x);
    },
    otherwise: fn => fn(x)
  };
}

function matched(x){
  return {
    on: () => matched(x),
    otherwise: () => x
  };
}

export function assignToNew(src, assignment) {
  return Object.assign({}, src, assignment);
}
