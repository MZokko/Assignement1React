import React , { useState } from 'react';
import { View , TextInput , Button , StyleSheet} from 'react-native';

const TodoInput = props =>{

    const [toDoEntered, setToDoEntered] = useState('');

    const todoInputHandler = (txtEntered) => {
        setToDoEntered(txtEntered);
      };
    
    return (
        <View style={styles.viewInput}>
        <TextInput
          onChangeText={todoInputHandler}
          placeholder="To do"
          style={styles.toDoTextInput}
          value={toDoEntered}
        />
        {/* strait push to firebase */}
        <Button title="ADD" onPress={props.onAddTodo.bind(this , toDoEntered)} />
        
      </View>
    );
};

const styles = StyleSheet.create({

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

});

export default TodoInput;