import React from 'react';
import { useSelector } from 'react-redux';
import { TPlaylist } from '../../app.types';
import { getAllPlaylists } from '../../selectors/playlistSelectors';

const Sidebar = () => {
    const playlists = useSelector(getAllPlaylists);

    return(
        <section>
            <p>Songs</p>
            { playlists && Object.keys(playlists).map((id: string) => (
                <p key={id}>{playlists[parseInt(id)].name}</p>
            ))}
        </section>
    );
};

export default Sidebar;