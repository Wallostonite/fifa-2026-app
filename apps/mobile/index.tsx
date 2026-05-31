import 'react-native-url-polyfill/auto';
import './src/__create/polyfills';
global.Buffer = require('buffer').Buffer;

import '@expo/metro-runtime';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import { AppRegistry, LogBox } from 'react-native';
import { DeviceErrorBoundaryWrapper } from './__create/DeviceErrorBoundary';
import App from './entrypoint';

if (__DEV__) {
  LogBox.ignoreAllLogs();
  LogBox.uninstall();
  AppRegistry.setWrapperComponentProvider(() => ({ children }) => {
    return <DeviceErrorBoundaryWrapper>{children}</DeviceErrorBoundaryWrapper>;
  });
}
renderRootComponent(App);
