import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'

import ButtonDefault from './src/components/ButtonDefault'

const AppApple = () => {

  const [ signinGoogle, setSigninGoogle ] = useState(false)
  const [ userGoogle, setUserGoogle ] = useState({})

  useEffect(() => {
    GoogleSignin.configure({})

    isSignedInGoogle()
  }, [])

  useEffect(() => {
    console.log(userGoogle)
  }, [userGoogle])

  const isSignedInGoogle = async() => {
    var value = await GoogleSignin.isSignedIn()

    setSigninGoogle(value)

    return value
  }

  const signInG = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
   
      const { email, id, name } = userInfo.user
     
      setUserGoogle({ ...userGoogle, id: id, name: name, email: email })
      setSigninGoogle(true)

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

  const signOutGoogle = async() => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      
      setUserGoogle(null)

      setSigninGoogle(false)
    } catch (error) {
      console.error(error)
    }
  }

  const renderLoggedGoogle = () => {
    if(signinGoogle){
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.label}>You is logged with Google</Text>
          
          <Text style={styles.label}>{ userGoogle?.id }</Text>
          <Text style={styles.label}>{ userGoogle?.name }</Text>
          <Text style={styles.label}>{ userGoogle?.email }</Text>

          <ButtonDefault title='Sign out' acao={signOutGoogle}/>
        </View>
      )
    }else{
      return null
    }
  }

  const renderLoginGoogle = () => {
    if(signinGoogle){
      return null
    }else{
      return (
        <GoogleSigninButton
          style={styles.buttonSignin}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInG}
          // disabled={this.state.isSigninInProgress}
           />
      )
    }
  }

  return (
    <View style={styles.body}>
      <Text>Login Social using Firebase Google</Text>
      
      { renderLoginGoogle() }

      { renderLoggedGoogle() }

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

export default AppApple