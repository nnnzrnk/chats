import { useEffect, useState } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView} from "react-native";
import { Bubble, GiftedChat} from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const {name} = route.params
  const {background} = route.params;
  const [messages, setMessages] = useState([])

  // for sending messages
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  // for customazing your messages
  const renderBubble = (props) => {
    return <Bubble
    {...props}
    wrapperStyle={ {
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
    navigation.setOptions({title: name})
  }, [])

  // default messages that appear when you get to the chat page
  useEffect(()=> {
     setMessages([
      {
        _id: 1, 
        text: 'Hello developer', 
        createdAt: new Date(), 
        user: {
          _id: 2,
          name: 'React Native', 
          avatar: 'https://placeimg.com/140/140/any'
        }, 
      }, 
      {
        _id: 2, 
        text: 'This is a system message', 
        createdAt: new Date(), 
        system: true,
      }, 
     ])
  }, [])
  
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
      />
      {/* so that the keyboard does not overlap the input  */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior = "height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
