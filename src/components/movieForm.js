import React from "react";

const MovieForm = ({match, history}) => {
  return (
      <React.Fragment>
        <h1>Movie Form {match.params.id}</h1>
        <button onClick={()=> history.push('/movies') } className="btn btn-outline-success">Save</button>
      </React.Fragment>
  )
};

export default MovieForm;
