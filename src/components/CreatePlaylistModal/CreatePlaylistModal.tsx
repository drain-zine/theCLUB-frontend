import React, { useState, useCallback, useRef, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../../actions/AppActions';
import styles from './CreatePlaylistModal.module.scss';
import useOnClickOutside from 'use-onclickoutside';

interface CreatePlaylistModalProps{
    initialTrackId: number
    onClose: () => void;
};

const CreatePlaylistModal = ({ initialTrackId, onClose }: CreatePlaylistModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }, [formData, setFormData]);

    // handle click outside modal
    useOnClickOutside(modalRef, onClose);

    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault(); // prevent page refresh
        dispatch(createPlaylist(formData, initialTrackId));
        onClose();
    }, [formData, initialTrackId]);

    return(
        <div ref={modalRef} className={styles.container}>
            <form onSubmit={onSubmit}>
              <label htmlFor="name">Name</label><br/>
              <input type="text" id="name" name="name" onChange={handleInput} value={formData.name}/><br/>
              <label htmlFor="name">Description</label><br/>
              <input type="text" id="description" name="description" onChange={handleInput} value={formData.description}/><br/>
              <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default CreatePlaylistModal;