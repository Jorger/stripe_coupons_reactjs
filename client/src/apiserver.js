import axios from 'axios';

export function apiServer (param, callback) {
    let urlService = `/${param.service}`;
    if(param.method === "get" || param.method === "delete"){
        urlService += `/${param.data}`;
    }
    axios[param.method](urlService, param.data)
    .then(response => callback(null, response))
    .catch(error => callback(error));
};
