import React from 'react';

const ListGroup = props => {
    const {genres, textProperty, valueProperty, onItemsSelect, selectedItem} = props;
    return (
        <ul className="list-group">
            {genres.map(genre=>
                <li key={genre[valueProperty]}
                    className={genre === selectedItem ? "list-group-item active" : "list-group-item"}
                    onClick={() => onItemsSelect(genre)}
                >
                    {genre[textProperty]}
                </li>
            )}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

export default ListGroup;
