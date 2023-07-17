export const delayedRedirect = (callback: () => void, time: number) => {
    setTimeout(callback, time);
  };
  