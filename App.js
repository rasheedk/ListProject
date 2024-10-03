import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import GistsContainer from './src/containers/GistsContainer';


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <GistsContainer />
    </SafeAreaView>
  );
};

export default App;
