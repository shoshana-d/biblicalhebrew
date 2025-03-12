
"use strict";


// code executed on load
//----------------------
document.addEventListener('DOMContentLoaded', function() {
    var ii;
	var i;
	var j;

	// sigh.. not used any more (sfter all that work)
  // create the table of contents
  //const tocSidenav = document.getElementById("TOCSidenav");
  //if (!(tocSidenav == null)) {   createTOC();}.

  
  // this code now in biblical_hebrew_soundclick.js
  
      //--------- code relating to content created in HTML ------------------------	
      //---------------------------------------------------------------------------
  
  // add event listeners to the lists or individual items which have been created in HTML 
  // (event listeners for lists created in JS are added when the list is created)

  // var thisClass = document.getElementsByClassName("soundclick");
 //  for (j = 0; j < thisClass.length; j++) {addsoundclickEventListener(thisClass[j]);}
 
   //---------------------------------------------------------------------------

   //------ code creating content----------------------------------------
   //-------------------------------------------------------------------
     // create the clickable flexbox lists in JS  (includes event listeners)  
     //  (ii required, i doesn't work, seems to get reset in function that's called)
     //  June 2022. Was because i was not declared in called function so became global
	 //  Now using "use strict;" everywhere to avoid this happening again

// now in biblical_hebrew_flexbox_list.js
 
//   var javascriptListClass = document.getElementsByClassName("javascript-list");
//   for (ii = 0; ii < javascriptListClass.length; ii++) {
// 	  var thisSpec = javascriptListClass[ii];
//      createJavascriptList(thisSpec); 
//   }
	   
 
   // create the drag drop flexboxes in JS  (includes event listeners) 
   var onloadDragClass = document.getElementsByClassName("onload-flex-drag-drop");
   for (ii = 0; ii < onloadDragClass.length; ii++) {
    //var thisId = onloadDragClass[ii].id;
      //createFlexDragDrop(thisId);
      var thisSpec = onloadDragClass[ii];
      createFlexDragDrop(thisSpec);
   }	
    
//---------------------------------------------------------------------------


     // create Lesson 1 exercise (who spoke to whom)   
   var onloadLesson1Exercise = document.getElementsByClassName("onload-lesson1-exercise");
   for (ii = 0; ii < onloadLesson1Exercise.length; ii++) {
	  var thisDiv = onloadLesson1Exercise[ii];
      createLesson1Exercise(thisDiv);
   }	


})

