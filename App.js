import { StatusBar } from 'expo-status-bar';
import {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { theme } from "./colors";

export default function App() {
  const [working, setWorking] = useState(false);
  const [text, setText] = useState("")

  const travel = () => {
    setWorking(false)
  }

  const work = () => {
    setWorking(true)
  }

  const textChangeHandler = (payload) => {
    setText(payload);
  }

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
        <TextInput style={styles.input} placeholder={working ? "Add a To Do" : "Where do you want to go?"} onChangeText={textChangeHandler} value={text}/>
      </View>
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
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 18
  }
});
