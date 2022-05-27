import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppReducerState } from '../../reducers/AppReducer';
import { getSongsFromIds } from '../../selectors/songSelectors';
import { TSong } from '../../app.types';
import styles from './SongList.module.scss';
import Song from '../Song/Song';

const SongList = ({activePlaylist, songIds}: { activePlaylist: number, songIds: number[]}) => {
    const songs = useSelector((state: AppReducerState) => getSongsFromIds(state, songIds));
    const [filterText, setFilterText] = useState('');

    const filteredSongs = useMemo(() => songs.filter(song => 
        song.name.toLowerCase().startsWith(filterText.toLowerCase())), 
    [filterText, songs]);

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <input value={filterText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}></input>
            </div>
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
                    {filteredSongs.map((song: TSong, idx: number) => 
                        <Song
                            key={songIds[idx]}
                            activePlaylist={activePlaylist}
                            id={songIds[idx]}
                            name={song.name}
                            albumName={song.album.name}
                            artistName={song.album.artist.name}
                            duration={'3:20'} />
                    )}
                </tbody>
                
            </table>

            {songs.length === 0 && <p>No songs have been added to this playlist yet. </p>}
        </div>
    );
};

export default SongList;