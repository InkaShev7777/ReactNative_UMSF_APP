import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartWindow from './StartWindow';
import React, { useState } from 'react';
import UserWindow from './UserWindow';
import AdminComponent from './Admin/AdminComponent';
export default class MainWindow extends React.Component{
    constructor(props){
      super(props);
      this.state={isUser:false,isAdmin:false}
    }
    setIsUser = () =>{
      this.setState({isUser : !this.state.isUser});
    }
    setIsAdmin = () =>{
      this.setState({isAdmin : !this.state.isAdmin});
    }
    render(){
      return(
        <View style={styles.container}>
          {this.state.isUser ? (<UserWindow method={this.setIsUser}/>): this.state.isAdmin ? (<AdminComponent method={this.setIsAdmin}/>) : <StartWindow method={this.setIsUser} adminMethod={this.setIsAdmin}/>}
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