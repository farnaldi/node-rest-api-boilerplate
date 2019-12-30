import * as bcrypt from 'bcrypt';
import { PWD_SALT_ROUNDS } from '../config/env';

export const hash = async (word: string): Promise<string> => {
    return bcrypt.hash(word, PWD_SALT_ROUNDS);
};

export const compare = async (word: string, wordHashed: string): Promise<boolean> => {
    return bcrypt.compare(word, wordHashed);
};
