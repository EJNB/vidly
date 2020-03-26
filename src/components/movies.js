import React from "react";
import {getMovies} from '../services/fakeMovieService'
import Like from "./common/like";

class Movies extends React.Component {
    state = {
        movies: getMovies()
    };

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

    render() {
        // return this.state.movies.length && 'There are not movies';
        const {length: count} = this.state.movies;
        if (!count) return <p>There are not movies in the stock</p>;
        return (
            <React.Fragment>
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
                        this.state.movies.map(m => {
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
            </React.Fragment>
        );
    }
}

export default Movies;
