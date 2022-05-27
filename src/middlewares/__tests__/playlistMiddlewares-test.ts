import { DELETE_PLAYLIST } from '../../actions/types';
import { deletePlaylistMiddleware } from '../playlistMiddlewares';
import axios from 'axios';

jest.mock('axios');

// This is how I would mock and test middlewares
describe('playlistMiddlewares', () => {
    const nextSpy: jest.Mock = jest.fn();
    axios.post = jest.fn();


    describe('deletePlaylistMiddleware', () => {
        it('should ignore irrelevant actions', () => {
            deletePlaylistMiddleware({} as any)(nextSpy)({
                type: 'HELLO',
                playlistId: 0
            });
            expect(nextSpy).toBeCalled();
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should handle a successful request',  () => {
            
            deletePlaylistMiddleware({} as any)(nextSpy)({
                type: DELETE_PLAYLIST,
                playlistId: 0
            });
            expect(nextSpy).toBeCalled();
            expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
                playlistId: 0
            });
        });

        it('should handle a failed request', () => {
            (axios.post as jest.Mock).mockRejectedValue('oops');
            deletePlaylistMiddleware({} as any)(nextSpy)({
                type: DELETE_PLAYLIST,
                playlistId: 0
            });
            expect(nextSpy).toBeCalled();
            expect(console.error).toHaveBeenCalled();
        });
    });
});