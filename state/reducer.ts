import React from "react";
import _ from 'lodash';
import {
  ReducerActions
} from '@/constants/ReducerActions';

type ModalContent = {
  showHeader?: boolean,
  headerText?: string,
  onCloseCB?: Function,
  modalContent: React.ReactNode | null
};

export type State = {
  currentExpandedCategory: string,
  settingsToggled: boolean,
  filtersExpanded: boolean,
  modalShown: boolean
  modalContent: ModalContent
};

export const initialState: State = {
  currentExpandedCategory: '',
  settingsToggled: false,
  filtersExpanded: false,
  modalShown: false,
  modalContent: {
    showHeader: false,
    headerText: '',
    onCloseCB: _.noop,
    modalContent: null
  }
};

interface ActionProp {
  /**  */
  type: string,
  /**  */
  payload?: any
}

function stateReducer(state: State, action: ActionProp) {
  const {type, payload} = action;
  switch(type) {
    case ReducerActions.EXPAND_CATEGORY:
      return {
        ...state,
        currentExpandedCategory: payload
      };
    case ReducerActions.TOGGLE_SETTINGS:
      return {
        ...state,
        settingsToggled: !state.settingsToggled
      };
    case ReducerActions.EXPAND_FILTERS:
      return {
        ...state,
        filtersExpanded: !state.filtersExpanded
      };
    case ReducerActions.SHOW_MODAL:
      return {
        ...state,
        modalShown: true,
        modalContent: {
          showHeader: payload.showHeader || false,
          headerText: payload.headerText || '',
          onCloseCB: payload.onCloseCB || _.noop,
          modalContent: payload.modalContent
        }
      }

    case ReducerActions.CLOSE_MODAL:
      return {
        ...state,
        modalShown: false,
        modalContent: {
          showHeader: false,
          headerText: '',
          onCloseCB: _.noop,
          modalContent: null
        }
      }
    default:
      return state;
  }
}

export default stateReducer;
