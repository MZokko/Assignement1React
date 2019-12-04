import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native';

import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';

export default function App() {

  const [toDoList, setToDoList] = useState([]);



  const addButtonHandler = todoTitle => {
    setToDoList(currentTodo => [...toDoList, { id: new Date().getTime().toString(), value: todoTitle, isDone: false, }]);//list object set other value such as"done bool""

  };

  const [outputText, setOutputText] = useState('Open up App.js to start working on your app!');
  return (
    <View style={styles.screen}>
      <View>
        <Text>{outputText}</Text>
        <Button title="change text" onPress={() => setOutputText('text changed')} />
      </View>


      <TodoInput onAddTodo={addButtonHandler} />


      <View style={styles.viewList}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={toDoList}
          renderItem={taskData => <TodoItem title={taskData.item.value} />}
        />
      </View>




    </View>


  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },

  viewList: {
    margin: 20,
    alignItems: "center",
    shadowColor: 'black',
    backgroundColor: 'white',
    //ios shadoe property
    shadowOffset: { width: 0, hight: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    //android shadow property
    elevation: 5,
  }
});
