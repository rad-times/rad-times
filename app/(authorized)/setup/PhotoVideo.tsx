import {CONTENT_FULL_PAGE} from "@/constants/Styles";
import NavigateBackArrowBtn from "@/views/components/NavigateBackArrowBtn";
import Spacer from "@/views/components/Spacer";
import React, {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {StyleSheet, View} from "react-native";

export default function PhotoVideo(): ReactNode {
  return (
    <PageWrapper>
      <PageTitle
        title={"Session Footage"}
      />
      <View style={CONTENT_FULL_PAGE}>
        <Spacer />
      </View>

      <NavigateBackArrowBtn />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({});
