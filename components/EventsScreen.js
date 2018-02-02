import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, RefreshControl } from 'react-native';
import { Fonts } from '../src/utils/Fonts';

export default class EventsScreen extends Component<{}> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        return fetch('https://uppfeed.co.uk/api/2/events')
        .then((response) => response.json())
        .then((data) => {
            this.setState({data: data});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    _onRefresh() {
        this.setState({refreshing: true});
        return fetch('https://uppfeed.co.uk/api/2/events')
        .then((response) => response.json())
        .then((data) => {
            this.setState({data: data});
            this.setState({refreshing: false});
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
                    <Text style={{ flex:3, textAlign:'center', color:'white', fontSize:18, fontWeight:'bold', fontFamily: Fonts.Ubuntu, }}>
                        <Text style={{ fontFamily: 'fontawesome', fontSize: 18, color:'white', }}>
                            &#xf073;</Text> Events
                    </Text>
                    <Text style={{ flex:1, paddingRight:15, textAlign:'right', color:'white', fontSize:15 }}>
                        {/* Right */}
                    </Text>
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    data={this.state.data}
                    keyExtractor={(x, i) => i}
                    renderItem={({item}) =>
                    <View style={styles.menucontainer}>
                        <View>
                            <View style={{ height:200, backgroundColor: '#eee', }}>
                                <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
                                    <Image style={{ flex: 1, resizeMode: Image.resizeMode.cover, }}
                                           source={{ uri: 'https://uppfeed.co.uk/uploads/' + item.event_image }}
                                    />
                                </View>
                                <View style={{ backgroundColor: 'transparent', width:'100%', flexDirection:'row', justifyContent:'flex-end', }}>
                                    <View style={{ borderBottomWidth:3, borderBottomColor:'#d73727', margin:10 }}>
                                        <Text style={styles.date}>
                                            {item.event_title}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.menutitlewrap}>
                                <Text style={styles.menutitle}>{item.event_date}</Text>
                            </View>
                            <View style={styles.menudescriptionwrap}>
                                <Text style={[styles.sidetitle, item.event_description === null && styles.gone]}>
                                    Description
                                </Text>
                                <Text style={[styles.description, item.event_description === null && styles.gone]}>
                                    {item.event_description}
                                </Text>
                                <Text style={[styles.sidetitle, item.event_price === null && styles.gone]}>
                                    Price
                                </Text>
                                <Text style={[styles.price, item.event_price === null && styles.gone]}>
                                    £{item.event_price}
                                </Text>
                                <Text style={[styles.pricedetails, item.event_price_details === null && styles.gone]}>
                                    {item.event_price_details}
                                </Text>
                                <Text style={[styles.sidetitle, item.start_time === null && styles.gone]}>
                                    Time
                                </Text>
                                <Text style={[styles.price, item.start_time === null && styles.gone]}>
                                    {item.start_time} - {item.end_time}
                                </Text>
                            </View>
                        </View>
                    </View>
                    }
                />
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
    menucontainer: {
        marginBottom:15,
        marginTop:3,
        backgroundColor:'white',
        borderTopWidth:1,
        borderTopColor:'#cccccc',
    },
    date: {
        textAlign:'left',
        color:'white',
        fontWeight:'bold',
        fontFamily: Fonts.Ubuntu,
        backgroundColor:'#eb4b3b',
        paddingVertical:10,
        paddingHorizontal:15,
        fontSize:15,
    },
    menuimage: {
        height:200,
        resizeMode: Image.resizeMode.cover,
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
    menudescriptionwrap: {
        margin:15,
        marginBottom:0,
    },
    sidetitle: {
        fontFamily: Fonts.Ubuntu,
        color:'#eb4b3b',
        fontWeight:'bold',
    },
    price: {
        fontSize:13,
        lineHeight:20,
        fontFamily: Fonts.Ubuntu,
    },
    description: {
        fontSize:13,
        lineHeight:20,
        fontFamily: Fonts.Ubuntu,
        marginBottom:5,
    },
    pricedetails: {
        fontSize:13,
        lineHeight:20,
        fontFamily: Fonts.Ubuntu,
        marginBottom:5,
    },
    endtime: {
        textAlign:'right',
        padding:10,
        paddingLeft:0,
        paddingRight:0,
        color:'white'
    },
    gone: {
        height:0,
        padding:0,
        paddingTop:0,
        borderWidth:0,
    }
});
