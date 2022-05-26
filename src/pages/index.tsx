import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import CreatePlaylistModal from '../components/CreatePlaylistModal/CreatePlaylistModal';
import { TAPISong, TSong } from '../app.types';
import { cacheSongs } from '../actions/AppActions';
import { getAllSongs } from '../selectors/songSelectors';
import Sidebar from '../components/Sidebar/Sidebar';

const Home: NextPage = ({ songsAPI }: any) => {
  const dispatch = useDispatch();
  const songs = useSelector(getAllSongs);
  const [openModalWithSong, setOpenModalWithSong] = useState<number | null>(null);

  useEffect(() => {
    dispatch(cacheSongs(songsAPI));
  }, [songsAPI])

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
  const res = await fetch(`http://localhost:8000/tracks`);
  const raw = await res.json();
  const songsAPI: TAPISong[] = raw.data;

  // Pass data to the page via props
  return { props: { songsAPI } }
}

export default Home
