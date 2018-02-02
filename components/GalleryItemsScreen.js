import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';
import { Fonts } from '../src/utils/Fonts';

export default class GalleryItemsScreen extends Component<{}> {
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
                            &#xf030;</Text> {state.params.gallery.gallery_title}
                    </Text>
                    <Text style={{ flex:1, paddingRight:15, textAlign:'right', color:'white', fontSize:15 }}>
                        {/* Right */}
                    </Text>
                </View>

                <ScrollView>
                    <Text style={[styles.menudescription, state.params.gallery.gallery_description === null && styles.gone]}>
                        {state.params.gallery.gallery_description}
                    </Text>
                <FlatList
                    data={state.params.gallery.gallery_items}
                    keyExtractor={(x, i) => i}
                    renderItem={({item}) =>
                    <View style={styles.menucontainer}>
                        <View>
                            <Image style={styles.menuimage} resizeMode={'cover'}
                                source={{ uri: 'https://uppfeed.co.uk/uploads/' + item.gallery_item_image }}
                            />
                            <View style={styles.menutitlewrap}>
                                <Text style={[styles.menutitle, item.menu_item_image === null && styles.gone]}>
                                    {item.gallery_item_title}
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
    menucontainer: {
        marginTop:3,
        backgroundColor:'white',
        borderTopWidth:1,
        borderTopColor:'#cccccc',
    },
    menudescription: {
        fontSize:13,
        lineHeight:20,
        padding:15,
        paddingVertical:30,
        fontFamily: Fonts.Ubuntu,
        textAlign:'center',
        backgroundColor:'#eb4b3b',
        color:'white',
        fontWeight:'bold',
    },
    menuimage: {
        height:200,
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
});
