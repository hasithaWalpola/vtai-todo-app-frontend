/* eslint-disable @typescript-eslint/no-var-requires */
const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    // Configure Angular `environment.ts` file path
    const targetPath = './src/environments/environment.ts';
    const appVersion = require('../../package.json').version;
    require('dotenv').config({
        path: '.env'
    });
    // `environment.ts` file structure
    const envConfigFile = `export const environment = {
    api_base_url: 'https://vtai-backend-dot-todo-backend-376718.uc.r.appspot.com/api/v1/',
    api_key: '${process.env['API_KEY']}',
    production: true,
    appVersion: '${appVersion}',
  };
  `;
    //console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
    writeFile(targetPath, envConfigFile, (err: any) => {
        if (err) {
            console.error(err);
            throw err;
        } else {
            //console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
        }
    });
};

setEnv();
