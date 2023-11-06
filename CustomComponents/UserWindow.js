import React from "react";
import { View,Text,TextInput,Button,StyleSheet,TouchableOpacity,Modal } from "react-native";
import axios from 'axios';

export default class UserWindow extends React.Component{
    constructor(props){
        super(props);
        this.state={
          input:'',
          close:'',
          out:'',
          answer:'',
          showModal:false,
          questions:[],
          randomQuestion:'',
          randomAnswer:'',
          isGetAnswer:true,
          username:'',
          userrole:'',
          eBTN:true,
          dBTN:true,
        }
    }
    //
    //  for modal window -> questions
    //
    componentDidMount() {
     this.checkRole(this.props.role);
      this.setState({username:this.props.username,userrole:this.props.role});
      axios
        .get(`http://inkamonitor29-001-site1.ftempurl.com/Questions/GetAllGuestions`)
        .then((response) => {
           const mas = [];
            for(let i =0;i<response.data.length;i++){
                const obj = {id:i,question:response.data[i]['questiontext'],answer:response.data[i]['answer']};
               mas.push(obj);
            }
            this.setState({questions:mas});
        })
        .catch((error) => {
          console.error(error);
        });
        if(this.state.userrole !== "K"){
          this.newInterval();
        }
    }

    checkRole = (role)=>{
      if(role === "R"){
        this.setState({dBTN:false});
      }
      else if(role === "K"){
        this.setState({dBTN:false,eBTN:false});
        this.componentWillUnmount();
      }
    }


    componentWillUnmount() {
      clearInterval(this.interval);
    }


    getRoleNow = () =>{
      axios
        .get(`http://inkamonitor29-001-site1.ftempurl.com/Admin/GetRole?username=${this.state.username}`)
        .then((response) => {
          this.setState({userrole:response.data});
        })
        .catch((error) => {
          console.error(error);
        });
    }


    newInterval = () =>{
      this.interval = setInterval(() => {
        this.setState({ showModal: true });
        //
        //  random questions
        //
        if(this.state.isGetAnswer === true){
          const randomIndex = Math.floor(Math.random() * this.state.questions.length);
          this.setState({randomQuestion:this.state.questions[randomIndex]['question'],randomAnswer:this.state.questions[randomIndex]['answer'],isGetAnswer:false})
        }
      }, 15000); // Open the modal every 15 seconds
    }


    toggleModal = () => {
      if(this.state.answer === this.state.randomAnswer){
        this.setState((prevState) => ({
          showModal: !prevState.showModal,
          answer:0,
          isGetAnswer:true,
        }));
        this.componentWillUnmount();
        if(this.state.userrole !== "K"){
          this.newInterval();
        }
        this.newLog("User: " + this.state.username + " answered the question correctly.");
      }
      else{
        //
        //  remove role from user (new method)
        //
        axios
      .post(`http://inkamonitor29-001-site1.ftempurl.com/Admin/LowRole?username=${this.state.username}`)
      .then((response) => {
        axios
        .get(`http://inkamonitor29-001-site1.ftempurl.com/Admin/GetRole?username=${this.state.username}`)
        .then((response) => {
          this.setState({userrole:response.data});
          this.checkRole(response.data);
          this.props.setRole(response.data);
          this.newLog("User: " + this.state.username + " answered the question incorrectly.");
        })
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
      }
    };


    decriptionFN = () => {
      const {input} = this.state;
      axios
      .post(`http://inkamonitor29-001-site1.ftempurl.com/Encryption/Encrypt?input=${input}`)
      .then((response) => {
        axios
        .get(`http://inkamonitor29-001-site1.ftempurl.com/Encryption/GetCloseData`)
        .then((response) => {
          this.setState({close:response.data});
          this.newLog("User: " + this.state.username + " completed decryption.");
        })
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    };

    newLog = (action) => {
      axios
        .post(`http://inkamonitor29-001-site1.ftempurl.com/Log/AddNewLog?action=${action}`)
        .then((response) => {
           
        })
        .catch((error) => {
          console.error(error);
        });
    }

    encryptionFN = () => {
      axios
      .post(`http://inkamonitor29-001-site1.ftempurl.com/Encryption/Decrypt`)
      .then((response) => {
        axios
          .get(`http://inkamonitor29-001-site1.ftempurl.com/Encryption/GetOutData`)
          .then((response) => {
            this.setState({out:response.data});
            this.newLog("User: " + this.state.username + " completed encryption.");
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
              <TouchableOpacity style={[styles.button1,!this.state.eBTN && styles.disabledButton] } disabled={!this.state.eBTN } onPress={this.encryptionFN} >
                <Text style={styles.buttonText}>Encryption</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button2,!this.state.dBTN && styles.disabledButton] } disabled={!this.state.dBTN } onPress={this.decriptionFN} >
                <Text style={styles.buttonText}>Decryption</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.props.method} >
                <Text style={styles.buttonText}>Exit</Text>
              </TouchableOpacity>
            </View>
            <Modal visible={this.state.showModal} animationType="slide">
              <View style={styles.modalContainer}>
                <Text style={styles.mainText}>Question</Text>
                <Text style={styles.questionText}>{this.state.randomQuestion}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Answer"
                  value={this.state.answer}
                onChangeText={(text) => this.setState({ answer: text })}
              />
              <TouchableOpacity style={styles.button3}  onPress={this.toggleModal}>
                <Text>Submit</Text>
              </TouchableOpacity>
          </View>
        </Modal>
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
      borderRadius:10
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
    button3: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      width:100,
      justifyContent:'center',
      alignItems:'center',
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    questionText: {
      fontSize: 18,
      marginBottom: 20,
    },
    disabledButton: {
    opacity: 0.2,
  },
  });