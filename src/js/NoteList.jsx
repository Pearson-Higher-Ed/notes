import React, {Component} from 'react';
import Note from './Note';

export default class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {notes: this.props.notes};
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
              removeNote={that.removeNote} 
              noteClick={that.noteClick} />
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

NoteList.propTypes = {
  clickNoteHandler: React.PropTypes.func,
  removeNoteHandler: React.PropTypes.func
};
