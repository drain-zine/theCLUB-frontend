import { createSelector } from 'reselect';
import { TPlaylist } from '../app.types';
import { AppReducerState } from '../reducers/AppReducer';


export const getAllPlaylists = createSelector([
        (state: AppReducerState) => state.playlists
    ], (playlists: Record<number, TPlaylist>) => playlists
);

export const getCurrentMeta = createSelector([
        (state: AppReducerState) => state.playlists,
        (state: AppReducerState, id: number) => id
    ], (playlists: Record<number, TPlaylist>, id: number) => ({
        name: playlists ? playlists[id]?.name : '',
        description:  playlists ? playlists[id]?.description: ''
}));