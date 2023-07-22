

export const delayedRedirect = (callback: () => void, time: number) => {
  return setTimeout(callback, time);
};

