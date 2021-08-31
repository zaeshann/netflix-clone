import React, { useState, useEffect } from 'react'
import axios from '../axios'
import '../css/Row.css'
import YouTube from "react-youtube"
import movieTrailer from 'movie-trailer';
function Row({ title, fetchUrl, isLarge }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("");
    const base_url = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])


    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const handleClick = (movie) => {
        // console.table(movie?.title)
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="poster_container">
                {movies.map(movie => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={movie.id}
                        className={`poster_img ${isLarge && "poster_img_lg"}`}
                        src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title} />
                ))}
            </div>
            <div className="vide_container">
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

            </div>
        </div>
    )
}

export default Row
