import UserHome from "@/views/UserHome";
import LoginPage from "@/views/LoginPage";
import PageWrapper from "@/views/components/PageWrapper";
import { AuthContext } from '@/providers/AuthProvider';
import {ReactNode, useContext} from "react";

export default function Index(): ReactNode {
  const {userId} = useContext(AuthContext);

  console.log('index rendering with userID:', userId);

  return (
    <PageWrapper>
      {userId === -1 ? LoginPage() : UserHome()}

    </PageWrapper>
  );
}
