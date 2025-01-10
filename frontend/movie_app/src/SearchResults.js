import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from 'axios';
import CardList from "./Components/CardList";
import Pagination from "./Components/Pagination";


const key = process.env.REACT_APP_API_KEY;


const SearchResults = () => {


    const [ movieName, setMovieName ] = useState('Naruto');
    const [ notFound, setNotFound ] = useState( false );
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ postsPerPage, setPostsPerPage ] = useState( 4 );


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;


    async function fetchMovies( movieName = 'Naruto' ) {

        try {

            const response = await axios.get( `http://www.omdbapi.com/?apikey=${key}&s=${movieName}` );

            console.log(response.data);

            if ( response.data.Response === 'False' ) {
                
                setNotFound( true );

            }

            return response.data;
        
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    };

    const { data : movies , isLoading, error, refetch } = useQuery({
        queryFn: ( { queryKey } ) => fetchMovies( queryKey[ 1 ].movieName ) ,
        queryKey: ['searchResults', { movieName }],
        staleTime: Infinity

    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }


    const handleClick = ( event ) => {
        refetch();
    };


    const currentPosts = movies.Search.slice( firstPostIndex, lastPostIndex )

    
    return (
        <div className='search'>
            <input
                type='text'
                placeholder='Search for Movies'
                onChange={(event) => {

                    setMovieName( event.target.value )
                }

                }
            />
            <button className='search_button' onClick={handleClick}>
                Submit
            </button>

            <CardList cardData = { currentPosts } />

            <Pagination 
            totalPosts = { movies.Search.length } 
            postsPerPage = { postsPerPage } 
            setCurrentPage = { setCurrentPage } 
            currentPage = { currentPage } />

            { notFound? ( <div> 
                No Movies Found 
            </div> ) : ( <p> </p> 
            )
        }
        </div>
    );
};

export default SearchResults;
