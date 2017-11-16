const API_URL = '/api/';

const checkOk = response => {

    if (response.status === 200) {
        return response.json();
    }

    if (response.status === 400) {
        return response.json().then(err => {
            throw new Error(err.message)
        })
    }

    if (response.status === 404) {
        throw new Error(response.status);
    }

    throw new Error('Something go wrong');
};

const makeRequestWithBody = (url, method, bodyObject) => {
    const body = JSON.stringify(bodyObject);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(url, {method, body, headers}).then(checkOk)
};

class APIService {
    constructor(entityType) {
        this.url = `${API_URL}${entityType}`;
    }

    getAll = () => fetch(this.url).then(checkOk);

    getById = (id) => fetch(`${this.url}/${id}`).then(checkOk);

    remove = (id) => fetch(`${this.url}/${id}`, {method: 'DELETE'}).then(checkOk);

    update = (id, object) => makeRequestWithBody(`${this.url}/${id}`, 'PUT', object);

    add = object => makeRequestWithBody(this.url, 'POST', object)
}

export default APIService;
