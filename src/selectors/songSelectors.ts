import { createSelector } from 'reselect';
import { TSong } from '../app.types';
import { AppReducerState } from '../reducers/AppReducer';


export const getAllSongs = createSelector([
        (state: AppReducerState) => state.songs
    ], (songs: Record<number, TSong>) => songs);