import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import PageWrapper from "@/views/components/PageWrapper";
import {ReactNode} from "react";
import {Pressable, StyleSheet, TextInput} from "react-native";

interface EditSocialLinkFormProps {
  onClickClose: Function
}
export default function EditSocialLinkForm({
  onClickClose
}: EditSocialLinkFormProps ): ReactNode {
  return (
    <PageWrapper>
      <Pressable
        style={styles.closeModal}
        onPress={() => {
          console.log('pressed');
          onClickClose(false)
        }}
      >
        <Icon size={25} name='close' color={Colors.WHITE} />
      </Pressable>
      <TextInput />
      <TextInput />
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  closeModal: {
    height: 20,
    width: 20
  }
});
