/**
PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 *  Copyright © 2017 Pearson Education, Inc.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Pearson Education, Inc.  The intellectual and technical concepts contained
 * herein are proprietary to Pearson Education, Inc. and may be covered by U.S. and Foreign Patents,
 * patent applications, and are protected by trade secret or copyright law.
 * Dissemination of this information, reproduction of this material, and copying or distribution of this software
 * is strictly forbidden unless prior written permission is obtained
 * from Pearson Education, Inc.
**/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import Note from './Note';
import { messages } from './defaultMessages';

class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: this.props.notes
    };
    this.noteClick = this.noteClick.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  noteClick = (pageId, annId) => (
    this.props.clickNoteHandler(pageId, annId)
  )

  removeNote = (noteId) => {
    this.props.removeNoteHandler(noteId);
    const removeNoteIndex = this.state.notes.findIndex(note => note.id === noteId);
    this.state.notes.splice(removeNoteIndex, 1);
    this.setState({ notes: this.state.notes });
  }

  renderEmpty = formatMessage => (
    <div className="empty-help" >
      <div className="empty-message" tabIndex="0" role="link">
        <p>{formatMessage(messages.noNotesMsg)}</p>
      </div>
    </div>
  )

  renderNotes() {
    return this.props.notes.map(note => (
      <Note
        key={note.id}
        id={note.id}
        author={note.author}
        pageId={note.pageId}
        color={note.color}
        comment={note.comment}
        text={note.text}
        time={note.time}
        removeNote={this.removeNote}
        noteClick={this.noteClick}
        drawerCallbacks={this.props.drawerCallbacks}
        intl={this.props.intl}
      />
      ));
  }

  render() {
    const { formatMessage, formatDate, formatTime } = this.props.intl;
    return (
      <div id="notes" role="main">
        <div className="notes-body">
          {(this.props.notes.length === 0) ?
            this.renderEmpty(formatMessage) :
            this.renderNotes(formatMessage, formatDate, formatTime)}
        </div>
        <div id="notes-assert-container" role="alert" aria-live="assertive" className="reader-only" />
      </div>
    );
  }
}

NoteList.propTypes = {
  intl: intlShape.isRequired,
  notes: PropTypes.array.isRequired,
  clickNoteHandler: PropTypes.func.isRequired,
  removeNoteHandler: PropTypes.func.isRequired,
  drawerCallbacks: PropTypes.object
};
NoteList.defaultProps = {
  drawerCallbacks: {}
};

export default injectIntl(NoteList);
