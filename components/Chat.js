import { useEffect, useState } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, query, addDoc, onSnapshot, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name } = route.params
  const { background } = route.params;
  const { userID } = route.params
  const [messages, setMessages] = useState([])

  const onSend = (newMessages) => {addDoc(collection(db, "messages"), newMessages[0])}

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

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = []
      documentsSnapshot.forEach(doc => {
        newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())})
      })
      setMessages(newMessages)
    })

    return () => {
      if (unsubMessages) unsubMessages()
    }
  }, [])


  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
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
