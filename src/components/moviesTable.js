import React, {Component} from "react";
import Like from "./common/like";

class MoviesTable extends Component {

    /**
     * In this method will have the logic for determinate the sort order.
     * @param path
     *  Column heder, ex: title, genre, rate.
     */
    raiseSort = path => {
        const sortColumn= {...this.props.sortColumn};
        if(sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc': 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    };

    render() {
        const {movies, onDelete, onLike} = this.props;

        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" onClick={()=> this.raiseSort('title')}>Title</th>
                    <th scope="col" onClick={()=> this.raiseSort('genre.name')}>Genre</th>
                    <th scope="col" onClick={()=> this.raiseSort('numberInStock')}>Stock</th>
                    <th scope="col" onClick={()=> this.raiseSort('dailyRentalRate')}>Rate</th>
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
                                <td>
                                    <Like
                                        liked={m.liked}
                                        onClick={() => onLike(m)}
                                    />
                                </td>
                                <td>
                                    <button
                                        className='btn btn-outline-danger'
                                        onClick={() => onDelete(m)}>Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }
}

export default MoviesTable;
