import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';

import { theme } from "./colors";

const STORAGE_KEY = '@toDos'

export default function App() {
  const [working, setWorking] = useState(false);
  const [text, setText] = useState("")
  const [toDos, setToDos] = useState({})

  const travel = () => {
    setWorking(false)
  }

  const work = () => {
    setWorking(true)
  }

  const textChangeHandler = (payload) => {
    setText(payload);
  }

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);

    if(s){
      setToDos(JSON.parse(s));
    }

  }

  const saveTodos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }

  const addTodo = async () => {
    if(text === ''){
      return;
    }

    const newTodos = Object.assign({}, toDos, {[Date.now()]: {text, work: working}});

    setToDos(newTodos)

    await saveTodos(newTodos)

    setText('');
  }

  const deleteToDo =  (id) => {
    Alert.alert("Delete To Do?", "Are you sure?", [{
      text: 'Cancel'
    }, {text: "I'm Sure", onPress : () => {
    const newTodos = {...toDos};

    delete newTodos[id];

    setToDos(newTodos);
    saveTodos(newTodos);

      }}]);


  }

  useEffect(() => {
    loadToDos()
  },[])


  return (
    <View style={styles.container}>
      <StatusBar style="white" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnTxt , color: working ? "white" : theme.grey}} >Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnTxt , color: !working ? "white" : theme.grey}} >Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={working ? "Add a To Do" : "Where do you want to go?"}
          onChangeText={textChangeHandler}
          value={text}
          onSubmitEditing={addTodo}
        />
      </View>
      <ScrollView>
        {Object.entries(toDos).map(([key, value]) =>
          value.work === working ? <View key={key} style={styles.toDo}>
            <Text style={styles.toDoText}>
              {value.text}
            </Text>
            <TouchableOpacity onPress={() => deleteToDo(key)}>
              <Fontisto name="trash" size={24} color="white" />
            </TouchableOpacity>
          </View> : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20
  },
  header : {
    flexDirection: 'row',
    marginTop: 100,
    justifyContent: 'space-between'
  },
  btnTxt : {
    color: 'white',
    fontSize: 30,
    fontWeight: '600'
  },
  input : {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo : {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between"
  },
  toDoText : {
    color: "white",
    fontSize: 16,
    fontWeight: 500
  }
});
