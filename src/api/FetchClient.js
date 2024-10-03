class FetchClient {
    constructor() {
      this.baseURL = 'https://api.github.com/';
      this.defaultHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    }
  
    setGlobalHeaders(headers) {
      this.defaultHeaders = { ...this.defaultHeaders, ...headers };
    }
  

    async request(endpoint, options = {}) {
      const headers = { ...this.defaultHeaders, ...options.headers };
      const config = {
        ...options,
        headers,
      };
  
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`, config);
        let logger= await response.json()
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return logger;
      } catch (error) {
        console.error('Fetch error: ', error);
        throw error;
      }
    }
  }
  
  const fetchClient = new FetchClient();
  export default fetchClient;
  