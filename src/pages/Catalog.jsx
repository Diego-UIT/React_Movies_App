import React from 'react'

import { useParams } from 'react-router-dom'

import PageHeader from '../components/page-header/PageHeader'
import MovieGrid from '../components/movie-grid/MovieGrid'

import { category as cate} from '../api/tmdbApi'

const Catalog = () => {

    const { category } = useParams() 
    console.log(category)

    return (
        <div>
            <PageHeader>
                {category === cate.movie ? 'Movie' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section">
                    <MovieGrid category={ category }></MovieGrid>
                </div>
            </div>
        </div>
    )
}

export default Catalog
