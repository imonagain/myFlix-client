import React from 'react';

export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'Doctor Strange in the Multiverse of Madness', Description: 'Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.', Genre: 'Fantasy', Year: '2022', ImagePath: 'https://www.themoviedb.org/t/p/w1280/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg'},
                {_id: 2, Title: 'Spider-Man: No Way Home', Description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', Genre: 'Action', Year: '2021', ImagePath: 'https://www.themoviedb.org/t/p/w1280/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'},
                {_id: 3, Title: 'Top Gun: Maverick', Description: 'After more than thirty years of service as one of the Navy/’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.', Year: '2022', Genre: 'Action', ImagePath: 'https://www.themoviedb.org/t/p/w1280/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg'}

            ],
            selectedMovie: null
        }
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre}</span>
                </div>
                <div className="movie-year">
                    <span className="label">Year: </span>
                    <span className="value">{movie.Year}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        )
    }
}