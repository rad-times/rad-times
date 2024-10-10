import {StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import PageTitle from "@/views/components/PageTitle";
import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";

export default function Index(): ReactNode {
  return (
    <PageWrapper>
      <PageTitle
        title={"NEW HOTNESS"}
      />

    </PageWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.BLACK
  }
});
