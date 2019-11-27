import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList} from 'react-native';

export default function App() {
  const [toDoEntered, setToDoEntered] = useState('');
  const [toDoList, setToDoList] = useState([]);


  const todoInputHandler = (txtEntered) => {
    setToDoEntered(txtEntered);
  };

  const addButtonHandler = () => {
    setToDoList(currentTodo => [...toDoList, {id :new Date().getTime(), value:toDoEntered, isDone :false,}]);//list object set other value such as"done bool""
    
  };

  const [outputText, setOutputText] = useState('Open up App.js to start working on your app!');
  return (
    <View style={styles.screen}>
      <View>
        <Text>{outputText}</Text>
        <Button title="change text" onPress={() => setOutputText('text changed')} />
      </View>
      <View style={styles.viewInput}>
        <TextInput
          onChangeText={todoInputHandler}
          placeholder="To do"
          style={styles.toDoTextInput}
          value={toDoEntered}
        />
        <Button title="ADD" onPress={addButtonHandler} />
      </View>

      <FlatList
        keyExtractor = {(item, index)=>item.id}
        data={toDoList}
        renderItem={taskData => (
          <View >
            {toDoList.map((task) =>
              <View style={styles.listTodo}>
                <Text >{taskData.item.value}</Text>
              </View>)}
          </View>
        )} />


    </View>


  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },

  viewInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  toDoTextInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: 200,
  },

  listTodo: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }


});
