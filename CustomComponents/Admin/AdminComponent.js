import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet,TouchableOpacity,Modal,Alert } from 'react-native';
import axios from 'axios';
import {Dropdown} from 'react-native-element-dropdown';


class AdminComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:[],
            selectName:'',
            selectRole:'',
            showModal: false,
            showModalAddUser:false,
            userName:'',
            password:'',
            role:'',
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
    axios
    .post(`http://inkamonitor29-001-site1.ftempurl.com/Admin/DeleteUser?username=${userName}`)
    .then((response) => {
      this.componentDidMount();
      Alert.alert("Success deleting");
    })
    .catch((error) => {
      console.error(error);
    });
  };
  handleUpdateUser = (userName,role) => {
    this.setState({selectName:userName,selectRole:role});
    this.toggleModal();
  };
  updateUserData = () =>{
    axios
    .post(`http://inkamonitor29-001-site1.ftempurl.com/Admin/UpdateUser?username=${this.state.selectName}&newRole=${this.state.selectRole}`)
    .then((response) => {
      this.componentDidMount();
      this.setState({showModal:false});
      Alert.alert("Success updating");
    })
    .catch((error) => {
      console.error(error);
    });
  }

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

  addNewUser = () =>{
    axios
    .post(`http://inkamonitor29-001-site1.ftempurl.com/RegistarteNewUser/RegistrateUser?username=${this.state.userName}&password=${this.state.password}&role=${this.state.role}`)
    .then((response) => {
      this.componentDidMount();
      this.setState({showModalAddUser:!this.state.showModalAddUser});
      Alert.alert("Success adding new user");
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftButton} >
            <Text onPress={this.props.method} style={{fontSize:30}}>{"<-"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>List Users</Text>
          <TouchableOpacity style={styles.rightButton}>
            <Text onPress={()=>{this.setState({showModalAddUser:!this.state.showModalAddUser})}}  style={{fontSize:30,color:'green'}}>+</Text>
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
              onChangeText={(text) => this.setState({ selectRole: text })}
            />
            <View style={styles.flexButton}>
            <TouchableOpacity style={styles.button2} onPress={this.updateUserData}>
              <Text>Update User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={this.toggleModal}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={this.state.showModalAddUser} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.mainTitle}>Add new user</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              value={this.state.userName}
              onChangeText={(text) => this.setState({ userName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Role"
              value={this.state.role}
              onChangeText={(text) => this.setState({ role: text })}
            />
            <TouchableOpacity style={styles.button2} onPress={this.addNewUser}>
              <Text>Add User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={()=>{this.setState({showModalAddUser:false})}}>
              <Text>Close Modal</Text>
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
    borderRadius:10
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
  },dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AdminComponent;
