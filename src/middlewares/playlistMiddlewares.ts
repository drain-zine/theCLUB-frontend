import * as ACTIONS from '../actions/types';
import { AnyAction, Dispatch, Middleware } from 'redux';
import axios  from 'axios';
import { addTrackToPlaylist, recievePlaylist, updatePlaylistWithNewTrack } from '../actions/AppActions';

// Middleware to dispatch network request for creating playlist
export const createPlaylistMiddleware: Middleware = (store: any) => (next: Dispatch<AnyAction>) => async(action: AnyAction) => {
    next(action);
    if(action.type === ACTIONS.CREATE_PLAYLIST){
        const { meta, initialTrackId } = action;

        try{
            const resp = await axios.post('http://localhost:8000/playlist/create', {
                meta,
                initialTrackId
            });

            if(resp.data.success){
                // add playlist to local cache
                store.dispatch(recievePlaylist(resp.data.playlistId, meta, resp.data.creationDate));

                // dispatch add track to playlist action if specified
                if(initialTrackId){
                    store.dispatch(addTrackToPlaylist(resp.data.playlistId, initialTrackId));
                }
            }
        }catch(e){
            console.error(e);
        }
    }
};

// Middleware to dispatch network request for updating playlist with a track
export const addTrackToPlaylistMiddleware: Middleware = (store: any) => (next: Dispatch<AnyAction>) => async(action: AnyAction) => {
    next(action);
    if(action.type === ACTIONS.ADD_TRACK_TO_PLAYLIST){
        const { playlistId, trackId } = action;

        try{
            const resp = await axios.post('http://localhost:8000/playlist/add-track', {
                playlistId,
                trackId
            });

            if(resp.data.success){
                // add playlist to local cache
                store.dispatch(updatePlaylistWithNewTrack(playlistId, trackId));
            }
        }catch(e){
            console.error(e);
        }
    }
};