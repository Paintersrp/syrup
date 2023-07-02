/**
 * @description
 * Returns the template for generating an Axios instance file in the library.
 *
 * @returns {string} - The Axios instance template.
 */
export const LibraryAxiosTemplate = () =>
  `
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import cookie from 'js-cookie';

export const axios: AxiosInstance = Axios.create({
baseURL: 'http://localhost:8000/api/',
});

axios.interceptors.request.use(
(config: any) => {
    const token = cookie.get('jwt');
    if (token) {
    config.headers = {
        ...config.headers,
        Authorization: \`Bearer \${token}\`,
    };
    }
    return config;
},
(error) => Promise.reject(error)
);

axios.interceptors.response.use(
(response: AxiosResponse) => response,
(error) => {
    if (error.response && error.response.status === 404) {
    return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
}
);
`;
