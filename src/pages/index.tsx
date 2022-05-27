import type { NextPage } from 'next';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppReducerState } from '../reducers/AppReducer';
import styles from '../styles/Home.module.scss';
import { TAPIPlaylistTracks, TAPIPlaylist, TAPISong } from '../app.types';
import { cacheSongs, cachePlaylists, deletePlaylist } from '../actions/AppActions';
import Sidebar from '../components/Sidebar/Sidebar';
import SongList from '../components/SongList/SongList';
import { getAllSongs, getSongsIdsFromPlaylistId } from '../selectors/songSelectors';
import { getCurrentMeta } from '../selectors/playlistSelectors';

import { Canvas } from "@react-three/fiber";
import BackgroundBox from '../components/BackgroundBox/BackgroundBox';

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
  
  const handleDelete = useCallback(() => {
    dispatch(deletePlaylist(activePlaylist));
    setActivePlaylist(prev => Math.max(0, prev - 1));
  }, [activePlaylist]);

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
            <div onClick={() => handleDelete()} className={styles.delete}><p>delete</p></div>
          </header>
    
          <main className={styles.main}> 
            <nav className={styles.nav}>
              <Sidebar setActivePlaylist={setActivePlaylist}/>
            </nav>
            <SongList activePlaylist={activePlaylist} songIds={songIds as number[]}/>
          </main>

          <div className={styles.canvas}>
          <Canvas linear camera={{position: [0,0, -20]}}>
            <ambientLight />
            <BackgroundBox 
              color={'orange'}
              size={[20, 3, 2]}
              position={[15, 0, 0]} />
            </Canvas>
          </div>
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
