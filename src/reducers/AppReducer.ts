import { AnyAction } from 'redux';
import * as ACTIONS from '../actions/types';
import { TSong, TPlaylist, TAPISong, TAPIPlaylist, TAPIPlaylistTracks } from '../app.types';

export interface AppReducerState{
    songs: Record<number, TSong>,
    playlists: Record<number, TPlaylist>, 
}

// Reducer for our local app cache
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

        case ACTIONS.CACHE_PLAYLISTS: {
            const { playlists, playlistTracks } = action;
            const flattendPlaylists: Record<number, TPlaylist> = Object.assign({}, ...playlists.map(( playlist: TAPIPlaylist) => {
                const {id, name, description, creationDate} = playlist;
                const trackIds = playlistTracks
                    .filter((playlistTrack: TAPIPlaylistTracks) => playlistTrack.playlistId === id)
                    .map((filteredPTrack: TAPIPlaylistTracks) => filteredPTrack.trackId);
                return {
                    [id]: {
                        name,
                        description,
                        creationDate,
                        trackIds
                    }
                }    
            }));

            return{
                ...baseState,
                playlists: flattendPlaylists
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

        case ACTIONS.REMOVE_TRACK_FROM_PLAYLIST: {
            return baseState;
        }

        case ACTIONS.REMOVE_TRACK_FROM_PLAYLIST_CACHE: {
            const { playlistId, trackId } = action;
            const prevTrackIds = baseState.playlists[playlistId].trackIds;
            console.log(prevTrackIds);
            console.log(trackId);
            console.log( prevTrackIds.filter(t => t !== parseInt(trackId)));

            return {
                ...baseState,
                playlists: {
                    ...baseState.playlists,
                    [playlistId]: {
                        ...baseState.playlists[playlistId],
                        trackIds: prevTrackIds.filter(t => t !== parseInt(trackId))
                    }
                }
            }
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
                        trackIds: [...prevTrackIds, parseInt(trackId)]
                    }
                }
            };
        }

        default:
            return baseState;
    }
};

export default AppReducer;