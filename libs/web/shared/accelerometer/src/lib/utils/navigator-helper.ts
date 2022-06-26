export const SHORT_VIBRATION = 100;
export const LONG_VIBRATION = 300;

export const needToInverseAxes = () => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.match('/Safari/') && userAgent.match(/Macintosh|iPhone|iPad|iPod|webOs/)) {
        return true;
    }

    return false;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const getVibration = (vibrate: VibratePattern) => {
    if (!window.navigator.vibrate) {
        return noop;
    }

    return () => window.navigator.vibrate(vibrate);
}
