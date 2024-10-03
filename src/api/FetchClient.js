/**
 * React Native Fetch Client 
 * An API client that handles custom header injection and supports various HTTP methods.
 */
class FetchClient {
  constructor() {
    this.baseURL = 'https://api.github.com/';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  /**
   * Any custom headers can be injected here
   * @param {*} headers 
   */
  setGlobalHeaders(headers) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * 
   * @param {*} endpoint - API endpoint
   * @param {*} method - HTTP method (GET, POST, etc.)
   * @param {*} options - Additional options for the fetch request
   * @returns - Client response as a promise / API error
   */
  async request(endpoint, method = 'GET', options = {}) {
    const headers = { ...this.defaultHeaders, ...options.headers };
    const config = {
      method, // Specify the HTTP method
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  }
}

const fetchClient = new FetchClient();
export default fetchClient;
