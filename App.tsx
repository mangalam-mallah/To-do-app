import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import TodoScreen from './source/TodoScreen';


function App(): React.JSX.Element {

  return (
          <SafeAreaView style = {{flex : 1, backgroundColor : '#fff'}}>
            <View>
              <TodoScreen/>
            </View>
          </SafeAreaView>
  );
}


export default App;
