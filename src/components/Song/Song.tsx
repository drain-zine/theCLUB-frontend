import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Popover from '../Popover/Popover';
import styles from './Song.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { removeTrackFromPlaylist } from '../../actions/AppActions';

const Song = ({activePlaylist, id, name, artistName, albumName, duration}: any) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const dispatch = useDispatch();

    return(
        <tr className={styles.song} key={id}>
            <td>{name}</td>
            <td>{artistName}</td>
            <td>{albumName}</td>
            <td>{duration}</td>
            <td className={styles.controls} onClick={() => setIsPopoverOpen(prev => !prev)}>
                { isPopoverOpen && <Popover initialTrackId={id} onClose={() => setIsPopoverOpen(false)}/>}
                <FontAwesomeIcon icon={faCirclePlus} />
            </td>
            {
                activePlaylist !== 0 && 
                    <td className={styles.controls} onClick={() => dispatch(removeTrackFromPlaylist(activePlaylist, parseInt(id)))}>
                        <FontAwesomeIcon icon={faCircleMinus} />
                    </td>
            }
        </tr>
    )
};

export default Song;