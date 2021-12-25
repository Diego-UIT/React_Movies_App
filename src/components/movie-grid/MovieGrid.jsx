import React, {useState, useEffect, useCallback} from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import tmdbApi, {movieType, tvType, category} from '../../api/tmdbApi'

import MovieCard from '../movie-card/MovieCard'
import Button, { OutlineButton } from '../button/Button'
import Input from '../input/Input'

import './movie-grid.scss'

const MovieGrid = (props) => {

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    console.log(page , totalPage)

    const {keyword} = useParams()

    useEffect(() => {
        const getList = async () => {
            let response = null

            if (keyword === undefined) {
                const params = {}
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params})
                        console.log(response)
                        break
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {params})
                }
            }
            else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params})
            }
            setItems(response.results)
            setTotalPage(response.total_pages)
        }
        getList()
    }, [props.category, keyword])

    const loadMore = async () => {
        let response = null

        if (keyword === undefined) {
            const params = {
                page: page + 1
            }
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {params})
                    console.log(response)
                    break
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {params})
            }
        }
        else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, {params})
        }
        setItems([...items, ...response.results])
        setPage(page + 1)
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch keyword={keyword} category={props.category}/>
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) => 
                        <MovieCard item={item} key={i} category={props.category}/>
                    )
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>
        
    )
}

const MovieSearch = props => {

    const navigate = useNavigate()

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')
    console.log(keyword)

    const goToSearch = useCallback(
        () => {
            //keyword.trim(): remove space
            if (keyword.trim().length > 0) {
                navigate(`/${category[props.category]}/search/${keyword}`)
            }
        },
        [keyword, props.category, navigate]
    )

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()

            if (e.keyCode === 13) {
                goToSearch()
            }
        }
        document.addEventListener('keyup', enterEvent)
        return () => {
            document.addEventListener('keyup', enterEvent)
        }
    }, [keyword, goToSearch])


    return (
        <div className="movie-search">
            <Input 
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid
