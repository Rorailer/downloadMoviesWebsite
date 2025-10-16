export async function featurePage(){
    const response = await fetch('https://yts.mx/api/v2/list_movies.json?sort_by=year&order_by=desc&limit=50');
    const data = await response.json()
    return data.data.movies
}

export async function detailsPage(id){
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    const data = await response.json()
    return data.data.movie;
}

export async function searchMovies(term){
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${term}&limit=50`)
    const data = await response.json();
    if (data.data.movies) {
        return data.data.movies;
    } else {
        return []; // Return an empty array if no movies are found
    }
}