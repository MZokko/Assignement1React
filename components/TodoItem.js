import React from 'react';
import{ View, Text, StyleSheet} from 'react-native';

const TodoItem = props =>{
    return(
        <View style={styles.listTodo}>
                <Text >{props.title}</Text>
              </View>
    );
};

const styles = StyleSheet.create({
    listTodo: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
      }
});
export default TodoItem;