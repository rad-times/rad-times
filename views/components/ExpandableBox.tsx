import {Colors} from "@/constants/Colors";
import Icon from "@/views/components/Icon";
import {Pressable, StyleSheet, View} from 'react-native';
import {ReactNode, useState} from "react";

interface IExpandableBox {
  boxDisabled?: boolean,
  collapsedContent: ReactNode|ReactNode[]
  expandedContent: ReactNode|ReactNode[]
}
export default function ExpandableBox(
  {
    boxDisabled = false,
    collapsedContent,
    expandedContent
  }: IExpandableBox): ReactNode {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onSelectBox = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <View style={styles.box}>
      <Pressable
        onPress={onSelectBox}
        style={styles.boxHeader}
        disabled={boxDisabled}
      >
        <View>
          {collapsedContent}
        </View>
        <Icon size={24} name={isExpanded ? "chevron-up-circle-outline" : "chevron-down-circle-outline"} color={Colors.DARK_GREY} />
      </Pressable>
      {isExpanded &&
        <View style={styles.expandedContent}>
          {expandedContent}
        </View>
      }
    </View>

  );
}

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  boxHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50
  },
  expandedContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: Colors.WHITE,
    borderTopWidth: 1
  }
})
