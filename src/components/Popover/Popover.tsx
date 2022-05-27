import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylists } from '../../selectors/playlistSelectors';
import useOnClickOutside from 'use-onclickoutside';
import CreatePlaylistModal from '../CreatePlaylistModal/CreatePlaylistModal';
import styles from './Popover.module.scss';
import { TPlaylist } from '../../app.types';
import { addTrackToPlaylist } from '../../actions/AppActions';

interface PopoverProps{
    initialTrackId: number
    onClose: () => void;
};

const Popover = ({initialTrackId, onClose}: PopoverProps) => {
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const playlists = useSelector(getAllPlaylists);
    const dispatch = useDispatch();
    
    // handle click outside modal
    useOnClickOutside(popoverRef, !isModalOpen ? onClose : () => {});

    const openModalCallback = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    useEffect(() => {
    }, [isModalOpen])

    return (
        <>
            <div onClick={e => e.stopPropagation()} className={styles.popover} ref={popoverRef}>
                <p onClick={() => openModalCallback()}>Create New</p>
                {Object.keys(playlists).map((id: string) => {
                    const playlist = playlists[parseInt(id)];
                    return(
                        <p key={id} onClick={() => dispatch(addTrackToPlaylist(parseInt(id), initialTrackId))}>{playlist.name}</p>
                    )
                })}
            </div>

            {isModalOpen && <CreatePlaylistModal initialTrackId={initialTrackId} onClose={() => setIsModalOpen(false)}/>}
        </>
    );
};

export default Popover;