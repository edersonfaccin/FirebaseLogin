import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'

import { LoginManager, AccessToken } from 'react-native-fbsdk'
import auth from '@react-native-firebase/auth'

import ButtonDefault from './src/components/ButtonDefault'

const AppFacebook = () => {

  const [ userId, setUserId ] = useState(null)
  const [ accessToken, setAccessToken ] = useState(null)
  const [ email, setEmail ] = useState(null)
  const [ nome, setNome ] = useState(null)
/*
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    return subscriber
  }, [])*/

  const sign = async() => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    setUserId(data.userID)

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    console.log('data', data)

    setAccessToken(data.accessToken)
    
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
    console.log('facebookCredential', facebookCredential)
    // Sign-in the user with the credential
    auth().signInWithCredential(facebookCredential).then(res => {
      setEmail(res.additionalUserInfo.profile.email)
      setNome(res.additionalUserInfo.profile.name)
    })
  }

  return (
    <View style={styles.body}>
      <Text>Login Social using Firebase Apple</Text>
      
      <ButtonDefault title='Sign in Facebook' acao={sign}/>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ADD8E6',
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
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

export default AppFacebook