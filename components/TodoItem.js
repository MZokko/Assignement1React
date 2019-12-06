import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import firebase from 'firebase';

// //fire base implementation
// const firebaseConfig = {
//     apiKey: "AIzaSyByrm7nLXnbu0FtCOSmhHdp9XnkEKKNflY",
//     authDomain: "react-to-do-48b30.firebaseapp.com",
//     databaseURL: "https://react-to-do-48b30.firebaseio.com",
//     projectId: "react-to-do-48b30",
//     storageBucket: "react-to-do-48b30.appspot.com",
//     messagingSenderId: "378803227143",
//     appId: "1:378803227143:web:80b5967f83d76c29da78a2"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);



const TodoItem = props => {
    return (
        <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
            <View style={styles.listTodo}>
                <Text >{props.title}</Text>
                 {/* <Button title="Done" /> */}
            </View >
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    listTodo: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row'
    }
});
export default TodoItem;