import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import CreatePlaylistModal from '../components/CreatePlaylistModal/CreatePlaylistModal';
import { TAPIPlaylistTracks, TAPIPlaylist, TAPISong, TSong } from '../app.types';
import { cacheSongs, cachePlaylists } from '../actions/AppActions';
import { getAllSongs } from '../selectors/songSelectors';
import Sidebar from '../components/Sidebar/Sidebar';

interface HomeProps{
  songsAPI: TAPISong[];
  playlistsAPI: TAPIPlaylist[];
  playlistTracksAPI: TAPIPlaylistTracks[];
}

const Home: NextPage = ({ songsAPI, playlistsAPI, playlistTracksAPI }: any) => {
  const dispatch = useDispatch();
  const songs = useSelector(getAllSongs);
  const [openModalWithSong, setOpenModalWithSong] = useState<number | null>(null);

  // Cache data from server on initial load
  useEffect(() => {
    songsAPI && dispatch(cacheSongs(songsAPI));
  }, [songsAPI])

  console.log(songsAPI);
  console.log(playlistsAPI);
  console.log(playlistTracksAPI);

  useEffect(() => {
    if(playlistsAPI && playlistTracksAPI){
      dispatch(cachePlaylists(playlistsAPI, playlistTracksAPI));
    }
  }, [playlistsAPI, playlistTracksAPI])

  return (
    <div className={styles.container}>
      <nav>
        <Sidebar/>
      </nav>
      <main className={styles.main}> 
      { openModalWithSong !== null && <CreatePlaylistModal onClose={() => setOpenModalWithSong(null)} initialTrackId={openModalWithSong}/>}

      {songs ? (
        <table>
          <tr>
            <th>Song</th>
            <th>Album</th>
          </tr>
        
          {
            Object.keys(songs).map((stringId: string) => {
              const id: number = parseInt(stringId);
              const song: TSong = songs[id];
              return (
                <tr key={id}>
                  <td>{song.name}</td>
                  <td>{song.album.name}</td>
                  <td onClick={() => setOpenModalWithSong(id)}>Click me</td>
                </tr>
              );
            })
          }
      </table>  ) :
        <p>Hello wlrd!</p> }
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from API
  const songsRes = await fetch(`http://localhost:8000/tracks`);
  const songsRaw = await songsRes.json();
  const songsAPI: TAPISong[] = songsRaw.data;


  const playlistsRes = await fetch(`http://localhost:8000/playlist`);
  const playlistsRaw = await playlistsRes.json();
  const playlistsAPI: TAPIPlaylist[] = playlistsRaw.data.playlists;
  const playlistTracksAPI: TAPIPlaylistTracks[] = playlistsRaw.data.playlistTracks;

  // Pass data to the page via props
  return { props: { songsAPI, playlistsAPI, playlistTracksAPI } }
}

export default Home
