const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "f89a6c1f22aca3858a4ae7aef10de967",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
