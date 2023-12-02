import * as FileSystem from 'expo-file-system';
const contactDirectory = `${FileSystem.documentDirectory}contacts`;

export const getDir = () => {
    return contactDirectory;
};
