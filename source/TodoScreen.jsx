import { FlatList, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import QUOTE from './QUOTE';
import DeleteAlert from './DeleteAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Sample Data
const data = [
    {
        id: 1,
        info: "Water the plant"
    },
    {
        id: 2,
        info: "Complete JavaScript tutorial"
    },
    {
        id: 3,
        info: "Buy groceries for the week"
    },
    {
        id: 4,
        info: "Go for a morning run"
    },
    {
        id: 5,
        info: "Read a chapter of a book"
    },
    {
        id: 6,
        info: "Learn CSS professionally"
    },
    {
        id: 7,
        info: "Prepare presentation for Monday"
    },
    {
        id: 8,
        info: "Practice React Native coding"
    },
    {
        id: 9,
        info: "Organize workspace"
    },
    {
        id: 10,
        info: "Call the dentist for an appointment"
    },
    {
        id: 11,
        info: "Finish the project report"
    },
    {
        id: 12,
        info: "Plan the weekend trip"
    },
    {
        id: 13,
        info: "Attend online webinar"
    },
    {
        id: 14,
        info: "Clean the house"
    },
    {
        id: 15,
        info: "Prepare dinner for tonight"
    } 
];


const TodoScreen = () => {

    const [todo, setTodo] = useState("")
    const [todolist, setTodolist] = useState([])
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState("")
    const [deleteItemId, setDeleteItemid] = useState(null)
    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false)

    // Save todos to AsyncLocalStorage
    const saveTodostoStorage = async (todos) => {
        try{
            await AsyncStorage.setItem('todolist',JSON.stringify(todos))
        } catch (e) {
            console.error(e)
        }
    }

    // Load todos from AsyncStorage
    const loadTodosfromStorage = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todolist')
            if(storedTodos != null) {
                setTodolist(JSON.parse(storedTodos))
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadTodosfromStorage()
    },[])
    
    // Add the todos
    const handleAddTask = () => {
        if(todo.trim() === "") return;
        Keyboard.dismiss()
        const newTodos = ([...todolist, {id : Date.now().toString(), info : todo}]);
        setTodolist(newTodos)
        saveTodostoStorage(newTodos)
        setTodo("")
    } 

    //Show delete alert
    const handelDeletePress = (id) => {
        console.log("Delete button pressed, ID:", id);
        setDeleteItemid(id);
        setDeleteAlertVisible(true);
    }
    
    //Confirm Delete
    const handleConfirmDelete = () => {
        console.log("Confirm Delete, ID:", deleteItemId);
        const updatedTodolist = (todolist.filter((todo) => todo.id !== deleteItemId));
        setTodolist(updatedTodolist)
        saveTodostoStorage(updatedTodolist)
        setDeleteAlertVisible(false);
        setDeleteItemid(null);
    }
    
    //Cancel Delete
    const handleCancelDelete = () => {
        console.log("Cancel Delete");
        setDeleteAlertVisible(false);
        setDeleteItemid(null);
    }

    //Edit Todo
    const handleEditTodo = (id, info) => {
        setEditId(id);
        setEditText(info)
    }

    //Save Todo
    const handleSaveTodo = (id) => {
        const updatedTodoList = todolist.map( (item) => 
        item.id === id ? { ...item, info : editText} : item
    );
    setTodolist(updatedTodoList);
    saveTodostoStorage(updatedTodoList)
    setEditId(null)
    setEditText("")
    }

    //Render the todo
    const renderTodos = ({ item }) => {
        return (
            <View style = {styles.dolist}>
                {editId === item.id ? ( //Conditional Rendering if true it means it is being edited
                    <TextInput
                        style={[styles.list, { backgroundColor: "#6c42ff", borderRadius: 5 }]}
                        value={editText}
                        onChangeText={(text) => setEditText(text)}
                    />
                ) : (
                    <Text style={styles.list}>{item.info}</Text>
                )}
                {editId === item.id ? (
                <TouchableOpacity onPress={() => handleSaveTodo(item.id)}>
                    <Image source={require('./assets/saved.png')} style = {styles.icon}/>
                </TouchableOpacity>                ) : (
                    <>
                    <TouchableOpacity onPress={() => handleEditTodo(item.id,item.info)}>
                        <Image source={require('./assets/pen-removebg-preview.png')} style = {styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handelDeletePress(item.id)}>
                        <Image source={require('./assets/del.png')} style = {styles.icon}/>
                    </TouchableOpacity>
                    </>
                )}
            </View>
        )
    }

    return (
        <ScrollView>
            <Text style={styles.h1}>Get the Things Done!</Text>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TextInput 
                    style={styles.InputBorder}
                    placeholder='Add your task'
                    placeholderTextColor='#a3a0a9'
                    value={todo}
                    onChangeText={(usertext) => setTodo(usertext)}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        Keyboard.dismiss(); // Dismiss the keyboard
                        handleAddTask(); // Add the task
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Add</Text>
                    </View>
                </TouchableOpacity>

            </View>
            {/* Render to do list */}
            <FlatList 
                data={todolist} 
                renderItem={renderTodos} 
                keyExtractor={item => item.id}
            />
            {todolist.length <= 0 && <QUOTE/>}
            <DeleteAlert
            visible={deleteAlertVisible}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
      />
        </ScrollView>        
    )
}

const styles = StyleSheet.create({
    InputBorder: {
        borderWidth: 2,
        borderColor: '#6A4CFF',  
        marginHorizontal: 10,
        marginTop: 15,
        padding: 18,
        borderRadius: 25,  
        width: '70%',
        fontSize: 20,
        height: 60,
        color: '#000',
        backgroundColor: '#f7f7f7',  
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,  
        shadowRadius: 10,
        elevation: 3,  
        paddingLeft: 20,  
        fontFamily: 'Montserrat-Regular',  
        letterSpacing: 1,  
    },
    
    btn: {
        borderWidth: 2,
        borderColor: '#6A4CFF',  
        height: 60,
        width: '22%',  
        borderRadius: 30,
        marginTop: 15,
        backgroundColor: '#8758ff',  
        justifyContent: 'center', 
        alignItems: 'center',  
        shadowColor: '#000',  
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,  
        shadowRadius: 10,
        elevation: 5, 
        paddingHorizontal: 10, 
        backgroundColor: '#6A4CFF',  
    }
    ,
    h1: {
        marginTop: 20,
        marginBottom: 30,
        color: '#000',  
        fontFamily: 'Lobster-Regular', 
        fontSize: 28,  
        textAlign: 'center',
        letterSpacing: 2,  
        textTransform: 'uppercase',  
        textShadowColor: 'rgba(0, 0, 0, 0.25)',  
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3, 
    },
    
    todoItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todoText: {
        fontSize: 18,
    },
    dolist: {
        backgroundColor: '#6A4CFF',  
        marginHorizontal: 15,
        marginVertical: 9,
        borderRadius: 15,  
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,  
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,  
        shadowRadius: 15,  
        elevation: 10,  
        borderWidth: 1,  
        borderColor: '#ffffff50',  
    }
    ,
    list : {
        fontSize : 24,
        fontWeight : 'bold',
        padding : 10,
        paddingVertical : 12,
        color : '#fff',
        flex : 1,
    },
    icon: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
      },

});

export default TodoScreen;
