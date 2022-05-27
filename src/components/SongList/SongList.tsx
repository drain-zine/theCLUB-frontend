import React from 'react';
import { useSelector } from 'react-redux';
import { AppReducerState } from '../../reducers/AppReducer';
import { getSongsFromIds } from '../../selectors/songSelectors';
import { TSong } from '../../app.types';
import styles from './SongList.module.scss';
import Song from '../Song/Song';

const SongList = ({activePlaylist, songIds}: { activePlaylist: number, songIds: number[]}) => {
    const songs = useSelector((state: AppReducerState) => getSongsFromIds(state, songIds));
    
    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.header}>
                    <th>TITLE</th>
                    <th>ARTIST</th>
                    <th>ALBUM</th>
                    <th>DURATION</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {songs.map((song: TSong, idx: number) => 
                    <Song
                        activePlaylist={activePlaylist}
                        id={songIds[idx]}
                        name={song.name}
                        albumName={song.album.name}
                        artistName={song.album.artist.name}
                        duration={'3:20'} />
                )}
            </tbody>
            
        </table>
    );
};

export default SongList;