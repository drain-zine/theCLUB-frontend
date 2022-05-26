import { createStore, compose, applyMiddleware } from 'redux'
import { createPlaylistMiddleware, addTrackToPlaylistMiddleware } from '../middlewares/playlistMiddlewares';
import AppReducer from '../reducers/AppReducer';

// ---Redux DevTools
let composeEnhancers = compose;
if (typeof window !== 'undefined') {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(AppReducer, composeEnhancers(
    applyMiddleware(createPlaylistMiddleware, addTrackToPlaylistMiddleware)
));

export default store;