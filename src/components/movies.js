import React from "react";
import {getMovies} from '../services/fakeMovieService'
import {getGenres} from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import ListGroup from "./common/listGroup";

class Movies extends React.Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
    };

    componentDidMount() {
        const genres = getGenres();
        const movies = getMovies();
        this.setState({...this.state, movies, genres});
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = movie => {
        const movies = [ ...this.state.movies ];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({movies})
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        console.log(genre);
    };

    render() {
        // return this.state.movies.length && 'There are not movies';
        const {length: count} = this.state.movies;
        const {currentPage, pageSize, movies: allMovies, genres} = this.state;
        const movies = paginate(allMovies, currentPage, pageSize);

        if (!count) return <p>There are not movies in the stock</p>;
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup genres={genres} itemsSelected={this.handleGenreSelect}/>
                </div>
                <div className="col">
                    <p>There are {count} movies in the stock.</p>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            movies.map(m => {
                                return (
                                    <tr key={m._id}>
                                        <td>{m.title}</td>
                                        <td>{m.genre.name}</td>
                                        <td>{m.numberInStock}</td>
                                        <td>{m.dailyRentalRate}</td>
                                        <td><Like liked={m.liked} onClick={() => {this.handleLike(m)}}/></td>
                                        <td>
                                            <button className='btn btn-outline-danger' onClick={()=> this.handleDelete(m)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                    <Pagination itemsCount={count} currentPage={currentPage} pageSize={pageSize} onPageChange={this.handlePageChange}/>
                </div>
            </div>
        );
    }
}

export default Movies;
