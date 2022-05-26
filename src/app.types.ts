// An abstraction of our relational database.
// Here we are only caching a 'flattened' version of our song type, with id's stripped.
export type TArtist = {
    name: string;
};

export type TAlbum = {
    name: string;
    releaseDate: number;
    cover: string;
    artist: TArtist;
};

export type TSong = {
    name: string;
    filename: string;
    album: TAlbum;
};

export type TPlaylist = {
    name: string;
    description: string;
    creationDate: string;
    trackIds: number[];
}

export type TPlaylistMeta = {
    name: string;
    description: string;
}

// types from our API
export type TAPIArtist = {
    id: number;
    name: string;
};

export type TAPIAlbum = {
    id: number;
    name: string;
    releaseDate: number;
    cover: string;
    artist: TAPIArtist;
};

export type TAPISong = {
    id: number;
    name: string;
    filename: string;
    album: TAPIAlbum;
};

export type TAPIPlaylist = {
    name: string;
    description: string;
    creationDate: string;
    trackIds: number[];
}