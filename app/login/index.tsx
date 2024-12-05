import {Colors} from "@/constants/Colors";
import {BODY_TEXT, CENTER_ON_PAGE} from "@/constants/Styles";
import Icon from "@/views/components/Icon";
import PageWrapper from "@/views/components/PageWrapper";
import Spacer from "@/views/components/Spacer";
import Ionicons from '@expo/vector-icons/Ionicons';
import {SplashScreen} from "expo-router";
import {StyleSheet, Text, View, Pressable, Image, ActivityIndicator} from 'react-native';
import React, {useState, ReactNode, useCallback} from 'react';
import {
  googleSignIn
} from '@/api/oauth/googleAuthAccess';
import {
  facebookSignIn
} from '@/api/oauth/facebookAuthAcess';
import { useAuthSession, TokenPairType } from '@/providers/AuthProvider';
import _ from 'lodash';

interface ISocialLoginBtn {
  onBtnPress: () => void;
  logoName: keyof typeof Ionicons.glyphMap;
  btnText: string;
}
/*
 * individual button
 */
const SocialLoginBtn = ({
  onBtnPress,
  logoName,
  btnText
}: ISocialLoginBtn):ReactNode => {
  return (
    <Pressable
      onPress={onBtnPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        borderColor: '#E0E0E0',
        margin: 12,
        borderWidth: 1,
        gap: 30,
        borderRadius: 25,
        position: 'relative',
        marginTop: 20,
      }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Icon size={24} name={logoName} color={Colors.WHITE} />
        <Text style={{textAlign: 'center', fontSize: 15, paddingLeft: 10, color: Colors.WHITE, fontWeight: '500'}}>
          {btnText}
        </Text>
      </View>
    </Pressable>
  );
}

export default function LoginScreen (): ReactNode {
  const {signIn, isLoading} = useAuthSession();
  const [signInProcessing, setSignInProcessing] = useState(false);

  const handleLogIn = async (authType: string) => {
    setSignInProcessing(true);
    try {
      let tokens: TokenPairType = {
        accessToken: "",
        refreshToken: ""
      };
      switch(authType) {
        case "google":
          tokens = await googleSignIn();
          break;
        case "facebook":
          tokens = await facebookSignIn();
          break
      }

      if (_.isEmpty(tokens)) {
        //@todo handle auth error - notify user
        console.error("There was an error with " + authType + " authentication");
        setSignInProcessing(false);
        return;
      }

      signIn(tokens);

    } catch (err) {
      console.error(err);
      setSignInProcessing(false);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return (
    <PageWrapper>
      <View
        style={CENTER_ON_PAGE}
        onLayout={onLayoutRootView}
      >
        {signInProcessing &&
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator />
          </View>
        }

        {!signInProcessing &&
          <>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              // Helps visually center the weight of the page
              marginTop: -80
            }}>
              <Image
                style={{
                  height: 120,
                  width: 120
                }}
                source={require('@/assets/images/skate-tool.png')}
              />
            </View>
            <Text
              style={[BODY_TEXT, {
                paddingLeft: 12, paddingRight: 12
              }]}
            >
              Rad Times are just ahead. We just need to get you logged in first.
            </Text>
            <Spacer />
            <View style={{}}>
              <SocialLoginBtn
                onBtnPress={() => handleLogIn('google')}
                logoName={'logo-google'}
                btnText={'Sign in with Google'}
              />
              <SocialLoginBtn
                onBtnPress={() => handleLogIn('facebook')}
                logoName={'logo-facebook'}
                btnText={'Sign in with Facebook'}
              />
            </View>
          </>
        }
      </View>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({});
