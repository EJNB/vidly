import React from "react";
import {getMovies} from '../services/fakeMovieService'
import {getGenres} from "../services/fakeGenreService";
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import {Link} from "react-router-dom";
import _ from 'lodash';
import SearchBox from './common/searchBox';

class Movies extends React.Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc' }
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

    handleSort = sortColumn => {
        this.setState({sortColumn});
    };

    handleSearch = query => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    };

    getPageData= () => {
        const {
            currentPage,
            pageSize,
            movies: allMovies,
            selectedGenre,
            searchQuery,
            sortColumn
        } = this.state;

        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m=> m.title.toLowerCase().startsWith(searchQuery.toLowerCase()) );
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m=> m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies};
    };

    render() {
        const {length: count} = this.state.movies;
        const {
            currentPage,
            pageSize,
            genres,
            selectedGenre,
            sortColumn,
            searchQuery
        } = this.state;

        if (!count) return <p>There are not movies in the stock</p>;

        const {totalCount, data: movies} = this.getPageData();

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
                    <Link
                        to="/movies/new"
                        className="btn btn-outline-primary"
                        style={{marginBottom: 20}}
                    >
                        New Movie
                    </Link>
                    <p>There are {totalCount} movies in the stock.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                    <MoviesTable
                        movies={movies}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        sortColumn={sortColumn}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
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
