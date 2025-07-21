const API_CONFIG = {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    endpoints: {
        compare: '/api/compare',
        getUrlsTexts: '/get-urls-texts',
        getContent: '/get-content'
    }
};

export default API_CONFIG;