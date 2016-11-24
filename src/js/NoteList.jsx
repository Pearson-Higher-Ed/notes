import React, {Component} from 'react';
import Note from './Note';
import ReactDOM from 'react-dom';

export default class NoteList extends Component {
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
    return (
      <div className="empty-help" >
         <div className="empty-message" tabIndex="0">
             <p>When you highlight text or add notes, they will appear here.</p>
         </div>
      </div>
    )
  }

  handleFocus(id) {
    let Note = this.refs['Note' + id];
    if (!Note) return;
    let a = Note.refs.a;
    ReactDOM.findDOMNode(a).focus();
  }

  renderNotes() {
    const that = this;

    return this.props.notes.map(function(note, i) {
      return (
        <Note key={i}
              id={i}
              noteId={note.id}
              author={note.author}
              pageId={note.pageId}
              color={note.color}
              comment={note.comment}
              text={note.text}
              time={note.time}
              removeNote={that.removeNote} 
              handleFocus={that.handleFocus.bind(that)} 
              ref={'Note' + i}/>
      );
    });
  }

  render() {
    return (
      <div id="notes" role="main">
          <div className="notes-body">
              {(this.props.notes.length === 0) ? this.renderEmpty() : this.renderNotes()}
          </div>
          <div id="notes-assert-container" role="alert" aria-live="assertive" className="reader-only"></div>
      </div>
    )
  }
}
