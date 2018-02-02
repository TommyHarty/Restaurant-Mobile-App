import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Fonts } from '../src/utils/Fonts';

export default class AboutScreen extends Component<{}> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            times: [],
        }
    }

    componentWillMount() {
        this.fetchData();
        this.fetchTimes();
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

    fetchTimes = async () => {
        return fetch('https://uppfeed.co.uk/api/2/opening-times')
        .then((response) => response.json())
        .then((times) => {
            this.setState({times: times});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ flex:1, paddingLeft:15, fontFamily: 'fontawesome', fontSize: 18, color:'white', }}
                        onPress={ () => goBack() }>
                            &#xf060;
                    </Text>
                    <Text style={{ flex:1, textAlign:'center', color:'white', fontSize:18, fontWeight:'bold', fontFamily: Fonts.Ubuntu, }}>
                        <Text style={{ fontFamily: 'fontawesome', fontSize: 18, color:'white', }}>
                            &#xf05a;</Text> About
                    </Text>
                    <Text style={{ flex:1, paddingRight:15, textAlign:'right', color:'white', fontSize:15, }}>
                        {/* Right */}
                    </Text>
                </View>
                <ScrollView>
                    <View style={styles.menucontainer}>
                        <Text style={[styles.menudescription, this.state.data.business_description === null && styles.gone]}>
                            {this.state.data.business_description}
                        </Text>
                    </View>
                    <View style={styles.addresscontainer}>
                        <View style={styles.menutitlewrap}>
                            <Text style={styles.menutitle}>Contact Information</Text>
                        </View>
                        <View style={{ padding:15, paddingBottom:0 }}>
                            <Text style={styles.sidetitle}>
                                Phone
                            </Text>
                            <Text style={styles.address}>
                                {this.state.data.phone}
                            </Text>
                            <Text style={styles.sidetitle}>
                                Email
                            </Text>
                            <Text style={styles.address}>
                                {this.state.data.business_email}
                            </Text>
                            <Text style={styles.sidetitle}>
                                Address
                            </Text>
                            <Text style={styles.address}>
                                {this.state.data.street_1}, {this.state.data.street_2}, {this.state.data.city}, {this.state.data.county}, {this.state.data.country}, {this.state.data.postcode}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.menutitlewrap}>
                            <Text style={styles.menutitle}>Opening Times</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection:'column', borderBottomWidth:1, borderBottomColor:'#ccd0d2', }}>
                        <View style={styles.timeswrap}>
                            <Text style={styles.day}>
                                Monday
                            </Text>
                            <Text style={styles.time}>
                                {this.state.times.monday_opening} - {this.state.times.monday_closing}
                            </Text>
                        </View>
                        <View style={styles.timeswrap}>
                            <Text style={styles.day}>
                                Tuesday
                            </Text>
                            <Text style={styles.time}>
                                {this.state.times.tuesday_opening} - {this.state.times.tuesday_closing}
                            </Text>
                        </View>
                        <View style={styles.timeswrap}>
                            <Text style={styles.day}>
                                Wednesday
                            </Text>
                            <Text style={styles.time}>
                                {this.state.times.wednesday_opening} - {this.state.times.wednesday_closing}
                            </Text>
                        </View>
                        <View style={styles.timeswrap}>
                            <Text style={styles.day}>
                                Thursday
                            </Text>
                            <Text style={styles.time}>
                                {this.state.times.thursday_opening} - {this.state.times.thursday_closing}
                            </Text>
                        </View>
                        <View style={styles.timeswrap}>
                            <Text style={styles.day}>
                                Friday
                            </Text>
                            <Text style={styles.time}>
                                {this.state.times.friday_opening} - {this.state.times.friday_closing}
                            </Text>
                        </View>
                        <View style={styles.timeswrap}>
                            <Text style={styles.day}>
                                Saturday
                            </Text>
                            <Text style={styles.time}>
                                {this.state.times.saturday_opening} - {this.state.times.saturday_closing}
                            </Text>
                        </View>
                        <View style={styles.timeswrap}>
                            <Text style={styles.day}>
                                Sunday
                            </Text>
                            <Text style={styles.time}>
                                Closed
                            </Text>
                        </View>
                    </View>
                    <View style={styles.credit}>
                        <Text style={styles.builtby}>
                            App built by UppFeed
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
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
    menudescription: {
        fontSize:13,
        lineHeight:20,
        padding:21,
        paddingVertical:30,
        fontFamily: Fonts.Ubuntu,
        textAlign:'center',
        backgroundColor:'#eb4b3b',
        color:'white',
        fontWeight:'bold',
    },
    menucontainer: {
        backgroundColor:'white',
    },
    addresscontainer: {
        marginTop:3,
        borderBottomWidth:1,
        borderBottomColor:'#ccd0d2',
    },
    sidetitle: {
        fontFamily: Fonts.Ubuntu,
        color:'#eb4b3b',
        fontWeight:'bold',
    },
    address: {
        paddingBottom:15,
        backgroundColor:'white',
        fontSize:13,
        fontFamily: Fonts.Ubuntu,
        lineHeight:20,
    },
    description: {
        fontSize:13,
        lineHeight:20,
        padding:15,
        fontFamily: Fonts.Ubuntu,
        backgroundColor:'white',
    },
    menutitlewrap: {
        backgroundColor:'#eb4b3b',
        flex:1,
        flexDirection:'row',
        borderBottomWidth:3,
        borderBottomColor:'#d73727',
    },
    menutitle: {
        fontWeight:'bold',
        padding:15,
        color:'white',
        flex:5,
        fontFamily: Fonts.Ubuntu,
        fontSize:15,
    },
    timeswrap: {
        flexDirection:'row',
        backgroundColor:'white',
        padding:15,
        borderBottomWidth:1,
        borderBottomColor:'#ebebeb',
    },
    day: {
        flex:1,
        fontSize:13,
        fontFamily: Fonts.Ubuntu,
        fontWeight:'bold',
        color:'#eb4b3b',
    },
    time: {
        flex:1,
        textAlign:'right',
        fontSize:13,
        fontFamily: Fonts.Ubuntu,
    },
    credit: {
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:30,
    },
    builtby: {
        fontSize:13,
        fontFamily: Fonts.Ubuntu,
        fontWeight:'bold',
        color:'#999',
    },
    gone: {
        height:0,
        padding:0,
        paddingTop:0,
    },
});
