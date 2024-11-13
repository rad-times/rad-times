import {Colors} from "@/constants/Colors";
import {BODY_TEXT, CENTER_ON_PAGE} from "@/constants/Styles";
import Icon from "@/views/components/Icon";
import PageWrapper from "@/views/components/PageWrapper";
import Spacer from "@/views/components/Spacer";
import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet, Text, View, Pressable, Image, GestureResponderEvent, ActivityIndicator} from 'react-native';
import React, {useState, ReactNode} from 'react';
import useGoogleSignIn from '@/hooks/useGoogleSignin';
import { useAuthSession } from '@/providers/AuthProvider';
import _ from 'lodash';

interface ISocialLoginBtn {
  onBtnPress: (e: GestureResponderEvent) => void;
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
  const {signIn} = useAuthSession();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const [token, error] = await useGoogleSignIn();
    if (error || _.isNil(token)) {
      //@todo handle auth error
      console.error("There was an error with Google authentication:", error);
      return;
    }

    signIn(token);
    setLoading(false);
  };

  const handleFacebookLogin = async() => {
    console.log('TODO');
  }

  return (
    <PageWrapper>
      <View style={CENTER_ON_PAGE}>
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
            source={{
              uri:' /assets/images/skate-tool.png'
            }}
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
        {loading &&
          <View style={{flex: 1}}>
            <ActivityIndicator />
          </View>
        }

        {!loading &&
          <View style={{}}>
            <SocialLoginBtn
              onBtnPress={handleGoogleLogin}
              logoName={'logo-google'}
              btnText={'Sign in with Google'}
            />
            <SocialLoginBtn
              onBtnPress={handleFacebookLogin}
              logoName={'logo-facebook'}
              btnText={'Sign in with Facebook'}
            />
          </View>
        }
      </View>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({});
