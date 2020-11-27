import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
//import auth from '@react-native-firebase/auth'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'

const App = () => {

  const [ userInfo, setUserInfo ] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ isLoginScreenPresented, setIsLoginScreenPresented ] = useState(null)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '864806810263-od33v15709ua29kpc89t4glk4cb3mg0l.apps.googleusercontent.com'
    })
  }, [])

  const signIn = async () => {
    var retorno = await GoogleSignin.signIn()
    console.log(retorno)
    /*try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      
      console.log(userInfo)
     
      setUserInfo(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('statusCodes.SIGN_IN_CANCELLED', statusCodes.SIGN_IN_CANCELLED)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('statusCodes.IN_PROGRESS', statusCodes.IN_PROGRESS)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('statusCodes.PLAY_SERVICES_NOT_AVAILABLE', statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
      } else {
        // some other error happened
        console.log('error', error)
      }
    }*/
  }

  const isSignedIn = async() => {
    const isSignedIn = await GoogleSignin.isSignedIn()

    setIsLoginScreenPresented(!isSignedIn)
  }

  const signOut = async() => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      
      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.body}>
      <Text>Login Social using Firebase</Text>

      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        // disabled={this.state.isSigninInProgress}
         />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ADD8E6',
    flex: 1,
    alignItems: 'center'
  }  
})

export default App