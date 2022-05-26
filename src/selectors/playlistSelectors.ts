import { createSelector } from 'reselect';
import { TPlaylist } from '../app.types';
import { AppReducerState } from '../reducers/AppReducer';


export const getAllPlaylists = createSelector([
        (state: AppReducerState) => state.playlists
    ], (playlists: Record<number, TPlaylist>) => playlists);