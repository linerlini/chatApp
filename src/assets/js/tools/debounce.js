function debounce(fn, delay = 400) {
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
