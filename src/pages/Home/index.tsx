import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Page, Input, Button, Title, Text, Icon, } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/json-imports/Icons.js';
import FavoriteButton from './FavoriteButton.tsx';
export default function Home() {
  const [movie, setMovie] = useState<IMovie | any>();
  const [searchTitle, setSearchTitle] = useState('')
  const [favorite, setFavorite] = useState('')
  const [favorites, setFavorites] = useState(null || [])

  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    function getFavorites() {
      const data = JSON.parse(localStorage.getItem('favorites') || '');
      setFavorites(data)
    }
    getFavorites()
  }, [favorite])

  useEffect(() => {
    search(favorite)
  }, [favorite, favorites])

  async function search(title) {
    const response = await api.get(`/movies?title=${title}`);
    setMovie(response.data)
  }

  function saveFavorite() {
    setFavorite(movie.title)
    let storedFavorites = JSON.parse(localStorage.getItem("favorites") || '');
    let favorites = storedFavorites || [];
    if (favorites && favorites.includes(movie.title)) return
    favorites.push(movie.title)
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function removeFavorite(title) {
    let updatedFavorites = favorites;
    updatedFavorites = updatedFavorites.filter((e => e !== title));
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorite('')
    setSearchTitle('')
  }

  return <>
    <Page>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Input style={{ width: '600px', marginRight: '10px' }} type="Text" value={searchTitle} onChange={(e: any) => setSearchTitle(e.target.value)} />
        <button type="submit" onClick={() => search(searchTitle)}>search</button>
      </div>

      <hr />

      {movie && movie.title ? <>
        <div className='mt-4'>
          <Title style={{ textAlign: 'center' }}>
            {movie.title}
          </Title>
        </div>

        <div className='row mt-3'>
          <div className='col-lg-4 col-12'>
            <p>
              <Text>
                <b>Lançamento:</b> {movie.released}
              </Text>
              <span className='float-right'>
                {favorites && favorites.includes(movie.title) ?

                  <Icon name="favorite" onClick={() => removeFavorite(movie.title)} style={{ color: 'blue' }} />
                  :
                  <Icon name="favorite" style={{ color: 'gray' }} onClick={() => saveFavorite()} />
                }
              </span>
            </p>
            <p>
              <Text>
                <b>Direção:</b> {movie.director}
              </Text>
            </p>
            <p>
              <Text>
                <b>Roteiro:</b> {movie.writer}
              </Text>
            </p>
            <p>
              <Text>
                <b>Elenco:</b> {movie.actors}
              </Text>
            </p>
            <p>
              <Text>
                <b>Gênero:</b> {movie.genre}
              </Text>
            </p>
            <p>
              <Text>
                <b>Duração:</b> {movie.runtime}
              </Text>
            </p>
            <p>
              <Text>
                <b>Premiações:</b> {movie.awards}
              </Text>
            </p>
            <p>
              <Text>
                <b>Avaliações: </b>{movie.ratings && movie.ratings[0]?.Value}
              </Text>
            </p>
            <p>
              <Text>
                <b>Sinopse:</b> {movie.plot}
              </Text>
            </p>
          </div>

          <div className='col-lg-4 ml-5 col-12' >
            <p>
              <img style={{ maxWidth: '500px' }} src={movie.poster} />
            </p>
          </div>

          <div className='col-lg-2 col-12' style={{ textAlign: 'center' }} >
            <p>
              <b>MEUS FAVORITOS</b>
            </p>
            {favorites && favorites.map((favorite) => (
              <>
                <p onClick={() => search(favorite)}>
                  <Text>
                    <button style={{ border: 'none', backgroundColor: 'transparent' }}>
                      <u>
                        {favorite}
                      </u>
                    </button>
                  </Text>
                </p>
              </>
            ))}
          </div>
        </div>

      </> : <Title style={{ textAlign: 'center' }}>
        Filme não encontrado em nossa base de dados</Title>}
    </Page>
  </>

}
