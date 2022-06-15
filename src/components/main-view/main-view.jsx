import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// React component names must begin with capital letter

export class MainView extends React.Component {

    constructor() {
        super(); // related to object-oriented programming; initializes component's state
        this.state = {
            movies: [
                {_id: 1, Title: 'Doctor Strange in the Multiverse of Madness', Description: 'Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.', Genre: 'Fantasy', Year: '2022', ImagePath: 'https://www.themoviedb.org/t/p/w1280/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg'},
                {_id: 2, Title: 'Spider-Man: No Way Home', Description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', Genre: 'Action', Year: '2021', ImagePath: 'https://www.themoviedb.org/t/p/w1280/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'},
                {_id: 3, Title: 'Top Gun: Maverick', Description: 'After more than thirty years of service as one of the Navy/’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.', Year: '2022', Genre: 'Action', ImagePath: 'https://www.themoviedb.org/t/p/w1280/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg'}

            ]
        }
    }
    
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

   
        render() {
            const { movies, selectedMovie } = this.state;
        
        
            if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
        
            return (
              <div className="main-view">
                {selectedMovie
                  ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  : movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                  ))
                }
          </div>
        );
      }
}

export default MainView;