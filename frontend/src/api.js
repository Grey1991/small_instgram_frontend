// change this when you integrate with the real API, or when u start using the dev server
const API_URL = 'http://localhost:8080/data'

const getJSON = (path, options) => 
    fetch(path, options)
        .then(res => res.json())
        .catch(err => console.warn(`API_ERROR: ${err.message}`));

/**
 * This is a sample class API which you may base your code on.
 * You don't have to do this as a class.
 */
export default class API {

    /**
     * Defaults to teh API URL
     * @param {string} url 
     */
    constructor(url = API_URL) {
        this.url = url;
    } 

    makeAPIRequest(path) {
        return getJSON(`${this.url}/${path}`);
    }

    /**
     * @returns feed array in json format
     */
    getFeed() {
        return this.makeAPIRequest('feed.json');
    }

    /**
     * @returns auth'd user in json format
     */
    getMe(t) {
        return fetch(`${this.url}/user`,{
                                        headers: {
                                          'content-type': 'application/json',
                                          'Authorization': 'token ' + t
                                        },
                                        method: 'GET'
                                      });
    }

    login(u, p) {
        const data = {'username': u, 'password': p}
        return fetch(`${this.url}/auth/login`,{
                                        body: JSON.stringify(data),
                                        headers: {
                                          'content-type': 'application/json'
                                        },
                                        method: 'POST'
                                      });
    }

    signup(u, p, e, n) {
        const data = {'username': u, 'password': p, 'email':e, 'name': n}
        return fetch(`${this.url}/auth/signup`,{
                                        body: JSON.stringify(data),
                                        headers: {
                                          'content-type': 'application/json'
                                        },
                                        method: 'POST'
                                      });
    }

    post(t, d, s) {
        return fetch(`${this.url}/post`,{
                                body: JSON.stringify({'description_text':d, 'src': s}),
                                headers: {
                                  'content-type': 'application/json',
                                  'Authorization': 'token ' + t
                                },
                                method: 'POST'
                              });
    }

}
