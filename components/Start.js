import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native"
import { useState } from "react"
import { getAuth, signInAnonymously } from "firebase/auth";


const Start = ({ navigation }) => {
    const [name, setName] = useState('')
    const [background, setBackground] = useState('')
    // initialized the Firebase authentication handler
    const auth = getAuth()

    // once the user is signed in, the app navigates to the Chat screen while passing result.user.uid (which is assigned to the route parameter userID)
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate('Chat', { name: name, background: background, userID: result.user.uid })
                Alert.alert('Signed in Successfully!')
            })
            .catch((error) => {
                Alert.alert('Unable to sign in, try later again.')
            })
    }

    return (
        // used imageBackground insted of View
        <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.container}>

            {/*added extra View because its usefull to center title without margins */}
            <View style={styles.titleView}>
                <Text style={styles.appTitle}>Chats</Text>
            </View>

            <View style={styles.mainView}>
                <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder='Type your username here' />

                {/* View with text and colors container  */}
                <View>
                    <Text style={styles.chooseText}>Choose Background Color</Text>
                    {/* only colors container     */}
                    <View style={styles.colorsContainer}>
                        <TouchableOpacity
                            style={[styles.selectStyle, styles.selectColor1]}
                            onPress={() => setBackground(styles.selectColor1.backgroundColor)}>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectStyle, styles.selectColor2]}
                            onPress={() => setBackground(styles.selectColor2.backgroundColor)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectStyle, styles.selectColor3]}
                            onPress={() => setBackground(styles.selectColor3.backgroundColor)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectStyle, styles.selectColor4]}
                            onPress={() => setBackground(styles.selectColor4.backgroundColor)}
                        ></TouchableOpacity>
                    </View>
                </View>


                <TouchableOpacity
                    style={styles.buttonStart}
                    onPress={signInUser}>
                    <Text style={styles.textButton}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    titleView: {
        flex: 2,
        justifyContent: 'space-around'
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#757083',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainView: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '88%',
        height: '44%',
        marginBottom: 30,
        justifyContent: 'space-evenly',
        borderRadius: 10,
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: '8%',
        marginBottom: 15,
        position: 'absolute',
        top: 5
    },
    chooseText: {
        fontSize: 18,
        fontWeight: '300',
        color: '#757083',
        opacity: 100,
        marginBottom: 20
    },
    colorsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: "space-between"
    },
    selectStyle: {
        width: 60,
        height: 60,
        borderRadius: '50%',

    },
    selectColor1: {
        backgroundColor: '#757083',
    },
    selectColor2: {
        backgroundColor: '#edc6bb',
    },
    selectColor3: {
        backgroundColor: '#B5D4DB',
    },
    selectColor4: {
        backgroundColor: '#B9C6AE',
    },

    buttonStart: {
        position: 'absolute',
        bottom: 5,
        marginBottom: "6%",
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        backgroundColor: '#757083',
        padding: 20,
        width: '70%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    }
})

export default Start