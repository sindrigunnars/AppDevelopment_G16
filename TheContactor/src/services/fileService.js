import * as FileSystem from 'expo-file-system';
const contactDirectory = `${FileSystem.documentDirectory}contacts`;

export const cleanDirectory = async () => {
    await FileSystem.deleteAsync(contactDirectory);
};

export const addContact = (contact) => {
    const fileName = contact.phoneNumber.toString();
    onException(() => FileSystem.writeAsStringAsync(
        `${contactDirectory}/${fileName}`,
        JSON.stringify(contact),
        { encoding: FileSystem.EncodingType.UTF8 }));
    return contact;
};

export const readContact = async (fileName) => {
    return onException(() => FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`));
};

const onException = (cb, errorHandler) => {
    try {
        return cb();
    } catch (err) {
        if (errorHandler) {
            return errorHandler(err);
        }
        console.error(err);
    }
};

const setupDirectory = async () => {
    const dir = await FileSystem.getInfoAsync(contactDirectory);
    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(contactDirectory);
    }
};

export const getAllContacts = async () => {
    // Check if directory exists
    await setupDirectory();

    const result = await onException(() => FileSystem.readDirectoryAsync(contactDirectory));
    return Promise.all(result.map(async fileName => {
        return {
            name: fileName,
            type: 'json',
            data: JSON.parse(await readContact(fileName))
        };
    }));
};
