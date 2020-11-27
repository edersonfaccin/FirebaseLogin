import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'

import ButtonDefault from './src/components/ButtonDefault'

const App = () => {

  const [ signin, setSignin ] = useState(false)
  const [ user, setUser ] = useState({})

  useEffect(() => {
    GoogleSignin.configure({})

    isSignedIn()
  }, [])

  const isSignedIn = async() => {
    var value = await GoogleSignin.isSignedIn()

    setSignin(value)

    return value
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      
      console.log(userInfo.user)
     
      setUser(userInfo)
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
    }
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

  const renderLogged = () => {
    if(signin){
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.label}>You is logged with Google</Text>

          <ButtonDefault title='Sign out' acao={signOut}/>
        </View>
      )
    }else{
      return null
    }
  }

  const renderLogin = () => {
    /*if(signin){
      return null
    }else{*/
      return (
        <GoogleSigninButton
          style={styles.buttonSignin}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          // disabled={this.state.isSigninInProgress}
           />
      )
    //}
  }

  return (
    <View style={styles.body}>
      <Text>Login Social using Firebase</Text>

      { renderLogin() }

      { renderLogged() }
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ADD8E6',
    flex: 1,
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold', 
    fontSize: 22
  },
  buttonSignin: { 
    width: Dimensions.get('window').width - 10, 
    height: 48 
  }
})

export default App