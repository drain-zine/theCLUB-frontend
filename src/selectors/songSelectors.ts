import { createSelector } from 'reselect';
import { TSong, TPlaylist } from '../app.types';
import { AppReducerState } from '../reducers/AppReducer';


export const getAllSongs = createSelector([
        (state: AppReducerState) => state.songs
    ], (songs: Record<number, TSong>) => Object.keys(songs));

export const getSongsFromIds = createSelector([
    (state: AppReducerState) => state.songs,
    (state: AppReducerState, ids: number[]) => ids
], (songs: Record<number, TSong>, ids: number[]) => ids.map((id: number) => songs[id]));

export const getSongsIdsFromPlaylistId = createSelector([
    (state: AppReducerState) => state.playlists,
    (state: AppReducerState, id: number) => id
], (playlists: Record<number, TPlaylist>, id: number) => playlists ? playlists[id]?.trackIds : []);