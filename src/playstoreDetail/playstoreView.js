import React from 'react';
import './playstoreStyle.css';
// import moment from 'moment';

export default function playstoreView(props) {
    return(
        <div className="playstoreView-detail">
            <h2>{ props.App }</h2>
            <div className="playstoreView-rating">Rating: { props.Rating }</div>
            <div className="playstoreView-genre">Genre: { props.Genres }</div>
        </div>
    )
}