import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const middleware = [thunk];

if (__DEV__) {
  const { logger } = require("redux-logger");
  middleware.push(logger);
}

export const store = createStore(
  reducers,
  undefined,
  applyMiddleware(...middleware)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
