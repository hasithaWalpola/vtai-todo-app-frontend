require('dotenv').config();

export const environment = {

    production: false,
    api_base_url: 'https://vtai-backend-dot-todo-backend-376718.uc.r.appspot.com/api/v1/',
    api_key: process.env['API_KEY']

};
