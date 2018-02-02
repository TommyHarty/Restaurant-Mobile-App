import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { Fonts } from '../src/utils/Fonts';

export default class MenusScreen extends Component<{}> {
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
        return fetch('https://uppfeed.co.uk/api/2/menus')
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
        return fetch('https://uppfeed.co.uk/api/2/menus')
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
                            &#xf0f5;</Text> Menus
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
                        <TouchableWithoutFeedback onPress={() => navigate('MenuItems', {menu: item})}>
                            <View>
                                <Image style={[styles.menuimage, item.menu_image === null && styles.gone]}
                                    source={{ uri: 'https://uppfeed.co.uk/uploads/' + item.menu_image }}
                                />
                                <View style={styles.menutitlewrap}>
                                    <Text style={styles.menutitle}>{item.menu_title}</Text>
                                    <Text style={{ flex:1, textAlign:'right', padding:15, fontFamily: 'fontawesome', color:'white', fontSize:15, lineHeight:20, }}>
                                        &#xf061;
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
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
        marginTop:3,
        borderTopWidth:1,
        borderTopColor:'#cccccc',
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
        lineHeight:20,
    },
    menudescription: {
        fontSize:13,
        lineHeight:20,
        padding:15,
        backgroundColor:'white',
    },
    gone: {
        height:0,
        padding:0,
        paddingTop:0,
    },
});
