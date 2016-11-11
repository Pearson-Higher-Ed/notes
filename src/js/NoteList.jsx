import React, {PropTypes} from 'react';
// import { intlShape, injectIntl } from 'react-intl';
import { messages } from './defaultMessages';
import Note from './Note';

export default class NoteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {notes: this.props.notes};
    this.removeNote = this.removeNote.bind(this);
  }

  removeNote(noteId) {
    if (this.props.store) {
      this.props.store.dispatch(this.props.actions.deleteAnnotation(noteId));
    }
    const removeNoteIndex = this.state.notes.findIndex(note => note.id === noteId);
    this.state.notes.splice(removeNoteIndex, 1);
    this.setState({notes: this.state.notes});
  }

  renderEmpty() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="empty-help" >
         <div className="empty-message" tabindex="0">
             <p>{formatMessage(messages.emptyMessage)}</p>
         </div>
      </div>
    )
  }

  renderNotes() {
    const that = this;

    return this.props.notes.map(function(note, i) {
      return (
        <Note key={i}
              id={note.id}
              author={note.author}
              pageId={note.pageId}
              color={note.color}
              comment={note.comment}
              text={note.text}
              time={note.time}
              removeNote={that.removeNote} />
      );
    });
  }

  render() {
    return (
      <div id="notes" role="main">
          <div className="notes-body">
              {(this.props.notes.length === 0) ? this.renderEmpty() : this.renderNotes()}
          </div>
          <div id="notes-assert-container" role="alert" aria-live="assertive" class="reader-only"></div>
      </div>
    )
  }
}

// NoteList.propTypes = {
//   intl: intlShape.isRequired,
//   locale: PropTypes.string,
//   store: PropTypes.object,
//   actions: PropTypes.object,
//   notes: PropTypes.array
// };

// export default injectIntl(NoteList); // Inject this.props.intl into the component context
