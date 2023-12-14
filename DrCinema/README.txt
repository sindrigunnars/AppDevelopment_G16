To get in to the app you must create a .env file in the same directory as the README and put your credentials in this format:
API_USER=username
API_PASSWORD=password

If you wrote the wrong login you have to restart the server with the command:
    npm start -- --reset-cache
to reset the cache and update the variables.