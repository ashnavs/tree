
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../Features/User/authSlice';
import adminReducer from '../Features/Admin/adminSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const adminPersistConfig = {
  key: 'admin',
  storage,
}; 

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);


const store = configureStore({
  reducer: {
    auth: persistedReducer,
    admin:persistedAdminReducer
  },
});


const persistor = persistStore(store);

export { store, persistor };

