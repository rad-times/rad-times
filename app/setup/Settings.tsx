import {ReactNode} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";

export default function Settings(): ReactNode {
  return (
    <PageWrapper>
      <PageTitle
        title={"Settings and Preferences"}
      />
    </PageWrapper>
  );
}
