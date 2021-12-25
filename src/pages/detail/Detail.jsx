import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom'

import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import CastList from '../../pages/detail/CastList'
import VideoList from '../../pages/detail/VideoList'
import MovieList from '../../components/movie-list/MovieList'

import './detail.scss'

const Detail = () => {

    const { category, id } = useParams()
    console.log(category, id)
    const [item, setItem] = useState(null)
    console.log(item)

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}})
            setItem(response)
            window.scrollTo(0, 0)
        }
        getDetail()
    }, [category, id])

    return (
        <div>
            {
                item && (
                    <>
                        <div className="banner" 
                            style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="movie-content container mb-3">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img"
                                    style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title mb-2">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Cast</h2>
                                    </div>
                                    <CastList id={item.id} />
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3 section-video">
                                <VideoList id={item.id} />
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList type="similar" id={item.id} category={category}/>
                            </div>
                        </div>
                    </>
                   
                )
            }
        </div>
    )
}

export default Detail
