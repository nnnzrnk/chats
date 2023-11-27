import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TextInput,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState("");

  const alertMyText = () => {
    Alert.alert(text);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
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
