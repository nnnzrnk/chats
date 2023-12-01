import { Alert, StyleSheet } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from "react";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";


const Stack = createNativeStackNavigator();

const App = () => {
  //state that represents the network connectivity status
  const connectionStatus = useNetInfo()

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDwATkzMi397WdtXPu6xu374hKAaGVjiDE",
    authDomain: "chats-a52f4.firebaseapp.com",
    projectId: "chats-a52f4",
    storageBucket: "chats-a52f4.appspot.com",
    messagingSenderId: "719096245602",
    appId: "1:719096245602:web:21f059ffaae5119592503b"
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

   //will display an alert popup if connection is lost
   useEffect(() => {
    if (connectionStatus.isConnected === false){
      Alert.alert("Connection lost!")
      disableNetwork(db)
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db)
    }
  }, [connectionStatus.isConnected]) // the useEffect code will be re-executed (if you lose connection while using the app, you should see a “Connection lost!” alert)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" >
          {props => <Chat  isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default App;
