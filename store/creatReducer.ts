import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "@redux-devtools/extension";
import storage from "./storage";

// Import root saga
import { rootSaga } from "../store/saga/index";

// Create Saga middleware
const sagaMiddleware = createSagaMiddleware();
// Import reducers
import authReducer from "./reducers/auth";
import earningsStatisticsReducer from "./reducers/earningsStatistics";
import selectCard from "./reducers/selectCard";
import autocompleteReducer from "./reducers/setAdreses";
import orderReducer from "./reducers/orderReducers";
import reducerNotify from "./reducers/notify";
import paymentReducer from "./reducers/payment";

// Persist configuration
const persistConfig = {
  key: "root",
  storage: storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  earningsStatistics: earningsStatisticsReducer,
  selectedCard: selectCard,
  address: autocompleteReducer,
  order: orderReducer,
  notify: reducerNotify,
  payment: paymentReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Compose middleware
const composeEnhancers = composeWithDevTools({
  // Optional: Add Redux DevTools extension options
  // trace: true,
  // traceLimit: 25
});

// Create store with middleware and devtools
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

// Create persistor
const persistor = persistStore(store);

// Run root saga
sagaMiddleware.run(rootSaga);

export { store, persistor };

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
