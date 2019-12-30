/* eslint-disable no-console */

// TO DO
const logError = (error: Error): void => {
    console.error(error.message);
    console.error(error.stack);
};

export default logError;
