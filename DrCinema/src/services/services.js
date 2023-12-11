import { getToken } from './apiService';

export const token = getToken();

export const removeSubstrings = (inputString, substringsToRemove) => {
    const escapedSubstrings = substringsToRemove.map(substring => substring.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
    const regex = new RegExp(escapedSubstrings, 'g');
    return inputString.replace(regex, '');
};
