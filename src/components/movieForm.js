import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import {getGenres} from "../services/genreService";
import {getMovie, saveMovie} from "../services/movieService";

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
        dailyRentalRate: Joi.number().required().min(0).max(100).label("Daily Rental Rate"),
    };

    async populateGenres() {
        // Firt we get genres and then update the state.
        const {data: genres} = await getGenres();
        this.setState({genres});
    }

    async populateMovie() {
        try {
            // Next would read id parameter in the route.
            const movieId = this.props.match.params.id;
            if (movieId === 'new') return;

            // If id is not new. Get the movie by id.
            const {data: movie} = await getMovie(movieId);
            this.setState({data: this.mapToViewModel(movie)});
        } catch (ex) {
            // If is not exit tha movie redirect to not found page.
            if (ex.response && ex.response.status === 404)
                return this.props.history.replace('/not-found');
        }

    }
    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
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

    doSubmit = async () => {
        console.log("Submitted");
        await saveMovie(this.state.data);
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
