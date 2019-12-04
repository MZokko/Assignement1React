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

import { AppLoading } from 'expo';
import firebase from 'firebase';

import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import SaveBtn from './components/SaveBtn';
import TaskModel from './components/TaskModel';

//fire base implementation
const firebaseConfig = {
  apiKey: "AIzaSyByrm7nLXnbu0FtCOSmhHdp9XnkEKKNflY",
  authDomain: "react-to-do-48b30.firebaseapp.com",
  databaseURL: "https://react-to-do-48b30.firebaseio.com",
  projectId: "react-to-do-48b30",
  storageBucket: "react-to-do-48b30.appspot.com",
  messagingSenderId: "378803227143",
  appId: "1:378803227143:web:80b5967f83d76c29da78a2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {



  const [toDoList, setToDoList] = useState([]);

  const renderItem = () => {
    let query = firebase.database().ref('TodoList/').orderByKey();
    return query.once('value').then(function (snapshot) {
      snapshot.forEach(function (firebaseTask) {
        const task = new TaskModel();

        task.taskId = firebaseTask.key;
        task.taskDesc = firebaseTask.val().taskDesc;
        task.taskComplet = firebaseTask.val().taskComplet;
        console.log(task);
      });
    });
  };

  //commment to stop querying firebase

  // firebase.database().ref('TodoList/').push(
  //   {
  //     taskDesc: 'justy a try000',
  //     taskDone: 'False'

  //   }).then(() => {
  //     console.log('INSERTED!');
  //   }).catch((error) => {
  //     console.log(error);
  //   }
  //   );

  const addButtonHandler = todoTitle => {
    setToDoList(currentTodo => [...toDoList, { id: new Date().getTime().toString(), value: todoTitle, isDone: false, }]);
    //list object set other value such as"done bool""

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

      <View style={styles.viewBtnSave}>
        <SaveBtn />
      </View> 
       {renderItem}

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
  },

  viewBtnSave: {
    position: 'absolute',
    bottom: 0,

  }
});
