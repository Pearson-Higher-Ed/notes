import ReaderNotes from '../main';

function init() {  
  // Mock data for notes component  
  const mockData = [{id: 1, author: 'Pete Hunt', time: 86400000, text: 'This is the first note and its about two lines long ifdsfd sfdfdsffe wafeaw feaw fewa fewa fea fewafea feaw feaw feaw dsa fdsfds fdsaf dsaf ewaf ewaf ewa fewa fewa fewa ewa few fewaf ewa fewa fewa fewa few few afewa fe fewa feaw fea faewa fefwa fes the first highlighted text', comment: '', color: 'Green'},
                    {id: 2, author: 'Bob Schumer', time: 86400000, text: 'This is the second note feaw fea feaw fea fea fea fea feafef w afewaf e ewafeaw end highl fewa fewaf ewa fewaf ewaf ewa fewa few fewa fewa fewa fewa fewafe wa feawf edfdsfdsafewe fewa fewa fea fea feaw fea fewa fea afewafew afeaw fewa fewa fewa fewa fewafa fea fea fewa fewa feaw feaw fewa fewa fewa fewa feafeafes ighted text', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nisi ligula, dapibus a volutpat sit amet, mattis et dui. Nunc porttitor accumsan orci id luctus. Phasellus ipsum metus, tincidunt non rhoncus id, dictum a lectus. Nam sed ipsum a lacus sodales eleifend. Vestibulum lorem felis, rhoncus elementum vestibulum eget, dictum ut velit. Nullam venenatis, elit in suscipit imperdiet, orci purus posuere mauris, quis adipiscing ipsum urna ac quam.', color: 'Green'},
                    {id: 3, author: 'Jay Williams', time: 86400000, text: 'This is the third notes highlighted text', comment: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.', color: 'Pink'},
                    {id: 4, author: 'Jordan Walke', time: 86400000, text: 'This is the four notes highlighted text', comment: '', color: 'Yellow'},
                    {id: 5, author: 'Shandy Miller', time: 86400000, text: 'This is the fifth notes highlighted text', comment: 'This is the fifth from the instructor', color: 'Instructor'}];   

  // Create new instance of notes component
  new ReaderNotes({
    elementId: 'notes-demo',    
    locale:'en',
    notes: mockData
  });
}

window.onload = init;
