import React from 'react';
import Card from './Card';

import { Link } from 'react-router';




const CardList = ( { cardData } ) => {

    
    return (

        <div className='CardList'>
            
            {cardData && cardData ? (

                <div className='card-container'>
                    
                    

                    {cardData.map((movie) => (
                        
                        <Link to={`/movie/:${movie.imdbId}`}>

                        <Card key={movie.imdbID} 
                        image={movie.Poster} 
                        title = { movie.Title } 
                        description = { movie.Year } 
                        movie={movie} 

                        />
                        </Link>
                    ))}
                
                </div>
            ) : (
                <p> </p>
            )}

        </div>
    );


}


export default CardList;






































