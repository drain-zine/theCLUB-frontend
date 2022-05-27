import { getSongsFromIds } from '../songSelectors';

// A sample of how i would test a selector
describe('songSelectors', () => {
    it('should getSongsFromIds', () => {
        const state = {
            songs: {
                1: {
                    name: 'hello'
                },
                2: {
                    name: 'world'
                },
                3: {
                    name: 'predictable'
                }
            }
        };

        const ids = [1, 3];

        expect(getSongsFromIds(state as any, ids)).toEqual([
            {
                name: 'hello'
            },{
                name: 'predictable'
            }
        ]);


    });
});