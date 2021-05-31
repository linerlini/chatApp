function debounce(fn, delay = 250) {
  let timeId = null;
  return function func(...args) {
    const context = this;
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export default debounce;
