import {Colors} from "@/constants/Colors";
import Spacer from "@/views/components/Spacer";
import {ReactNode, useEffect} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {StyleSheet} from "react-native";

export default function PhotoVideo(): ReactNode {
  return (
    <PageWrapper>
      <PageTitle
        title={"Session Footage"}
      />
      <Spacer />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({});
