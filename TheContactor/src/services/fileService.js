import * as FileSystem from 'expo-file-system';
const contactDirectory = `${FileSystem.documentDirectory}contacts`;

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

export const cleanDirectory = async () => {
    await FileSystem.deleteAsync(contactDirectory);
};

const setupDirectory = async () => {
    const dir = await FileSystem.getInfoAsync(contactDirectory);
    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(contactDirectory);
    }
};

export const removeContact = async (contact) => { // Takes in a contact in the format that getAll supplies
    const fileName = contact.phoneNumber.toString();
    return await onException(() => FileSystem.deleteAsync(`${contactDirectory}/${fileName}`));
};

export const editContact = async (contact) => { // Takes in a JSON
    const fileName = contact.phoneNumber.toString();
    const filePath = `${contactDirectory}/${fileName}`;
    const file = await FileSystem.getInfoAsync(filePath);
    if (file.exists && !file.isDirectory) {
        await onException(() => FileSystem.writeAsStringAsync(
            filePath,
            JSON.stringify(contact),
            { encoding: FileSystem.EncodingType.UTF8 }
        ));
    }
};

export const addContact = async (contact) => {
    const fileName = contact.phoneNumber.toString();
    const filePath = `${contactDirectory}/${fileName}`;
    const file = await FileSystem.getInfoAsync(filePath);
    if (!file.exists && !file.isDirectory) {
        await onException(() => FileSystem.writeAsStringAsync(
            `${contactDirectory}/${fileName}`,
            JSON.stringify(contact),
            { encoding: FileSystem.EncodingType.UTF8 }));
        return contact;
    }
};

const readContact = async (fileName) => {
    return onException(() => FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`));
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
