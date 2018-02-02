import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Fonts } from '../src/utils/Fonts';
import StarRating from 'react-native-star-rating';

export default class AddReviewScreen extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            review: '',
            starCount: 0,
            show_form: true,
        }
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    handleChangeReview = (typedReview) => {
        this.setState({review: typedReview});
    }

    sendData = () => {
        fetch('https://uppfeed.co.uk/add-review', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review: this.state.review,
                stars: this.state.starCount,
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
                        <Text style={{ flex:2, textAlign:'center', color:'white', fontSize:18, fontWeight:'bold', fontFamily: Fonts.Ubuntu, }}>
                            <Text style={{ fontFamily: 'fontawesome', fontSize: 18, color:'white', }}>
                                &#xf067;</Text> Add Review
                        </Text>
                        <Text style={{ flex:1, paddingRight:15, textAlign:'right', color:'white', fontSize:15, }}>
                           {/* Right */}
                        </Text>
                    </View>
                    <ScrollView>
                        <View style={styles.starscontainer}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={30}
                                starColor={'#eb4b3b'}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                        <View style={styles.formcontainer}>
                            <TextInput
                                multiline={true}
                                style={styles.textarea}
                                placeholderTextColor={'#999'}
                                placeholder="Tell others about your experience"
                                onChangeText={this.handleChangeReview}
                                value={this.state.review}
                            />
                            <TouchableOpacity activeOpacity={0.7} style={styles.buttoncontainer} onPress={this.sendData}>
                                <Text style={styles.buttontext}>Submit Review</Text>
                            </TouchableOpacity>
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
                            Thank you, your review has been submitted.
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
    starscontainer: {
        paddingTop:15,
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
    },
    formcontainer: {
        margin:5,
    },
    textarea: {
        backgroundColor:'white',
        padding:15,
        paddingTop:15,
        borderWidth:1,
        borderColor:'#ccd0d2',
        height:150,
        fontFamily: Fonts.Ubuntu,
        borderBottomWidth:1,
        borderBottomColor:'#eb4b3b',
        borderRadius:4
    },
    buttoncontainer: {
        backgroundColor:'#eb4b3b',
        padding:15,
        marginTop:5,
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
    thanks: {
        fontFamily: Fonts.Ubuntu,
        fontSize:15,
    }
});
