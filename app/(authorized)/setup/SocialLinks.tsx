import {Colors} from "@/constants/Colors";
import {ActiveUserStateProp} from "@/state/activeUserSlice";
import Icon from "@/views/components/Icon";
import Spacer from "@/views/components/Spacer";
import EditSocialLinkForm from "@/views/EditSocialLinkForm";
import SocialMediaLink from "@/views/SocialMediaLink";
import {ReactNode, useState} from "react";
import PageWrapper from "@/views/components/PageWrapper";
import PageTitle from "@/views/components/PageTitle";
import {StyleSheet, View, FlatList, Text, Pressable, Modal} from "react-native";
import {useSelector} from "react-redux";

export default function SocialLinks(): ReactNode {
  const activeUser = useSelector((state: ActiveUserStateProp) => state.activeUser.user);
  const [editMode, setEditMode] = useState(false);
  const [editLink, setEditLink] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const showCreateNewModal = () => {
    console.log("show");
  }

  const onClickEdit = () => {
    setEditLink(true);
  }

  return (
    <PageWrapper>
      <PageTitle
        title={"My Socials"}
      />
      <Spacer margin={15} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={editLink}
      >
        <EditSocialLinkForm
          onClickClose={setEditLink}
        />
      </Modal>

      <FlatList
        style={styles.socialLinkList}
        data={activeUser.socials}
        renderItem={({item}) => <SocialMediaLink socialDetails={item} editMode={editMode} onClickEdit={onClickEdit}/>}
        keyExtractor={item => String(item.id)}
      />

      {/*Don't allow adding new if the user has all available types*/}
      {editMode && activeUser.socials?.length !== 3 &&
        <Pressable
            style={styles.addNewBtn}
            onPress={showCreateNewModal}
        >
            <Text style={styles.addNewText}>Add New</Text>
            <Icon size={25} name='add-circle' color={Colors.DARK_GREY} />
        </Pressable>
      }

      <Pressable
        style={styles.editIconWrapper}
        onPress={toggleEditMode}
      >
        <View style={styles.editIcon}>
          <Icon size={editMode ? 30 : 25} name={editMode ? 'close' : 'pencil-sharp'} color={Colors.DARK_GREY} />
        </View>
      </Pressable>

    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  socialLinkList: {
    flexGrow: 0
  },
  editIconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  editIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: Colors.WHITE
  },
  addNewBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  addNewText: {
    fontSize: 20,
    marginLeft: 10,
    fontStyle: 'italic'
  }
});
