import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import {getGenres} from "../services/fakeGenreService";
import {getMovie, saveMovie} from "../services/fakeMovieService";

class MovieForm extends Form {
    state = {
       data: {
           title: "",
           genreId: "",
           numberInStock: "",
           dailyRentalRate: ""
       },
        genres: [],
       errors: {},
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in stock."),
        dailyRentalRate: Joi.string().required().min(0).max(100).label("Daily Rental Rate"),
    };

    componentDidMount() {
        // Firt we get genres and then update the state.
        const genres = getGenres();
        this.setState({genres});

        // Next would read id parameter in the route.
        const movieId = this.props.match.params.id;
        if(movieId === 'new') return;

        // If id is not new. Get the movie by id.
        const movie = getMovie(movieId);
        // If is not exit tha movie redirect to not found page.
        if (!movie) return this.props.history.replace('/not-found');

        this.setState({data: this.mapToViewModel(movie)})
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit = () => {
        console.log("Submitted");
        saveMovie(this.state.data);
        this.props.history.push('/movies');
    };


    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }

}
export default MovieForm;

/*
* genreId -> En el state tenemos un genreId el cual es el id del genre al q pertenece el movie
* genres: [] -> Initialize this array on componentDidMount
* */
