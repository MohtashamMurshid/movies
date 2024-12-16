export const topRatedMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjY3YWQ2ODA3YzQ2YmQ1MDVmNGQyZTZhMWMwYjUxOSIsIm5iZiI6MTczNDM2ODIyNy4xNDEsInN1YiI6IjY3NjA1YmUzNjczZmZlYTBmMjdkZThjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5KH1uJhPcPlwDIU92FsMHRz0do1tfkUt0nw4KGUy6A",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    // Return only the 'results' array
    return data.results;
  } catch (error) {
    // Log and rethrow the error for the calling function to handle
    console.error("Error fetching top-rated movies:", error);
    throw error;
  }
};
