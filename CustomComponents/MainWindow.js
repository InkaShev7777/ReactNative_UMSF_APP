import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartWindow from './StartWindow';
import React, { useState } from 'react';
import UserWindow from './UserWindow';
import AdminComponent from './Admin/AdminComponent';
import axios from 'axios';

export default class MainWindow extends React.Component{
    constructor(props){
      super(props);
      this.state={isUser:false,isAdmin:false,userName:'',role:''}
    }
    setIsUser = () =>{
      this.setState({isUser : !this.state.isUser});
      this.newLog("User: " + this.state.userName + " left the application.");
    }
    setUserRole = (role) =>{
      this.setState({role:role});
    }
    setUserName = (username) =>{
      axios
        .get(`http://inkamonitor29-001-site1.ftempurl.com/Admin/GetRole?username=${username}`)
        .then((response) => {
          this.setState({userName:username,role:response.data});
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsAdmin = () =>{
      this.setState({isAdmin : !this.state.isAdmin});
    }

    newLog = (action) => {
      axios
        .post(`http://inkamonitor29-001-site1.ftempurl.com/Log/AddNewLog?action=${action}`)
        .then((response) => {
           
        })
        .catch((error) => {
          console.error(error);
        });
    }


    render(){
      return(
        <View style={styles.container}>
          {this.state.isUser ? (<UserWindow setRole={this.setUserRole} role={this.state.role} username={this.state.userName} method={this.setIsUser}/>): this.state.isAdmin ? (<AdminComponent method={this.setIsAdmin}/>) : <StartWindow setUserName={this.setUserName} method={this.setIsUser} adminMethod={this.setIsAdmin}/>}
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });