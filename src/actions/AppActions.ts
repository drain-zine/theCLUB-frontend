import { TAPIPlaylist, TAPIPlaylistTracks, TAPISong, TPlaylistMeta } from "../app.types"
import * as ACTIONS from './types';

// action to cacheSongs on page load
export const cacheSongs = (songs: TAPISong[]) => {
    return { type: ACTIONS.CACHE_SONGS, songs};
};

// action to cachePlaylists on page load
export const cachePlaylists = (playlists: TAPIPlaylist[], playlistTracks: TAPIPlaylistTracks[]) => {
    return { type: ACTIONS.CACHE_PLAYLISTS, playlists, playlistTracks };
}

// action creator to create playlist on server
export const createPlaylist = (meta: TPlaylistMeta, initialTrackId: number) => {
    return { type: ACTIONS.CREATE_PLAYLIST, meta, initialTrackId};
};

// action creator to recieve response from server of playlist creation action
export const recievePlaylist = (playlistId: number, meta: TPlaylistMeta, creationDate: number) => {
    return { type: ACTIONS.RECIEVE_PLAYLIST, playlistId, meta, creationDate };
};

// action creator to add a track to a playlist
export const addTrackToPlaylist = (playlistId: number, trackId: number) => {
    return { type: ACTIONS.ADD_TRACK_TO_PLAYLIST, playlistId, trackId };
};

// action creator to recieve response after adding track to playlist
export const updatePlaylistWithNewTrack = (playlistId: number, trackId: number) => {
    return { type: ACTIONS.UPDATE_PLAYLIST_WITH_NEW_TRACK, playlistId, trackId };
};
