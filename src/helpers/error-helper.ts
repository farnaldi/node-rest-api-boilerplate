// eslint-disable-next-line no-unused-vars
import { ErrorDetail } from '../types/error-types';

const parseError = (field: string, message: string): ErrorDetail => {
    return { field, message };
};

export default parseError;
