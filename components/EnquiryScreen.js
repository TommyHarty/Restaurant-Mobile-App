import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Fonts } from '../src/utils/Fonts';

export default class EnquiryScreen extends Component<{}> {
    static navigationOptions = {
        header:null
    };

    constructor(props) {
        super(props);
        this.state = {
            show_form: true,
            people: '',
            date:'',
            time:'',
            name: '',
            email:'',
            phone: '',
            details:'',
        }
    }

    handlePeople = (people) => {
        this.setState({people: people});
    }

    handleDate = (date) => {
        this.setState({date: date});
    }

    handleTime = (time) => {
        this.setState({time: time});
    }

    handleName = (name) => {
        this.setState({name: name});
    }

    handleEmail = (email) => {
        this.setState({email: email});
    }

    handlePhone = (phone) => {
        this.setState({phone: phone});
    }

    handleDetails = (details) => {
        this.setState({details: details});
    }

    sendData = () => {
        fetch('https://uppfeed.co.uk/add-reservation', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                people: this.state.people,
                date: this.state.date,
                time: this.state.time,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                details: this.state.details,
                user_id: 2,
            })
        })
        .then((response) =>{
            console.log(response);
            this.setState({show_form: false});
        })
        .catch((error)=>{
            console.error(error);
        })
        .done();
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        if(this.state.show_form) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={{ flex:1, paddingLeft:15, fontFamily: 'fontawesome', fontSize: 18, color:'white', }}
                            onPress={ () => goBack() }>
                                &#xf060;
                        </Text>
                        <Text style={{ flex:3, textAlign:'center', color:'white', fontSize:18, fontWeight:'bold', fontFamily: Fonts.Ubuntu, }}>
                            <Text style={{ fontFamily: 'fontawesome', fontSize: 18, color:'white', }}>
                                &#xf0c0;</Text> Make Reservation
                        </Text>
                        <Text style={{ flex:1, paddingRight:15, textAlign:'right', color:'white', fontSize:15, }}>
                           {/* Right */}
                        </Text>
                    </View>
                    <ScrollView>
                        <View style={styles.formcontainer}>
                            <KeyboardAvoidingView style={{ flex: 1 }}
                                keyboardVerticalOffset={21} behavior={"position"}>
                            <View>
                                <Text style={styles.label}>About Your Reservation</Text>
                                <View style={{ flexDirection:'column', }}>
                                    <TextInput
                                        style={styles.textinput}
                                        placeholder="Party size, i.e. 4 People"
                                        placeholderTextColor={'#999'}
                                        onChangeText={this.handlePeople}
                                        value={this.state.people}
                                    />
                                    <View style={{ flexDirection:'row' }}>
                                        <TextInput
                                            style={styles.textinput1st}
                                            placeholder="Date, i.e. 16/03/2018"
                                            placeholderTextColor={'#999'}
                                            onChangeText={this.handleDate}
                                            value={this.state.date}
                                        />
                                        <TextInput
                                            style={styles.textinput2nd}
                                            placeholder="Time, i.e. 7:30pm"
                                            placeholderTextColor={'#999'}
                                            onChangeText={this.handleTime}
                                            value={this.state.time}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.label}>About You</Text>
                                <TextInput
                                    style={styles.textinput}
                                    placeholder="Full name"
                                    placeholderTextColor={'#999'}
                                    onChangeText={this.handleName}
                                    value={this.state.name}
                                />
                                <TextInput
                                    style={styles.textinput}
                                    placeholder="Email address"
                                    placeholderTextColor={'#999'}
                                    onChangeText={this.handleEmail}
                                    value={this.state.email}
                                />
                                <TextInput
                                    style={styles.textinput}
                                    placeholder="Phone number"
                                    placeholderTextColor={'#999'}
                                    onChangeText={this.handlePhone}
                                    value={this.state.phone}
                                />
                                {/* <Text style={styles.label}>Additional Details</Text>
                                <TextInput
                                    multiline={true}
                                    style={styles.textarea}
                                    placeholder="Additional details"
                                    placeholderTextColor={'#999'}
                                    onChangeText={this.handleDetails}
                                    value={this.state.details}
                                /> */}
                                <TouchableOpacity activeOpacity={0.7} style={styles.buttoncontainer} onPress={this.sendData}>
                                    <Text style={styles.buttontext}>Send Reservation Enquiry</Text>
                                </TouchableOpacity>
                            </View>
                          </KeyboardAvoidingView>
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={{ flex:1, paddingLeft:15, fontFamily: 'fontawesome', fontSize: 18, color:'white', }}
                            onPress={ () => goBack() }>
                                &#xf060;
                        </Text>
                        <Text style={{ flex:2, textAlign:'center', color:'white', fontSize:18, fontWeight:'bold', fontFamily: Fonts.Ubuntu, }}>
                            <Text style={{ fontFamily: 'fontawesome', fontSize: 18, color:'white', }}>
                                &#xf05d;</Text> Thank You
                        </Text>
                        <Text style={{ flex:1, paddingRight:15, textAlign:'right', color:'white', fontSize:15, }}>
                           {/* Right */}
                        </Text>
                    </View>
                    <View style={{ flex:1, alignItems:'center', justifyContent:'center', }}>
                        <Text style={styles.thanks}>
                            Thank you for you reservation enquiry, we will be in touch right away.
                        </Text>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
    },
    header: {
        flexDirection:'row',
        paddingBottom:12,
        paddingTop:33,
        backgroundColor:'#eb4b3b',
        borderBottomWidth:1,
        borderBottomColor:'#d73727',
    },
    formcontainer: {
        margin:5,
    },
    textinput: {
        backgroundColor:'white',
        padding:15,
        borderWidth:1,
        borderColor:'#ccd0d2',
        marginBottom:10,
        flex:1,
        borderBottomWidth:1,
        borderBottomColor:'#eb4b3b',
        borderRadius:4
    },
    textinput1st: {
        backgroundColor:'white',
        padding:15,
        borderWidth:1,
        borderColor:'#ccd0d2',
        marginBottom:10,
        flex:1,
        borderBottomWidth:1,
        borderBottomColor:'#eb4b3b',
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,
    },
    textinput2nd: {
        backgroundColor:'white',
        padding:15,
        borderWidth:1,
        borderColor:'#ccd0d2',
        marginBottom:10,
        flex:1,
        borderBottomWidth:1,
        borderBottomColor:'#eb4b3b',
        borderLeftWidth:0,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },
    menutitlewrap: {
        backgroundColor:'#eb4b3b',
        flex:1,
        flexDirection:'row',
        borderBottomWidth:3,
        borderBottomColor:'#d73727',
        marginTop:3,
        marginBottom:5,
    },
    menutitle: {
        fontWeight:'bold',
        padding:15,
        color:'white',
        flex:5,
        fontFamily: Fonts.Ubuntu,
        fontSize:15,
    },
    label: {
        fontFamily: Fonts.Ubuntu,
        color:'#eb4b3b',
        fontWeight:'bold',
        fontSize:15,
        marginVertical:10,
    },
    buttoncontainer: {
        backgroundColor:'#eb4b3b',
        padding:15,
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
    textarea: {
        backgroundColor:'white',
        padding:15,
        paddingTop:15,
        borderWidth:1,
        borderColor:'#ccd0d2',
        height:150,
        borderBottomWidth:1,
        borderBottomColor:'#eb4b3b',
    },
    thanks: {
        fontFamily: Fonts.Ubuntu,
        fontSize:15,
        textAlign:'center',
        paddingHorizontal:30
    }
});
