const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '2dd52acee8f5a221d93e6e391cd1da5c',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;