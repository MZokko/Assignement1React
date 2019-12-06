import React, { useState } from 'react';
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
    const [strikethrough, setStrikethrough] = useState(props.isDone);
    let { id, taskDesc, taskDone, firebaseId } = props.item;
    //     console.log(' >>>>>>>>>>>>>')
    // console.log(props.item)
    const handleUpdate = async () => {
        //firebase update func

        // dynamic path for the db
        let task = firebase.database().ref(`TodoList/${firebaseId}`);//`` allow to insert variable without the ++  > ${nameVar}
        try {
            await task.child('taskDone').set(!strikethrough);//await must be in try catch
            setStrikethrough(!strikethrough);
        } catch (e) {
            console.log(e);
            return;
        }

    }
    return (
        <TouchableOpacity onPress={props.onDelete.bind(this, firebaseId)}>
            <View style={styles.listTodo}>
                {/* if strikethrough  is true : false*/}
                <Text style={strikethrough ? styles.textCrossed : styles.textUncrossed}>{taskDesc}</Text>
                <Button title="D" onPress={() => handleUpdate()} />
            </View >
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnItem: {
        marginRight: 0,
    },

    textCrossed: {
        textDecorationLine: 'line-through'
    },
    textUncrossed: {
        textDecorationLine: 'none'
    },

    listTodo: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        flex: 1,

    }
});
export default TodoItem;