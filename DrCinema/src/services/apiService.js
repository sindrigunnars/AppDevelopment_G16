export const getToken = async () => {
    const response = await fetch('https://api.kvikmyndir.is/authenticate', {
        method: 'POST',
        headers: {
            Authorization: 'Basic c2luZHJpZ3VubmFyczpzaW5kcmkwMA=='
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
};
