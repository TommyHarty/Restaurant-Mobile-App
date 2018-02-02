import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import ReviewsScreen from './components/ReviewsScreen';
import AddReviewScreen from './components/AddReviewScreen';
import EnquiryScreen from './components/EnquiryScreen';
import MenusScreen from './components/MenusScreen';
import MenuItemsScreen from './components/MenuItemsScreen';
import OffersScreen from './components/OffersScreen';
import EventsScreen from './components/EventsScreen';
import GalleriesScreen from './components/GalleriesScreen';
import GalleryItemsScreen from './components/GalleryItemsScreen';

const AppNavigation = StackNavigator({
    Home: { screen: HomeScreen },
    About: { screen: AboutScreen },
    Reviews: { screen: ReviewsScreen },
        AddReview: { screen: AddReviewScreen },
    Enquiry: { screen: EnquiryScreen },
    Menus: { screen: MenusScreen },
        MenuItems: { screen: MenuItemsScreen },
    Offers: { screen: OffersScreen },
    Events: { screen: EventsScreen },
    Galleries: { screen: GalleriesScreen },
        GalleryItems: { screen: GalleryItemsScreen },
});

export default class App extends Component<{}> {
    render() {
        return <AppNavigation />
    }
}
