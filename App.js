import { StatusBar } from 'expo-status-bar';
import Navigator from './src/Navigation/navigator';
import { Provider } from 'react-redux';
import { store } from './src/store/index';
import { init } from './src/config/dbSqlite';
import { useEffect } from 'react';

export default function App() {

 init()

  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar style='light' backgroundColor='#007bff' />
    </Provider>
  );
}