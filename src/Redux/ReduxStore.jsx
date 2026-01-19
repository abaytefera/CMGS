import { configureStore,combineReducers } from "@reduxjs/toolkit";
import webState from "./WebState.jsx"
import { persistStore,persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from "redux-persist";
import storage from 'redux-persist/lib/storage';


const rootReducer=combineReducers({
    'webState':webState
})
const persisConfig= {key:'root',storage: storage.default ? storage.default : storage,whitelist:['webState']};
const presisReducer=persistReducer(persisConfig,rootReducer)

export const store=configureStore({
  
  reducer:presisReducer,
 
  
  
  middleware:(getDefaultMiddleware)=>{
 
   return getDefaultMiddleware({serializableCheck:false,
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
   }).concat();

  }
})
export const persistor=persistStore(store);