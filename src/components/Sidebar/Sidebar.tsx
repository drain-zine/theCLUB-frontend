import React from 'react';
import { useSelector } from 'react-redux';
import { TPlaylist } from '../../app.types';
import { getAllPlaylists } from '../../selectors/playlistSelectors';
import styles from './Sidebar.module.scss';

const Sidebar = ({setActivePlaylist}: {setActivePlaylist: (id: number) => void}) => {
    const playlists = useSelector(getAllPlaylists);

    return(
        <section className={styles.container}>
            <div key={0} onClick={() => setActivePlaylist(0)} className={`${styles.link} ${styles.bigLink}`}>
                <p>Songs</p>
            </div>
            <p className={styles.header}>My Playlists</p>
            { playlists && Object.keys(playlists).map((id: string) => (
                <div onClick={() => setActivePlaylist(parseInt(id))} key={id} className={`${styles.playlist} ${styles.link}`}>
                    <p className={styles.playlist}>{playlists[parseInt(id)].name}</p>
                </div>
            ))}
        </section>
    );
};

export default Sidebar;