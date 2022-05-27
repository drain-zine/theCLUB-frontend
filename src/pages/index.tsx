import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppReducerState } from '../reducers/AppReducer';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import CreatePlaylistModal from '../components/CreatePlaylistModal/CreatePlaylistModal';
import { TAPIPlaylistTracks, TAPIPlaylist, TAPISong, TSong } from '../app.types';
import { cacheSongs, cachePlaylists } from '../actions/AppActions';
import Sidebar from '../components/Sidebar/Sidebar';
import SongList from '../components/SongList/SongList';
import { getAllSongs, getSongsIdsFromPlaylistId } from '../selectors/songSelectors';
import { getCurrentMeta } from '../selectors/playlistSelectors';

interface HomeProps{
  songsAPI: TAPISong[];
  playlistsAPI: TAPIPlaylist[];
  playlistTracksAPI: TAPIPlaylistTracks[];
}

const Home: NextPage = ({ songsAPI, playlistsAPI, playlistTracksAPI }: any) => {
  const dispatch = useDispatch();
  const [activePlaylist, setActivePlaylist] = useState(3); // set with playlistId. As database indexes from 1 we will use 0 for all songs
  
  const songIds = useSelector((state: AppReducerState) =>
    activePlaylist === 0 ? 
      getAllSongs(state) : 
      getSongsIdsFromPlaylistId(state, activePlaylist
  )) || [];

  const currentMeta = useSelector((state: AppReducerState) => 
        activePlaylist === 0 ?
        { name: 'My Songs', description: 'All my downloaded songs'} :
        getCurrentMeta(state, activePlaylist)
  );
  
  const loaded = songsAPI !== undefined 
    && playlistsAPI !== undefined 
    && playlistTracksAPI !== undefined;


  // Cache data from server on initial load
  useEffect(() => {
    songsAPI && dispatch(cacheSongs(songsAPI));
  }, [songsAPI])

  useEffect(() => {
    if(playlistsAPI && playlistTracksAPI){
      dispatch(cachePlaylists(playlistsAPI, playlistTracksAPI));
    }
  }, [playlistsAPI, playlistTracksAPI])

  return (
    <div className={styles.container}>
          <header className={styles.header}>
            <h3>{currentMeta.name}</h3>
            <p>{currentMeta.description}</p>
          </header>
    
          <main className={styles.main}> 
            <nav className={styles.nav}>
              <Sidebar setActivePlaylist={setActivePlaylist}/>
            </nav>
            <SongList activePlaylist={activePlaylist} songIds={songIds as number[]}/>
          </main>
      
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

export default Home;
