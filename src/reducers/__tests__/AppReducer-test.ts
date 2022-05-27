import { CACHE_SONGS } from '../../actions/types';
import AppReducer from '../AppReducer';

// A sample of how I would test the reducer
describe('AppReducer', () => {
    it('should handle the CACHE_SONGS action', () => {
        const state = {
            songs: [],
            playlists: []
        };

        const songs = [{
            id: 1,
            name: 'test',
            filename: 'test.mp3',
            album: {
                id: 1,
                name: 'test album',
                releaseDate: '2022',
                cover: 'cover.png',
                artist: {
                    id: 1,
                    name: 'tom'
                }
            }
        }];

        const newState = AppReducer(state, { type: CACHE_SONGS, songs});
        expect(newState.songs).toEqual({
            '1': {
                name: 'test',
                filename: 'test.mp3',
                album: {
                    name: 'test album',
                    releaseDate: '2022',
                    cover: 'cover.png',
                    artist: {
                        name: 'tom'
                    }
                }
            }
        });
    });
});