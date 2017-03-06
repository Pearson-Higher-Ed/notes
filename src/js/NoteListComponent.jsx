import React from 'react';
import { IntlProvider } from 'react-intl';
import InternationalSupport from './InternationalSupport';
import NoteList from './NoteList';

export const NoteListComponent = function NoteListComponent(paramsObj) { // eslint-disable-line import/prefer-default-export
  const intlObj = new InternationalSupport(paramsObj.locale);
  return (<IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}>
    <NoteList
      notes={paramsObj.notes}
      clickNoteHandler={paramsObj.clickNoteHandler}
      removeNoteHandler={paramsObj.removeNoteHandler}
      drawerCallbacks={paramsObj.drawerCallbacks} />
  </IntlProvider>)
}
