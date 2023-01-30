import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const reduxStore = configureStore({
  reducer: rootReducer,
  preloadedState: { ...rootReducer, reducerCart: loadFromLocalStorage() },
});
function loadFromLocalStorage() {
  try {
    let tempState = localStorage.getItem("cart");
    if (tempState === null) return undefined;
    return JSON.parse(tempState);
  } catch (error) {
    console.log("load from local storage error:", error);
  }
}
// for testing
export function setupStore(preloadedState: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
// for testing
export type AppStore = ReturnType<typeof setupStore>;
