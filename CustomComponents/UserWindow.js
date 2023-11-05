import React from "react";
import { View,Text,TextInput,Button,StyleSheet,TouchableOpacity } from "react-native";
import axios from 'axios';

export default class UserWindow extends React.Component{
    constructor(props){
        super(props);
        this.state={
          input:'',
          close:'',
          out:'',
        }
    }
    decriptionFN = () => {
      const {input} = this.state;
      axios
      .post(`http://inkamonitor29-001-site1.ftempurl.com/Encryption/Encrypt?input=${input}`)
      .then((response) => {
        axios
        .get(`http://inkamonitor29-001-site1.ftempurl.com/Encryption/GetCloseData`)
        .then((response) => {
          this.setState({close:response.data});
        })
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    };
    encryptionFN = () => {
      axios
      .post(`http://inkamonitor29-001-site1.ftempurl.com/Encryption/Decrypt`)
      .then((response) => {
        axios
          .get(`http://inkamonitor29-001-site1.ftempurl.com/Encryption/GetOutData`)
          .then((response) => {
            this.setState({out:response.data});
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
    };
    render(){
        return(
        <View style={styles.container}>
          <Text style={styles.mainText}>Encryption</Text>
            <TextInput
            style={styles.input}
            placeholder="Input text"
            onChangeText={(text) => this.setState({ input: text })}
            value={this.state.input}
            />
            <View style={styles.outputContainer}>
            <TextInput
            style={styles.input}
            placeholder="Close text"
            editable={false}
            value={this.state.close}
            />
            <TextInput
            style={styles.input}
            placeholder="Out text"
            editable={false}
            value={this.state.out}
            />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button1} onPress={this.encryptionFN} >
                <Text style={styles.buttonText}>Encryption</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={this.decriptionFN} >
                <Text style={styles.buttonText}>Decryption</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.props.method} >
                <Text style={styles.buttonText}>Exit</Text>
              </TouchableOpacity>
            </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:'20%',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 400,
      marginBottom: 30,
      padding: 10,
    },
    outputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    outputText: {
      fontSize: 16,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    button: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      width:100
    },
    button1: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      width:100
    },
    button2: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      width:100
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    mainText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });