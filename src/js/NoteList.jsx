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

  noteClick(pageId) {
    this.props.clickNoteHandler(pageId);
  }

  removeNote(noteId) {
    this.props.removeNoteHandler(noteId);

    const removeNoteIndex = this.state.notes.findIndex(note => note.id === noteId);
    this.state.notes.splice(removeNoteIndex, 1);
    this.setState({ notes: this.state.notes });
  }

  static renderEmpty(formatMessage) {
    return (
      <div className="empty-help" >
        <div className="empty-message" tabIndex="0" role="link">
          <p>{formatMessage(messages.noNotesMsg)}</p>
        </div>
      </div>
    );
  }

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
  drawerCallbacks: PropTypes.object.isRequired
};

export default injectIntl(NoteList);
