import * as FileSystem from 'expo-file-system';
import * as Contacts from 'expo-contacts';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
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

const importContactsFromSystem = async () => {
    const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name, Contacts.Fields.RawImage]
    });

    return Promise.all(data.map((item) => {
        return {
            name: 'fileName',
            type: 'json',
            data: {
                name: item.name,
                phoneNumber: item.phoneNumbers === undefined ? undefined : item.phoneNumbers[0].number,
                uri: item.rawImage === undefined ? undefined : item.rawImage.uri
            }
        };
    }));
};

export const importContacts = async () => {
    const contacts = await importContactsFromSystem();
    contacts.map((contact) => {
        if (contact.data.phoneNumber !== undefined) {
            const newContact = {
                name: contact.data.name,
                phoneNumber: parseInt(contact.data.phoneNumber.replace(/\D/g, '', '')),
                uri: contact.data.uri === undefined ? '' : contact.data.uri
            };
            addContact(newContact);
            return newContact;
        }
        return null;
    });
};

export const cleanDirectory = async () => { // delete all function
    await FileSystem.deleteAsync(contactDirectory);
};

const setupDirectory = async () => {
    const dir = await FileSystem.getInfoAsync(contactDirectory);
    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(contactDirectory);
    }
};

const removeContact = async (fileName) => { // Takes in a contact in the format that getAll supplies
    return await onException(() => FileSystem.deleteAsync(`${contactDirectory}/${fileName}`));
};

export const editContact = async (fileName, contact) => { // Takes in a JSON and fileName, deletes the file and creates new contact
    const filePath = `${contactDirectory}/${fileName}`;
    const file = await FileSystem.getInfoAsync(filePath);
    if (file.exists && !file.isDirectory) {
        await removeContact(fileName);
        await addContact(contact);
    }
};

export const addContact = async (contact) => {
    const fileName = `${contact.name.replace(/[^a-zA-Z0-9]/g, '')}-${uuidv4()}`;
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

export const getAllContacts = async () => { // Gets all existing contacts in file system
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
