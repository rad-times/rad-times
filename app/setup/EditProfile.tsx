import {Colors} from "@/constants/Colors";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import FormInput from "@/views/components/FormInput";
import FormLabel from "@/views/components/FormLabel";
import Spacer from "@/views/components/Spacer";
import {ReactNode, useState} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {StyleSheet, Text} from 'react-native';

import {useSelector} from "react-redux";

interface EditProfileProps {}

export default function EditProfile({}: EditProfileProps): ReactNode {
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const [location, setLocation] = useState(activeUser.location?.city_name)
  const onChangeFirstName = (val: string) => {
    console.log('first name is ', val);
  };

  const onChangeLastName = (val: string) => {
    console.log('last name is ', val);
  };

  const onChangeBio = (val: string) => {
    console.log('bio is ', val);
  };

  const onChangeLocation = async (val: string) => {
    setLocation(val);
    // const resp = await searchGooglePlaces(val);
    // console.log('resp', resp);
  }

  interface FormElementBlockProps {
    label: string
    value: string | undefined
    onChange: Function
    isMultiline?: boolean
    maxLength?: number
  }

  const FormElementBlock = ({
    label,
    value = '',
    onChange,
    isMultiline = false,
    maxLength
  }: FormElementBlockProps) => {
    return (
      <>
        <Spacer />
        <FormLabel labelText={label} />
        <FormInput
          formValue={value}
          onChangeInput={onChange}
          isMultiline={isMultiline}
          maxLength={maxLength}
        />
      </>
    );
  };

  return (
    <PageWrapper>
      <PageTitle
        title={"Edit My Profile"}
      />
      <FormElementBlock
        label={'First Name'}
        value={activeUser.first_name}
        onChange={onChangeFirstName}
      />
      <FormElementBlock
        label={'Last Name'}
        value={activeUser.last_name}
        onChange={onChangeLastName}
      />
      <FormElementBlock
        label={'Bio'}
        value={activeUser.bio}
        onChange={onChangeBio}
        isMultiline={true}
        maxLength={255}
      />

      <FormElementBlock
        label={'Location'}
        value={location}
        onChange={onChangeLocation}
        maxLength={255}
      />

    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 5,
    color: Colors.LIGHT_GREY
  }
})
