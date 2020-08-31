const debounceProcess = (funcCallback, ms = 0) => {
    let timeoutId;
    const fungsiTimeout = (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            funcCallback.apply(this, args);
        }, ms);
    };

    return fungsiTimeout;
};

export default debounceProcess;
