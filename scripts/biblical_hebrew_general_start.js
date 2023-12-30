
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
	
  //--------- code relating to content created in HTML ------------------------	
  //---------------------------------------------------------------------------
  
  // add event listeners to the lists which have been created in HTML 
  // (event listeners for lists created in JS are added when the list is created)

                // in alefbet, alefbet+, not in alefbet-exercises
   var soundclickClass = document.getElementsByClassName("soundclick");
   for (j = 0; j < soundclickClass.length; j++) {addsoundclickEventListener(soundclickClass[j]);}
 

 
  // add event listeners to the headings to show/hide following div
  
   var soundclickClass = document.getElementsByClassName("showhidenextsiblingclick");
   for (j = 0; j < soundclickClass.length; j++) {
	  var span = document.createElement("span");
	  span.classList.add("button-plus");
      soundclickClass[j].insertBefore(span,soundclickClass[j].firstChild );
      addShowHideNextSiblingEventListener(soundclickClass[j]);
   }

	

  // add event listeners to show/hide element with specified id

   var soundclickClass = document.getElementsByClassName("showhidespecifiedidclick");
   for (j = 0; j < soundclickClass.length; j++) {
      addShowHideSpecifiedIdEventListener(soundclickClass[j]);
	}
  

})
//---------------------------------------------------------------------------

