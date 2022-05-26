import { AnyAction } from 'redux';
import * as ACTIONS from '../actions/types';
import { TSong, TPlaylist, TAPISong } from '../app.types';

export interface AppReducerState{
    songs: Record<number, TSong>,
    playlists: Record<number, TPlaylist>, 
}

const AppReducer = (baseState = {} as AppReducerState, action: AnyAction): AppReducerState => {
    switch(action.type){
        case ACTIONS.CACHE_SONGS: {
            const songs: TAPISong[] = action.songs;
            const flattendSongs: Record<number, TSong> = Object.assign({}, ...songs.map(( song: TAPISong) => {
                const {id, name, filename, album} = song;
                return {
                    [id]: {
                        name,
                        filename,
                        album: {
                            name: album.name,
                            releaseDate: album.releaseDate,
                            cover: album.cover,
                            artist: {
                                name: album.artist.name
                            }
                        }        
                    }
                }    
            }));

            return{
                ...baseState,
                songs: flattendSongs
            }
        }
        case ACTIONS.CREATE_PLAYLIST: {
            return baseState;
        }

        case ACTIONS.RECIEVE_PLAYLIST: {
            return {
                ...baseState,
                playlists: {
                    ...baseState.playlists,
                    [action.playlistId]: {
                        ...action.meta,
                        creationDate: action.creationDate,
                        trackIds: []
                    }
                }
            }
        }

        case ACTIONS.ADD_TRACK_TO_PLAYLIST: {
            return baseState;
        }

        case ACTIONS.UPDATE_PLAYLIST_WITH_NEW_TRACK: {
            const { playlistId, trackId } = action;
            const prevTrackIds = baseState.playlists[playlistId].trackIds;

            return {
                ...baseState,
                playlists: {
                    ...baseState.playlists,
                    [playlistId]: {
                        ...baseState.playlists[playlistId],
                        trackIds: [...prevTrackIds, trackId]
                    }
                }
            };
        }

        default:
            return baseState;
    }
};

export default AppReducer;