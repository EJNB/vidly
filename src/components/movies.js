import React from "react";
import {getMovies} from '../services/fakeMovieService'
import {getGenres} from "../services/fakeGenreService";
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import ListGroup from "./common/listGroup";
import MovieTable from "./moviesTable";

class Movies extends React.Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
    };

    componentDidMount() {
        const genres = [{name: 'All genres', _id: ''}, ...getGenres()];
        const movies = getMovies();
        this.setState({...this.state, movies, genres});
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({movies})
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1})
    };

    render() {
        const {length: count} = this.state.movies;
        const {currentPage, pageSize, movies: allMovies, genres, selectedGenre} = this.state;

        if (!count) return <p>There are not movies in the stock</p>;

        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;
        const movies = paginate(filtered, currentPage, pageSize);
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        genres={genres}
                        selectedItem={selectedGenre}
                        onItemsSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>There are {filtered.length} movies in the stock.</p>
                    <MovieTable
                        movies={movies}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                    />
                    <Pagination
                        itemsCount={filtered.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
