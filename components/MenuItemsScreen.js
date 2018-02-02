import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native';
import { Fonts } from '../src/utils/Fonts';

export default class MenuItemsScreen extends Component<{}> {
    static navigationOptions = {
        header: null
    };
    render() {
        const { state, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ flex:1, paddingLeft:15, fontFamily: 'fontawesome', fontSize: 18, color:'white', }}
                        onPress={ () => goBack() }>
                            &#xf060;
                    </Text>
                    <Text style={{ flex:3, textAlign:'center', color:'white', fontSize:18, fontWeight:'bold', fontFamily: Fonts.Ubuntu, }}>
                        <Text style={{ fontFamily: 'fontawesome', fontSize: 18, color:'white', }}>
                            &#xf0f5;</Text> {state.params.menu.menu_title}
                    </Text>
                    <Text style={{ flex:1, paddingRight:15, textAlign:'right', color:'white', fontSize:15 }}>
                        {/* Right */}
                    </Text>
                </View>
                <ScrollView>
                    <Text style={[styles.menudescription, state.params.menu.menu_description === null && styles.gone]}>
                        {state.params.menu.menu_description}
                    </Text>
                <FlatList
                    data={state.params.menu.menu_items}
                    keyExtractor={(x, i) => i}
                    renderItem={({item}) =>
                    <View style={styles.menucontainer}>
                        <View>

                            <View style={{ height:200, backgroundColor: '#eee', }}>
                                <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
                                    <Image style={{ flex: 1, resizeMode: Image.resizeMode.cover, }}
                                           source={{ uri: 'https://uppfeed.co.uk/uploads/' + item.menu_item_image }}
                                    />
                                </View>
                                <View style={{ backgroundColor: 'transparent', width:'100%', flexDirection:'row', justifyContent:'flex-end', }}>
                                    <View style={{ borderBottomWidth:3, borderBottomColor:'#d73727', margin:10, }}>
                                        <Text style={[styles.price, item.menu_item_price === null && styles.gone]}>
                                            £{item.menu_item_price}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.menutitlewrap}>
                                <Text style={styles.menutitle}>{item.menu_item_title}</Text>
                            </View>
                            <View style={styles.menudescriptionwrap}>
                                <Text style={[styles.sidetitle, item.menu_item_description === null && styles.gone]}>
                                    Description
                                </Text>
                                <Text style={[styles.description, item.menu_item_description === null && styles.gone]}>
                                    {item.menu_item_description}
                                </Text>
                                <Text style={[styles.sidetitle, item.menu_item_price_details === null && styles.gone]}>
                                    Extras
                                </Text>
                                <Text style={[styles.pricedetails, item.menu_item_price_details === null && styles.gone]}>
                                    {item.menu_item_price_details}
                                </Text>
                                <Text style={[styles.sidetitle, item.nutritional_info === null && styles.gone]}>
                                    Nutritional Information
                                </Text>
                                <Text style={[styles.nutrition, item.nutritional_info === null && styles.gone]}>
                                    {item.nutritional_info}
                                </Text>
                                <Text style={[styles.sidetitle, item.allergen_info === null && styles.gone]}>
                                    Allergen Information
                                </Text>
                                <Text style={[styles.allergen, item.allergen_info === null && styles.gone]}>
                                    {item.allergen_info}
                                </Text>
                            </View>
                        </View>
                    </View>
                    }
                />
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
        marginBottom:15,
        marginTop:3,
        backgroundColor:'white',
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
    },
    menudescriptionwrap: {
        margin:15,
        marginBottom:0,
    },
    price: {
        textAlign:'left',
        color:'white',
        fontWeight:'bold',
        fontFamily: Fonts.Ubuntu,
        backgroundColor:'#eb4b3b',
        paddingVertical:10,
        paddingHorizontal:15,
        fontSize:15,
    },
    sidetitle: {
        fontFamily: Fonts.Ubuntu,
        color:'#eb4b3b',
        fontWeight:'bold',
    },
    description: {
        fontSize:13,
        lineHeight:20,
        fontFamily: Fonts.Ubuntu,
        marginBottom:5,
    },
    nutrition: {
        fontSize:13,
        lineHeight:20,
        fontFamily: Fonts.Ubuntu,
        marginBottom:5,
    },
    allergen: {
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
    gone: {
        height:0,
        padding:0,
        paddingTop:0,
        borderWidth:0,
        marginBottom:0,
    }
});
