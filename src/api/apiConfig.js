const API_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

/**
 * Gets the base URL based on the current environment.
 * @returns {string} The base URL for the API.
 */
const getBaseUrl = () => {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/v1/';
};

export { getBaseUrl, API_METHODS };
