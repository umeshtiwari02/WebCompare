const API_CONFIG = {
    baseUrl: import.meta.env.VITE_API_BASE_UR,
    endpoints: {
        compare: '/api/compare',
        getUrlsTexts: '/api/get-urls-texts',
        getContent: '/api/analyze'
    }
};

export default API_CONFIG;