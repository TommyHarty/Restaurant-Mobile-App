import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Fonts } from '../src/utils/Fonts';
import StarRating from 'react-native-star-rating';

export default class ReviewsScreen extends Component<{}> {
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
        return fetch('https://uppfeed.co.uk/api/2/reviews')
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
        return fetch('https://uppfeed.co.uk/api/2/reviews')
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
                    <Text style={{ flex:1, textAlign:'center', color:'white', fontSize:18, fontWeight:'bold', fontFamily: Fonts.Ubuntu, }}>
                        <Text style={{ fontFamily: 'fontawesome', fontSize: 18, color:'white', }}>
                            &#xf123;</Text> Reviews
                    </Text>
                    <Text style={{ flex:1, paddingRight:15, textAlign:'right', color:'white', fontSize:15, }}>
                       {/* Right */}
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.buttoncontainer} onPress={ () => navigate('AddReview') }>
                    <Text style={styles.buttontext}>Add Review</Text>
                </TouchableOpacity>
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
                            <View style={styles.starscontainer}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    starSize={21}
                                    starColor={'#eb4b3b'}
                                    rating={item.stars}
                                />
                            </View>
                            <View style={styles.menudescriptionwrap}>
                                <Text style={[styles.description, item.menu_item_description === null && styles.gone]}>
                                    {item.review}{"\n"}
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
        marginTop:5,
        borderBottomWidth:1,
        borderBottomColor:'#ccd0d2',
    },
    starscontainer: {
        padding:15,
        paddingBottom:0,
        width:200,
        backgroundColor:'white',
    },
    menudescriptionwrap: {
        backgroundColor:'white',
    },
    description: {
        fontSize:13,
        lineHeight:20,
        paddingTop:12,
        paddingLeft:15,
        paddingRight:15,
        fontFamily: Fonts.Ubuntu,
    },
    buttoncontainer: {
        backgroundColor:'#eb4b3b',
        padding:15,
        margin:5,
        marginBottom:0,
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
    gone: {
        height:0,
        padding:0,
        paddingTop:0,
        borderWidth:0,
    }
});
