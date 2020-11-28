import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'

import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication'

import ButtonDefault from './src/components/ButtonDefault'

const App = () => {

  const [ signinGoogle, setSigninGoogle ] = useState(false)
  const [ userGoogle, setUserGoogle ] = useState({})

  const [ signinApple, setSigninApple ] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({})

    isSignedInGoogle()
  }, [])

  const isSignedInGoogle = async() => {
    var value = await GoogleSignin.isSignedIn()

    setSigninGoogle(value)

    return value
  }

  const signinA = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    })
  
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
  
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      console.log(appleAuth)
    }
  }

  const signInG = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      
      const { email, id, name } = userInfo.user
     
      setUserGoogle({ ...user, id: id, name: name, email: email })
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

  const signOutApple = () => {
    appleAuth.Operation.LOGOUT
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

  const renderLoggedApple = () => {
    if(signinApple){
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.label}>You is logged with Apple</Text>
          {/* 
          <Text style={styles.label}>{ userGoogle?.id }</Text>
          <Text style={styles.label}>{ userGoogle?.name }</Text>
          <Text style={styles.label}>{ userGoogle?.email }</Text> */}

          <ButtonDefault title='Sign out Apple' acao={signOutApple}/>
        </View>
      )
    }else{
      return null
    }
  }

  const renderLoginApple = () => {
    if(signinApple){
      return null
    }else{
      return (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160, // You must specify a width
            height: 45, // You must specify a height
          }}
          onPress={signinA}
        />
      )
    }
  }

  return (
    <View style={styles.body}>
      <Text>Login Social using Firebase</Text>

      { Platform.OS === 'android' ? renderLoginGoogle() : null }

      { Platform.OS === 'android' ? renderLoggedGoogle() : null }


      { Platform.OS === 'ios' ? renderLoginApple() : null }

      { Platform.OS === 'ios' ? renderLoggedApple() : null }

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