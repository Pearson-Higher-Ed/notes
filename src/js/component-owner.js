import React, {PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import {messages} from './defaultMessages';

class ComponentOwner extends React.Component {   
  constructor(props) {
    super(props);
    
    this.state = {notes: this.props.notes};
    this.removeNote = this.removeNote.bind(this);
  }  
  
  removeNote(noteId) {
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
              color={note.color} 
              comment={note.comment} 
              text={note.text} 
              time={note.time}
              removeNote={that.removeNote}
              translations={that.props.intl} />        
      );
    });   
  }
  
  render() {
    return (
      <div id="notes" role="main">
          <div className="notes-body">             
              <div className="notes-content">
                  {(this.props.notes.length === 0) ? this.renderEmpty() : this.renderNotes()}
              </div>
          </div>
          <div id="notes-assert-container" role="alert" aria-live="assertive" class="reader-only"></div>
      </div>
    )
  }
}

ComponentOwner.propTypes = {
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  notes: PropTypes.array   
};

class Note extends React.Component {  
  constructor(props) {
    super(props);
    
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    
    this.state = {isExpanded: false};
  }  
  
  handleNoteClick() {
    alert('note clicked');
  }
  
  handleDeleteClick(noteId) {
    this.props.removeNote(noteId);
  }
  
  handleShowMore() {
    this.setState({isExpanded: !this.state.isExpanded});
  }
  
  renderIcon(commentExists) {
    if (commentExists) {
      return(
        <i className={this.props.color.toLowerCase() + '-icon pe-icon--envelope color-dot'}>
                <span className="reader-only">{this.props.color} Highlight</span>
        </i>               
      )  
    }    
    else {
      return (
        <span className={this.props.color + ' color-dot'}>
            <span className="reader-only">
                {this.props.color} Highlight
            </span>
        </span>       
      )  
    }
  }
  
  render() {                       
    const that = this;
    const {formatMessage} = this.props.translations;
    const {formatDate} = this.props.translations;
    const commentExists = (this.props.comment) ? true : false;   
    
    return (
      <div className="note-row">
          <a href="javascript:void(0);"              
             ui-keypress="{'enter': 'noteCtrl.goToNote(note)'}" 
             tabindex="0">
              {this.renderIcon(commentExists)} 
              <div className="note-content">
                  <div>
                      <p className="dotdotdot" onClick={this.handleNoteClick} >
                          <strong>{formatMessage(messages.highlighted)}</strong>
                          <q>{this.props.text}</q>
                      </p>
                  </div>                  
                  <div className={commentExists ? '' : 'hide'}>
                      <p className={`user-note ${this.state.isExpanded ? '' : 'dotdotdot'}`}>
                          <strong>{formatMessage(messages.yourNote)}</strong>
                          {this.props.comment}
                      </p>                    
                      <p className="text-toggle" onClick={this.handleShowMore}>{this.state.isExpanded ? formatMessage(messages.showLess) : formatMessage(messages.showMore)}</p>
                  </div>
                  <span className="note-date">
                    <time value={this.props.time}>
                      {formatDate(new Date(this.props.time), {
                        year : 'numeric',
                        month: 'numeric',
                        day  : 'numeric'
                      })}</time>
                    <span> | </span>
                    <time value={this.props.time}>
                      {formatDate(new Date(this.props.time), {
                        hour : 'numeric',
                        minute: 'numeric',
                        second  : 'numeric'
                      })}
                    </time>
                  </span>
              </div>
          </a>
          <a href="javascript:void(0);" 
             tabindex="0" 
             className="remove" 
             onClick={this.handleDeleteClick.bind(that, this.props.id)}  
             ui-keypress="{'enter': 'noteCtrl.removeNote(note, note.annotationId); $event.stopPropagation()'}" 
             aria-label="Remove highlight">
              <i className="pe-icon--trash-o"></i>
          </a>
      </div>
    )
  }
}

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
