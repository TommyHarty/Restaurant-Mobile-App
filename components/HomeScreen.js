import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, AsyncStorage, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Fonts } from '../src/utils/Fonts';
import DismissKeyboard from 'dismissKeyboard';

export default class HomeScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            firstLaunch: null,
            name: '',
            email:'',
            app_id:2,
        }
    }

    handleName = (name) => {
        this.setState({name: name});
    }

    handleEmail = (email) => {
        this.setState({email: email});
    }

    handlePassword = (password) => {
        this.setState({password: password});
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        return fetch('https://uppfeed.co.uk/api/2/business-information')
        .then((response) => response.json())
        .then((data) => {
            this.setState({data: data});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount(){
        AsyncStorage.getItem("alreadyLaunched").then(value => {
            if(value == null){
                this.setState({firstLaunch: 'true'});
            }
            else{
                this.setState({firstLaunch: 'false'});
            }});
    }

    sendData = () => {
        fetch('https://uppfeed.co.uk/customer-subscription', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_name: this.state.name,
                customer_email: this.state.email,
                app_id: 2,
            })
        })
        .then((response) =>{
            console.log(response);
            AsyncStorage.setItem('alreadyLaunched', 'true');
            this.setState({firstLaunch: 'false'});
        })
        .catch((error)=>{
            console.error(error);
        })
        .done();
    }

    render(){
        const { navigate } = this.props.navigation;
         if(this.state.firstLaunch === null){
             return null;
         } else if (this.state.firstLaunch == 'true') {
             return (
               <View style={styles.container}>
                   <StatusBar barStyle="light-content" />
                   <View style={styles.introwrap}>
                       <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
                           <Image style={{ flex: 1, resizeMode: Image.resizeMode.cover }}
                             source={{ uri: 'https://uppfeed.co.uk/uploads/' + this.state.data.business_photo }}
                           />
                       </View>
                       <TouchableWithoutFeedback onPress={()=>{DismissKeyboard()}}>
                           <View style={{ flex: 1,  justifyContent:'center', backgroundColor:'rgba(0,0,0,0.7)' }}>
                               <KeyboardAvoidingView
                                   keyboardVerticalOffset={5} behavior={"position"}>
                                <View style={{ alignItems:'center', }}>
                                    <Text style={styles.title}>
                                        {this.state.data.business_name}
                                    </Text>
                                </View>
                                    <View style={{ flexDirection:'row' }}>
                                        <TextInput
                                            style={styles.textinput}
                                            placeholder="Full Name"
                                            placeholderTextColor={'#999'}
                                            onChangeText={this.handleName}
                                            value={this.state.name}
                                        />
                                    </View>
                                    <View style={{ flexDirection:'row' }}>
                                        <TextInput
                                            style={styles.textinput}
                                            placeholder="Email Address"
                                            placeholderTextColor={'#999'}
                                            onChangeText={this.handleEmail}
                                            value={this.state.email}
                                        />
                                    </View>
                                    <TouchableOpacity activeOpacity={0.7} style={styles.buttoncontainer} onPress={this.sendData}>
                                        <Text style={styles.buttontext}>Register</Text>
                                    </TouchableOpacity>
                                </KeyboardAvoidingView>
                           </View>
                      </TouchableWithoutFeedback>
                    </View>
                </View>
             )
         } else {
             return (
                 <View style={styles.container}>
                     <StatusBar barStyle="light-content" />
                     <View style={styles.introwrap}>
                         <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
                             <Image style={{ flex: 1, resizeMode: Image.resizeMode.cover }}
                               source={{ uri: 'https://uppfeed.co.uk/uploads/' + this.state.data.business_photo }}
                             />
                         </View>
                         <View style={{ flex: 1,
                           backgroundColor: 'rgba(0,0,0,0.7)',
                           justifyContent: 'center',
                           flexDirection: 'column',}}>
                             <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                 {/* <Image style={{ width:199, height:44, marginBottom:30 }}
                                   source={ require('../assets/images/logo-white.png') }
                                 /> */}
                             </View>
                             <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', }}>
                                 <Text style={styles.title}>
                                     {this.state.data.business_name}
                                 </Text>
                                 <Text style={styles.tagline}>
                                     {this.state.data.business_tagline}
                                 </Text>
                                 <TouchableOpacity style={styles.buttoncontainer} activeOpacity={0.7} onPress={ () => navigate('Enquiry') }>
                                     <Text style={styles.buttontext}>Make Reservation</Text>
                                 </TouchableOpacity>
                             </View>
                             <View style={styles.navwrap}>
                                 <TouchableOpacity activeOpacity={0.7} style={styles.navitemwrap} onPress={ () => navigate('Menus') }>
                                     <Text style={styles.icon}>&#xf0f5;</Text>
                                     <Text style={styles.navitem}>
                                         Menus
                                     </Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity activeOpacity={0.7} style={styles.navitemwrap2nd} onPress={ () => navigate('Reviews') }>
                                     <Text style={styles.icon}>&#xf123;</Text>
                                     <Text style={styles.navitem}>
                                         Reviews
                                     </Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={styles.navitemwrap} activeOpacity={0.7} onPress={ () => navigate('Offers') }>
                                     <Text style={styles.icon}>&#xf145;</Text>
                                     <Text style={styles.navitem}>
                                         Offers
                                     </Text>
                                 </TouchableOpacity>
                             </View>
                             <View style={styles.navwrap}>
                                 <TouchableOpacity style={styles.navitemwrap} activeOpacity={0.7} onPress={ () => navigate('Events') }>
                                     <Text style={styles.icon}>&#xf073;</Text>
                                     <Text style={styles.navitem}>
                                         Events
                                     </Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={styles.navitemwrap2nd} activeOpacity={0.7} onPress={ () => navigate('Galleries') }>
                                     <Text style={styles.icon}>&#xf030;</Text>
                                     <Text style={styles.navitem}>
                                         Photos
                                     </Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={styles.navitemwrap} activeOpacity={0.7} onPress={ () => navigate('About') }>
                                     <Text style={styles.icon}>&#xf05a;</Text>
                                     <Text style={styles.navitem}>
                                         About
                                     </Text>
                                 </TouchableOpacity>
                             </View>
                         </View>
                     </View>
                 </View>
             );
         }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#eb4b3b',
    },
    introwrap: {
        flex:6,
        justifyContent:'center',
    },
    title: {
        fontSize:35,
        textAlign:'left',
        color:'#eb4b3b',
        fontWeight:'bold',
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:10,
        fontFamily: Fonts.Ubuntu,
    },
    tagline: {
        fontSize:15,
        textAlign:'center',
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:10,
        fontFamily: Fonts.Ubuntu,
        color:'white',
        lineHeight:20,
        fontWeight:'bold',
    },
    phone: {
        fontSize:15,
        textAlign:'left',
        paddingLeft:30,
        paddingRight:30,
        fontFamily: Fonts.Ubuntu,
        color:'white',
    },
    navwrap: {
        flex:1,
        flexDirection:'row',
        borderTopWidth:1,
        borderTopColor:'rgba(255,255,255,0.1)',
    },
    navitemwrap: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    navitemwrap2nd: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:1,
        borderLeftWidth:1,
        borderRightColor:'rgba(255,255,255,0.1)',
        borderLeftColor:'rgba(255,255,255,0.1)',
    },
    navitem: {
        fontSize:15,
        color:'white',
        fontWeight:'bold',
        fontFamily: Fonts.Ubuntu,
    },
    icon: {
        fontFamily: 'fontawesome',
        fontSize: 21,
        color:'white',
        paddingBottom:5,
        textAlign:'center',
    },
    buttoncontainer: {
        backgroundColor:'#eb4b3b',
        padding:15,
        width:180,
        marginLeft:30,
        marginRight:30,
        marginTop:18,
        borderBottomWidth:3,
        borderBottomColor:'#d73727',
        borderRadius:4,
    },
    buttontext: {
        fontSize:15,
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
        fontFamily: Fonts.Ubuntu,
    },
    textinput: {
        backgroundColor:'white',
        padding:15,
        borderWidth:1,
        borderColor:'white',
        margin:15,
        marginTop:10,
        marginBottom:0,
        flex:1,
        borderRadius:4,
    },
    buttoncontainer: {
        backgroundColor:'#eb4b3b',
        padding:15,
        margin:15,
        marginTop:10,
        borderBottomWidth:3,
        borderBottomColor:'#d73727',
        borderRadius:4,
    },
    buttontext: {
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
        fontFamily: Fonts.Ubuntu,
        fontSize:15,
    },
});
