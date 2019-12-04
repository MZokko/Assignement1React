import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';
import firebase from 'firebase';

const TodoInput = props => {

  const [toDoEntered, setToDoEntered] = useState('');

  const todoInputHandler = (txtEntered) => {
    setToDoEntered(txtEntered);
  };

  const addTodoHandler = ()=>{
    props.onAddTodo(toDoEntered);
    setToDoEntered('');

  };

  return (
    <Modal visible = {props.visible } animationType="slide"> 
      <View style={styles.viewInput}>
        <TextInput
          onChangeText={todoInputHandler}
          placeholder="To do"
          style={styles.toDoTextInput}
          value={toDoEntered}
        />

        <Button title="ADD" onPress={addTodoHandler} />
        <Button title="Cancel" color="red" onPress={props.onCancel}/>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  viewInput: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  toDoTextInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom:10,
  },

});

export default TodoInput;