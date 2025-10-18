export async function featurePage(page = 0){
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?sort_by=year&order_by=desc&limit=50&page=${page}`);
    const data = await response.json()
    return data.data;
}

export async function detailsPage(id){
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    const data = await response.json()
    return data.data;
}

export async function searchMovies(term , page=1){
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${term}&limit=50&page=${page}`)
    const data = await response.json();
    if (data.data.movies) {
        return data.data;
    } else {
        return { movies: [] }; // Return an empty array if no movies are found
    }
}