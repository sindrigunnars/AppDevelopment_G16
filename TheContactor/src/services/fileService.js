import * as FileSystem from 'expo-file-system';
const contactDirectory = `${FileSystem.documentDirectory}contacts`;

const data = [
    {
        name: 'Sindri Snær Gunnarsson',
        phoneNumber: 6622107
    },
    {
        name: 'Elisa Guðnadóttir',
        phoneNumber: 6997059
    },
    {
        name: 'Arnar Smári Brynjarsson',
        phoneNumber: 6997052
    }
];

export const cleanDirectory = async () => {
    await FileSystem.deleteAsync(contactDirectory);
};

export const addContact = () => {
    return data.map((item) => {
        const fileName = item.phoneNumber.toString();
        onException(() => FileSystem.writeAsStringAsync(
            `${contactDirectory}/${fileName}`,
            JSON.stringify(item),
            { encoding: FileSystem.EncodingType.UTF8 }));
        return item;
    });
};

export const readContact = async () => {
    const fileName = data[0].phoneNumber.toString();
    const result = onException(() => FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`));
    return result;
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
            data: JSON.parse(await FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`))
        };
    }));
};
