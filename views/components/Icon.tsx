// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import {type ComponentProps, ReactNode} from 'react';

function Icon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>): ReactNode {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

export default Icon;
