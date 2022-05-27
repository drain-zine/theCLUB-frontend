import { createPlaylist } from '../AppActions';
import { CREATE_PLAYLIST } from '../types';

// This is how I would test an action creator
describe('AppActions', () => {
    it('should dispatch correct action on createPlaylist', () => {
        const meta = {};
        const initialTrackId = 0;

        expect(createPlaylist(meta as any, initialTrackId)).toEqual({
            type: CREATE_PLAYLIST,
            meta,
            initialTrackId
        });
    });
});