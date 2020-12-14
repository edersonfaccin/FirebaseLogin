import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'

import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication'

import ButtonDefault from './src/components/ButtonDefault'

const AppApple = () => {

  const [ signinApple, setSigninApple ] = useState(false)
  const [ userApple, setUserApple ] = useState({})

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked')
    })
  }, [])

  const signinA = async () => {    
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    })
    
    console.log('login', appleAuthRequestResponse)

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      console.log('OK', appleAuth)
    }
  }

  const signOutApple = () => {
    appleAuth.Operation.LOGOUT
  }

  const renderLoggedApple = () => {
    if(signinApple){
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.label}>You is logged with Apple</Text>
          
          {/* <Text style={styles.label}>{ userGoogle?.id }</Text> */}
          <Text style={styles.label}>{ userApple?.name }</Text>
          <Text style={styles.label}>{ userApple?.email }</Text> 

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
      <Text>Login Social using Firebase Apple</Text>
      
      { renderLoginApple() }

      { renderLoggedApple() }
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