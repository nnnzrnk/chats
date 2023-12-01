import { useEffect, useState } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, query, addDoc, onSnapshot, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name } = route.params
  const { background } = route.params;
  const { userID } = route.params
  const [messages, setMessages] = useState([])

  const onSend = (newMessages) => { addDoc(collection(db, "messages"), newMessages[0]) }

  // for customazing your messages
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#2a9d8f',
        },
        left: {
          backgroundColor: '#fff'
        }
      }}
    />
  }

  //to push messages to storage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache))
    } catch (error) {
      console.log(error.message)
    }
  }
//to get messages from storage
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || []
    setMessages(JSON.parse(cachedMessages))
  }

//to hide input field when user offline
  const renderInputToolBar = (props) => {
    if (isConnected) return <InputToolbar {...props} />
    else return null
  }

  let unsubMessages

  useEffect(() => {

    if (isConnected === true) {
      
       // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubMessages) unsubMessages()
      unsubMessages = null

      navigation.setOptions({ title: name });
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = []
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
        })
        cacheMessages(newMessages)
        setMessages(newMessages)
      })
    } else loadCachedMessages()

    return () => {
      if (unsubMessages) unsubMessages()
    }
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        renderInputToolbar={renderInputToolBar}
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      {/* so that the keyboard does not overlap the input  */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
