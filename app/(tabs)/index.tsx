import {DisplayTextStateProp} from "@/state/displayLanguageSlice";
import Spacer from "@/views/components/Spacer";
import UserHome from "@/views/UserHome";
import LoginPage from "@/views/LoginPage";
import {StyleSheet} from "react-native";
import PageTitle from "@/views/components/PageTitle";
import PageWrapper from "@/views/components/PageWrapper";
import { AuthContext } from '@/context/AuthProvider';
import {ReactNode, useContext} from "react";
import {useSelector} from "react-redux";

export default function Index(): ReactNode {
  const displayText = useSelector((state: DisplayTextStateProp) => state.displayText.displayTextJson);
  const {token} = useContext(AuthContext);

  return (
    <PageWrapper>
      {token ? UserHome() : LoginPage()}

    </PageWrapper>
  );
}

const styles = StyleSheet.create({});
