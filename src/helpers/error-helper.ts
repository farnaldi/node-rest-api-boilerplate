// eslint-disable-next-line no-unused-vars
import { ErrorDetail } from '../types/error-types';

const parseError = (field: string, message: string): ErrorDetail => {
    const toBeRemoved = `"${field}" `;
    const messageParsed = message.replace(toBeRemoved, '');
    return { field, message: messageParsed };
};

export default parseError;
