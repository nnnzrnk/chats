import { TouchableOpacity, StyleSheet, View, Alert, Text } from "react-native"
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from 'expo-media-library'


const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
    const actionSheet = useActionSheet()
    const [image, setImage] = useState(null)


    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync()

            if (!result.canceled) {
                console.log('uploading and uploading the image occurs here')
            } else Alert.alert(`Permissions haven't been granted`)
        }
    }

    // The code asks permission from 
    // the media library (which includes both reading and writing to it).
    // If granted, the code will call MediaLibrary.saveToLibraryAsync() 
    //while passing the URI of the photo asset to it.
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync()

        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync()

            if (!result.canceled) {
                let mediaLibraryPermissionsAsync = await MediaLibrary.requestPermissionsAsync()

                if (mediaLibraryPermissionsAsync?.granted) await MediaLibrary.saveToLibraryAsync(result.assets[0].uri)

                console.log('uploading and uploading the image occurs here');
            } else Alert.alert(`Permissions haven't been granted`)
        }
    }

    // this method requests permission to access the device’s location
    const getLocation = async () => {
        const permissions = await Location.requestForegroundPermissionsAsync()

        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({})
            if (location) {
                onSend({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                })
            } else Alert.alert("Error occurred while fetching location");
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    }

    const onActionPress = () => {
        const options = ['Choose From Lirary', 'Take Picture', 'Send Location', 'Cancel']
        const cancelButtonIndex = options.length - 1
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage()
                        return;
                    case 1:
                        takePhoto()
                        return;
                    case 2:
                        getLocation()
                    default:
                }
            }
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
        justifyContent: 'center'
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
        
    },
})

export default CustomActions