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
import Task from './components/TaskModel';

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
  const [isAddMode, setIsAddMode] = useState(false);



  const renderItemLoaded = () => {
    let query = firebase.database().ref('TodoList/').orderByKey();
    return query.once('value').then(function (snapshot) {
      // console.log(JSON.stringify(snapshot))
      //snapshot instance of my all data db
      let list = snapshot.val() 

      // Object.keys(list).map(key => {
      //   return {
      //     ...list[key],
      //     firebaseId: key
      //   }
      // })

      // todolst(namedb){
      //   'alex': {
      //     name: 'asd'
      //   },
      //   'jon': {
      //     name: 'asd'
      //   }
      // }
      // ['alex','jon']



    


      //setting an array of weird firedb keys
      setToDoList(Object.keys(list).map(key => ({...list[key], firebaseId: key})))

      // snapshot.forEach(function (firebaseTask) {
      //   const task = new TaskModel();
      //   // console.log(typeof firebaseTask);
      //   // task.taskKey = JSON.stringify(firebaseTask.val().key);
      //   // task.taskDesc = firebaseTask.val().taskDesc ;
      //   // task.taskComplet = Boolean(firebaseTask.val().taskComplet);
      //   // task.id = firebaseTask.val().id
       
        
      //   // setToDoList(task => [...toDoList, { id: task['taskKey'], value:task['taskDesc'], isDone: task['taskComplet'] }]);
      //   setToDoList([...toDoList, { id: task['id'], value:task['taskDesc'], isDone: task['taskComplet'] }])
      // });
    });
  };

  //push model  firedb

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

  const addButtonHandler = async todoTitle => {
   const newTask= {
      taskDesc: todoTitle,
      taskDone: false,
      id: +new Date()
    };
try {
  await firebase.database().ref('TodoList/').push(newTask);
} catch (error) {
  console.log(error);
  return
}

//deep clone object or array or whatever
const cloneList = JSON.parse(JSON.stringify(toDoList))  
cloneList.push(newTask)
setToDoList(cloneList)
    //Add firebase
    // firebase.database().ref('TodoList/').push(
    //   {
    //     taskDesc: todoTitle,
    //     taskDone: false,
    //     id: +new Date()
    //   }).then(() => {
    //     console.log('INSERTED!');
    //   }).catch((error) => {
    //     console.log(error);
    //   }
    //   );
    //   setToDoList(currentTodo => [...toDoList, { id: new Date().getTime().toString(), value: todoTitle, isDone: false }]);
    setIsAddMode(false);

  };

  const removeTaskHandler = async taskId => {

    //change the state to done is true

    //push fire baset
    try {
      
          await firebase.database().ref(`TodoList/${taskId}`).remove();

    } catch (error) {
      console.log(error)
      return
    }
const updatedList = toDoList.filter(task =>{
  return task.firebaseId !== taskId
})

setToDoList(updatedList)

    // //update of the list
    // setToDoList(currentTodo => {
    //   // return currentTodo.forEach()
    //   console.log(taskId);

    //   return currentTodo.filter((task => task.id !== taskId));
    // });
  };

  const cancelTodoHandler=()=>{
    setIsAddMode(false);
  };


  return (
    <View style={styles.screen}>

      <Button title="Add new Task" onPress={() => setIsAddMode(true)} />


      <TodoInput visible={isAddMode} onAddTodo={addButtonHandler} onCancel={cancelTodoHandler} />


      <View style={styles.viewList}>
        <FlatList
          data={toDoList}
          renderItem={(taskData, idx) => <TodoItem key={idx} item={taskData.item}  onDelete={removeTaskHandler} />}
        />

      </View>

      <View style={styles.viewBtnSave}>
        {/* <SaveBtn /> */}
      </View>

      {/* <Button title="Reload" onPress={renderItemLoaded} /> */}
      <Button title={toDoList.length ? 'Refresh':'Load'} onPress={renderItemLoaded} />

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
