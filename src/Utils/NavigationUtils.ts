

export const delayedRedirect = (callback: () => void, time: number) => {
  return setTimeout(callback, time);
};

export const DELAYED_REDIRECT_COMMON_TIME=3500;