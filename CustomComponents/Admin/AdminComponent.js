import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet,TouchableOpacity,Modal } from 'react-native';
import axios from 'axios';



class AdminComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:[],
            selectName:'',
            selectRole:'',
            showModal: false,
        }
    }
    toggleModal = () => {
        this.setState((prevState) => ({
          showModal: !prevState.showModal,
        }));
      };
    componentDidMount() {
        axios
        .get(`http://inkamonitor29-001-site1.ftempurl.com/Admin/GetAllListUsers`)
        .then((response) => {
           const mas = [];
            for(let i =0;i<response.data.length;i++){
                console.log(response.data[i]['userName']);
                const obj = {id:i,name:response.data[i]['userName'],role:response.data[i]['role']};
               mas.push(obj);
            }
            this.setState({users:mas});
        })
        .catch((error) => {
          console.error(error);
        });
      }
  handleDeleteUser = (userName) => {
    // Реализуйте логику удаления пользователя с заданным идентификатором userId
    console.log(`Удален пользователь с UserName: ${userName}`);
  };
  handleUpdateUser = (userName,role) => {
    this.setState({selectName:userName,selectRole:role});
    console.log(`Update пользователь с UserName: ${userName}`);
    this.toggleModal();
  };

  renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userPassword}>{item.role}</Text>
      <TouchableOpacity style={styles.button}  >
        <Text onPress={()=>{this.handleDeleteUser(item.name)}} style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}  >
            <Text onPress={()=>{this.handleUpdateUser(item.name,item.role)}} style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftButton} >
            <Text onPress={this.props.method} style={{fontSize:30}}>{"<-"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>List Users</Text>
          <TouchableOpacity style={styles.rightButton}>
            <Text  style={{fontSize:30,color:'green'}}>+</Text>
          </TouchableOpacity>
        </View>
      
        <FlatList
          data={this.state.users}
          renderItem={this.renderUser}
          keyExtractor={(item) => item.id.toString()}
          style={{width:400}}
        />
        <Modal visible={this.state.showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.mainTitle}>Update User</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Role"
              value={this.state.selectRole}
              onChangeText={(text) => this.setState({ role: text })}
            />
            <View style={styles.flexButton}>
            <TouchableOpacity style={styles.button2} onPress={this.handleUpdateUser}>
              <Text>Update User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={this.toggleModal}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
            </View>
           
          </View>
        </Modal>
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
    marginTop:50,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userName: {
    width: 100,
  },
  userPassword: {
    width: 100,
  },
  picker: {
    height: 20,
    width: 250,
  },
  mainTitle:{
    fontSize:26,
    fontWeight: 'bold',
    marginBottom:20
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width:70
  },
  button1: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    width:70
  },
  button2: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width:120,
    margin:10
  },
  button3: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width:120,
    margin:10
  },
  flexButton:{
    justifyContent:'center',
    display:'flex',
    flexWrap:'wrap',
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    // paddingTop: 40,
    paddingBottom:20
  },
  headerText: {
    fontSize: 20,
  },
  leftButton: {
    marginRight: 'auto',
   
  },
  rightButton: {
    marginLeft: 'auto',
  },
});

export default AdminComponent;
