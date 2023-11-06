import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import axios from 'axios';

export default class StartWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          userNow:'',
        };
    }
    handleLogin = () => {
      const { username, password } = this.state;
      axios
      .post(`http://inkamonitor29-001-site1.ftempurl.com/UserAuthorise/Authorize?name=${username}&password=${password}`)
      .then((response) => {
        console.log(response.data);
        let data = "";
        data = response.data;
        if(data.includes("User")){
          const tempMas = data.split(':');
          this.setState({userNow:tempMas[1]});
          this.props.setUserName(tempMas[1]);
          this.props.method();
          axios
        .post(`http://inkamonitor29-001-site1.ftempurl.com/Log/AddNewLog?action=User: ${tempMas[1]} authorized.`)
        .then((response) => {
           
        })
        .catch((error) => {
          console.error(error);
        });
        }
        else if(data.includes("Admin")){
          this.props.adminMethod();
        }
        else{
          Alert.alert("Password or login is not correct");
          this.setState({username:'',password:''});
        }
      })
      .catch((error) => {
        console.error(error);
      });
    };
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Authorization</Text>
                <TextInput
                style={styles.input}
                placeholder="Login"
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                />
            <TouchableOpacity style={styles.button} onPress={this.handleLogin} >
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: 300,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
  });