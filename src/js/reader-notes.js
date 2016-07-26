//
// In React, an owner is the component that sets the props of other components, if desired.
// See https://facebook.github.io/react/docs/multiple-components.html for composability.
//

import React, {PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import {messages} from './defaultMessages';

class ReaderNotes extends React.Component {

  static propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.shape({
      elementId: PropTypes.string.isRequired,
      locale: PropTypes.string
    })
  };

  goToNote() {
    alert('Navigate to note');  
  }
  
  editNote() {
    alert('Navigate to note and open edit modal');  
  }
  
  removeNote() {
    alert('Remove note');
  }
  
  showMore() {
    alert('Show more');
  }
  
  constructor(props) {
    super(props);
  }
  
  render() {
    const {formatMessage} = this.props.intl;
    //{formatMessage(messages.title)}
    //{formatMessage(messages.placeholder)}
    return (
        <div id="notes" className="notes" role="main">
            <div className="notes-header">
                <h1>{formatMessage(messages.title)}</h1>                    
            </div>    
    
            <div className="notes-body">             
                <div className="notes-content">            
                    <div id="21469257036459" className="note-row">
                        <a href="javascript:void(0);" 
                           className="clickable" 
                           onClick={this.goToNote} 
                           ui-keypress="{'enter': 'noteCtrl.goToNote(note)'}" 
                           tabindex="0">
                            <span className="color-dot Pink">
                                <span className="reader-only" 
                                      translate-value-color="Pink" 
                                      translate="course.notes.NOTE_COLOR">
                                    Pink Highlight
                                </span>
                            </span>
                            <div className="note-content">                                
                                <p>
                                    <strong>Highlighted:</strong>
                                    <q>born in the United States or h</q>
                                </p>                                
                                <time datetime="2016-07-22T23:57:16-0700" className="note-date">7/22/16 11:57 pm</time>
                            </div>
                        </a>
                        <a href="javascript:void(0);" 
                           tabindex="0" className="edit" 
                           onClick={this.editNote} 
                           ui-keypress="{'enter': 'noteCtrl.editNote(note, note.annotationId); $event.stopPropagation()'}" 
                           aria-label="Edit highlight">
                            <i className="pe-icon--info-circle"></i>
                        </a>
                        <a href="javascript:void(0);" 
                           tabindex="0" 
                           className="remove" 
                           onClick={this.removeNote}  
                           ui-keypress="{'enter': 'noteCtrl.removeNote(note, note.annotationId); $event.stopPropagation()'}" 
                           aria-label="Remove highlight">
                            <i className="pe-icon--trash-o"></i>
                        </a>
                    </div>
                    <div id="21469257045951" className="note-row">
                        <a href="javascript:void(0);" 
                           className="clickable" 
                           ng-click="noteCtrl.goToNote(note)" 
                           ui-keypress="{'enter': 'noteCtrl.goToNote(note)'}" 
                           tabindex="0">
                            <i className="pe-icon--envelope color-dot green-icon">
                                <span className="reader-only" translate-value-color="Green" translate="course.notes.NOTE_COLOR">Green Highlight</span>
                            </i>                            
                            <div className="note-content">                                
                                <p><strong>Highlighted:</strong><q ng-bind-html="note.selectedText">oncept of having both a</q></p>
                                <p className="user-note"><strong>Your Note: </strong>this is a green note and its very long so much so that it has to be cut off using ellipsesLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                <time datetime="2016-07-22T23:57:25-0700" className="note-date">7/22/16 11:57 pm</time>
                                <p className="text-toggle" onClick={this.showMore}>Show More</p>
                            </div>
                        </a>
                        <a href="javascript:void(0);" 
                            tabindex="0" className="edit" 
                            onClick={this.editNote}  
                            ui-keypress="{'enter': 'noteCtrl.editNote(note, note.annotationId); $event.stopPropagation()'}" 
                            aria-label="Edit highlight">
                             <i className="pe-icon--info-circle"></i>
                         </a>
                         <a href="javascript:void(0);" 
                            tabindex="0" 
                            className="remove" 
                            onClick={this.removeNote}  
                            ui-keypress="{'enter': 'noteCtrl.removeNote(note, note.annotationId); $event.stopPropagation()'}" 
                            aria-label="Remove highlight">
                             <i className="pe-icon--trash-o"></i>
                         </a>
                    </div>
                    <div id="21469257056732" className="note-row">
                        <a href="javascript:void(0);" 
                           className="clickable" 
                           ng-click="noteCtrl.goToNote(note)" 
                           ui-keypress="{'enter': 'noteCtrl.goToNote(note)'}" 
                           tabindex="0">
                            <i className="pe-icon--envelope color-dot yellow-icon">
                                <span className="reader-only" translate-value-color="Yellow" translate="course.notes.NOTE_COLOR">Yellow Highlight</span>
                            </i>
                            <div className="note-content">                                
                                <p><strong>Highlighted:</strong><q ng-bind-html="note.selectedText" >what it means to be</q></p>                                
                                <p className="user-note"><strong>Your Note: </strong>this is a yellow note</p>
                                <time datetime="2016-07-22T23:57:36-0700" className="note-date">7/22/16 11:57 pm</time>
                            </div>
                        </a>
                        <a href="javascript:void(0);" 
                            tabindex="0" className="edit" 
                            onClick={this.editNote}  
                            ui-keypress="{'enter': 'noteCtrl.editNote(note, note.annotationId); $event.stopPropagation()'}" 
                            aria-label="Edit highlight">
                             <i className="pe-icon--info-circle"></i>
                         </a>
                         <a href="javascript:void(0);" 
                            tabindex="0" 
                            className="remove" 
                            onClick={this.removeNote}  
                            ui-keypress="{'enter': 'noteCtrl.removeNote(note, note.annotationId); $event.stopPropagation()'}" 
                            aria-label="Remove highlight">
                             <i className="pe-icon--trash-o"></i>
                         </a>
                    </div>
                    <div id="21469257071013" className="note-row">
                        <a href="javascript:void(0);" 
                           className="clickable" 
                           ng-click="noteCtrl.goToNote(note)" 
                           ui-keypress="{'enter': 'noteCtrl.goToNote(note)'}" 
                           tabindex="0">
                            <span className="color-dot Green" >
                                <span className="reader-only" translate-value-color="Green" translate="course.notes.NOTE_COLOR">Green Highlight</span>
                            </span>
                            <div className="note-content">                                
                                <p><strong>Highlighted:</strong><q ng-bind-html="note.selectedText">mean to be “Amer</q></p>
                                <time datetime="2016-09-22T23:57:51-0700" className="note-date">7/22/16 11:57 pm</time>
                            </div>
                        </a>
                        <a href="javascript:void(0);" 
                            tabindex="0" className="edit" 
                            onClick={this.editNote}  
                            ui-keypress="{'enter': 'noteCtrl.editNote(note, note.annotationId); $event.stopPropagation()'}" 
                            aria-label="Edit highlight">
                             <i className="pe-icon--info-circle"></i>
                         </a>
                         <a href="javascript:void(0);" 
                            tabindex="0" 
                            className="remove" 
                            onClick={this.removeNote}  
                            ui-keypress="{'enter': 'noteCtrl.removeNote(note, note.annotationId); $event.stopPropagation()'}" 
                            aria-label="Remove highlight">
                             <i className="pe-icon--trash-o"></i>
                         </a>
                    </div>
                    <div id="21469257071013" className="note-row">
                        <a href="javascript:void(0);" 
                           className="clickable" 
                           ng-click="noteCtrl.goToNote(note)" 
                           ui-keypress="{'enter': 'noteCtrl.goToNote(note)'}" 
                           tabindex="0">
                            <span className="color-dot Pink" >
                                <span className="reader-only" translate-value-color="Pink" translate="course.notes.NOTE_COLOR">Pink Highlight</span>
                            </span>
                            <div className="note-content">                                
                                <p><strong>Highlighted:</strong><q ng-bind-html="note.selectedText">last example be “American"</q></p>
                                <time datetime="2016-08-22T23:57:51-0700" className="note-date">7/22/16 11:57 pm</time>
                            </div>
                        </a>
                        <a href="javascript:void(0);" 
                            tabindex="0" className="edit" 
                            onClick={this.editNote}  
                            ui-keypress="{'enter': 'noteCtrl.editNote(note, note.annotationId); $event.stopPropagation()'}" 
                            aria-label="Edit highlight">
                             <i className="pe-icon--info-circle"></i>
                         </a>
                         <a href="javascript:void(0);" 
                            tabindex="0" 
                            className="remove" 
                            onClick={this.removeNote}  
                            ui-keypress="{'enter': 'noteCtrl.removeNote(note, note.annotationId); $event.stopPropagation()'}" 
                            aria-label="Remove highlight">
                             <i className="pe-icon--trash-o"></i>
                         </a>
                    </div>
                </div>
            </div>
            <div id="notes-assert-container" role="alert" aria-live="assertive" class="reader-only"></div>
        </div>
    )
  }

}

export default injectIntl(ReaderNotes); // Inject this.props.intl into the component context
