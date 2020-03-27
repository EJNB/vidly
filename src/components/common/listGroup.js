import React from 'react';

const ListGroup = props => {
    const {genres, itemsSelected} = props;
    return (
        <ul className="list-group">
            {genres.map(genre=>
                <li key={genre[valueProperty]} className="list-group-item" onClick={() => itemsSelected(genre)}>
                    {genre.name[textProperty]}
                </li>
            )}
        </ul>
    );
};

ListGroup.defaultPorps = {
    textProperty: 'name',
    valueProperty: '_id'
};

export default ListGroup;
