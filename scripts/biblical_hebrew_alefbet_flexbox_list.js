
"use strict";

// code executed on load
//-----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    //------ code creating content----------------------------------------
   //-------------------------------------------------------------------
     // create the clickable flexbox lists in JS  (includes event listeners)  

  var i;

   var javascriptListClass = document.getElementsByClassName("javascript-list");
   for (i = 0; i < javascriptListClass.length; i++) {
 	  var thisSpec = javascriptListClass[i];
      createJavascriptList(thisSpec); 
   }
 
})
//---------------------------------------------------------------------



//---- flexboxes containing clickable lists of letters
//----------------------------------------------------
	
function reCreateJavascriptList(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications
	
	// need to use this when want to shuffle lists which have dividers
	// or select different content for a list
  var j;
	// first, delete existing list
      // get the id of the flexbox list
   var thisSpecElement = document.getElementById(thisSpecId);
   if (thisSpecElement==null ) { return;}	
   
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   var targetId = null;
   for (j = 0; j < parameters.length; j++) {
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 if (thisP0 == "id"){
		    targetId = thisP[1].trim();
			break;
		 } 
   }
   if (targetId==null ) { return;}	// have to specify an id

    // now remove the list if it exists
	 
   var thisList = document.getElementById(targetId);	 
   if (!( thisList== null)) {
   	   // first,turn off sound if playing because of arrow click
       turnOffArrowSound() ;	   
	   // remove list
	   thisList.parentNode.removeChild(thisList);
    }

   // now create the list again
  createJavascriptList(thisSpecElement);
	 
}
	
function createJavascriptList(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the flexbox
	
	// 2 alternative ways of specifying hebrew and sound content
	// (i) in single source (sourceId) with hebrew:sound pairs and separated by |
	// (ii) in 2 sources (sourceHebrewId and sourceSoundId) either
	//        (a)separated by | in each list
	//           or
	//        (b)hebrew in separate paragraphs and sounds separated by |
	//           if hebrew in separate paras, reference must be <div> that encloses them
	//  All methods have  optional spacers |-| eg hebrew:sound|- :-|hebrew:sound specifying spaces between items
	// Optional tooltips (separated by | or in separate paragraphs) always in separate source
	//                    if tooltips in separate paras, reference id must be in a <div>, not in a <p>
	 


   var j;
   var i;

   var flexboxClass = "flex-container-rtl"; // used for all hebrew flexboxes with audio arrow
   var containerClass = "flex-container-heb";  // specifies size of gap between items, default
   var hebrewClass = "hebrew35";  // default								   
   var tooltipsClass = "flex-container-tooltip"; // default
   var colorClass = "main-color";

   var sourceId = null;  // the id of the HTML para with the hebrew and sound combined
   var sourceHebrewIds = null; // alternative to single source for hebrew and sound
   var sourceSoundIds = null; 
   var targetId = null;  // the id of the list to be created
   var audioDir = null;  //replaces above, name of sub-directory containing audio
   var hebrewSeparateParas = false;  // if true, Hebrew in separate paragraphs which are contained in a <div>
                                      // default, Hebrew in single paragraph separated by |
   var hebrewInSyllables = false;  // indicate whether each hebrew word has to be combined into a whole word
   
   var hebrewInImage = false;  // if true, the Hebrew input is the name of the image file; used for standalone vowel marks
   var imagesDir = null;        // if hebrewInImage, the name of the subdirectory of /images where the image files are located
   
   var tooltips = false;
   var tooltipsSourceIds = null;
   var tooltipsSeparateParas = false;  // if true, tooltips in separate paragraphs (necessary for Hebrew tooltips) which are contained in a <div>
                                      // default, tooltips in single paragraph separated by |
   var tooltipsShow = false; // if true, the tooltips are displayed, with no arrows to hide them
   var tooltipsShowStress = false;  // in tooltips, show individual Hebrew syllables with stressed syllable marked
                                    // requires tooltips to be divided by spaces into syllables 
   var tooltipsGroupStressedSyllable = null;     // in tooltipsShowStress specification: one value for each tooltipsSourceIds, values "last" "secondlast"
			//----------------------------------------------------------------				       
			// this  option only used in	alephbet-exercises for consonant+vowel			 
   var selectLetterClick = false;  // indicates whether letterclick event listener added instead of soundclick event listener
           //---------------------------------------------------------------
   var selection =  false;
   var nSelection = 0;
   var arrow = false;
 
  // get the specifications for the flexbox list
  //-----------------------------------------------
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   for (j = 0; j < parameters.length; j++) {
	     var thisParameterSpec = parameters[j];
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 if (thisP0 == "containerclass"){
		    containerClass = thisP[1].trim().toLowerCase();
		 } else if (thisP0 == "hebrewclass"){
		    hebrewClass = thisP[1].trim().toLowerCase();
		 } else if (thisP0 == "tooltipsclass"){
		    tooltipsClass = thisP[1].trim().toLowerCase();
		 } else if (thisP0 == "colorclass"){
		    colorClass = thisP[1].trim();
	     } else if (thisP0 == "source"){
		    sourceId = thisP[1].trim();
		 } else if (thisP0 == "sourcehebrew"){
		    //sourceHebrewId = thisP[1].trim();
		    sourceHebrewIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "sourcesound"){
		    //sourceSoundId = thisP[1].trim();
		    sourceSoundIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "id"){
		    targetId = thisP[1].trim();
		 } else if (thisP0 == "audio"){
		    audioDir = thisP[1].trim();
			
		 } else if (thisP0 == "hebrewseparateparas"){
		    hebrewSeparateParas = true;
		 } else if (thisP0 == "hebrewinsyllables"){
		    hebrewInSyllables = true;

		 } else if (thisP0 == "hebrewinimage"){
			hebrewInImage = true; 
		    imagesDir = thisP[1].trim();
			
		 } else if (thisP0 == "tooltips"){
			tooltips=true;
		    //tooltipsSourceId = thisP[1].trim();
		    tooltipsSourceIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "tooltipsseparateparas"){
		    tooltipsSeparateParas = true;
		 } else if (thisP0 == "showtooltips"){
		    tooltipsShow = true;
		 } else if (thisP0 == "tooltipsshowstress"){
		    tooltipsShowStress = true;
		    tooltipsGroupStressedSyllable = removeFirstItem(thisParameterSpec);  // allowing for possibly multiple specifications
			   
			   // only used in consonant+vowel exercise 
		 } else if (thisP0 == "selectletterclick"){
		    selectLetterClick=true;
			   
         } else if (thisP0 == "selection"){
	        selection = true;
	        nSelection = thisP[1].trim();
		 } else if (thisP0 == "arrow"){
		    arrow=true;
		 } 
   }



   // check consistency of specifications
   //-----------------------------------   
	if (tooltips){
		if (tooltipsShowStress) {
		   if (tooltipsGroupStressedSyllable == null) { return;}
		}		
	}	

   // get contents of new flexbox
   //----------------------------
    var hebrew = [];
    var sound = [];
    if (tooltips) {
		var tips = [];
		if (tooltipsShowStress) {var tooltipsStressedSyllable = [];}
	}	

     // read in hebrew and sounds from HTML
	//---------------------------------------
   if (sourceId != null){
	  // hebrew and sounds in a single source
	  
	  // can't have hebrewInSyllables or hebrewStressedSyllable
	  // no multiple sources
  	  
	  var nGroups = 0;

      var sourceElement = document.getElementById(sourceId);
	  if (sourceElement == null) { return;}
      var source = sourceElement.innerHTML.split(globalDivider1);
      for (j = 0; j < source.length; j++) {
		  var thisSource = source[j].split(globalDivider2);
		  hebrew[nGroups] = thisSource[0];
		  sound[nGroups] = thisSource[1];
          nGroups++;
 	  }	  
	     
   } else if (sourceHebrewIds != null &  sourceSoundIds != null){
   // hebrew and sounds in separate sources  
      
	  //-- get sounds --
	    var idsArray = sourceSoundIds.split(globalDivider2);
 	    for (i=0; i < idsArray.length; i++) { 
	       var temp = getFromHTML(idsArray[i].trim(), false);
	       sound = sound.concat(temp);
	    }  
   
       //-- get hebrew--
        var idsArray = sourceHebrewIds.split(globalDivider2);
		
        for (i=0; i < idsArray.length; i++) { 
	       var temp1 = getFromHTML(idsArray[i].trim(), hebrewSeparateParas);
	       hebrew = hebrew.concat(temp1);
	    }  
 
   } else {
       return;
   }
 
   // check that same number of items in hebrew and sound
      if (hebrew.length !=  sound.length)  { return;  }	// this is an error 

   // read in tooltips (if any) from HTML 
      if (tooltips) { 
	  	 var idsArray = tooltipsSourceIds.split(globalDivider2);
	  
	     if (tooltipsShowStress){
			 var stressedSyllableArray = tooltipsGroupStressedSyllable.split(globalDivider2);
         }
		 
 	     for (i=0; i < idsArray.length; i++) { 
	        var temp1 = getFromHTML(idsArray[i].trim(), tooltipsSeparateParas);
	        tips = tips.concat(temp1);
			
			if (tooltipsShowStress){
				var temp2 = [];
			    for (j=0; j < temp1.length; j++) {
				   temp2[j] = stressedSyllableArray[i];
			    }
                tooltipsStressedSyllable = tooltipsStressedSyllable.concat(temp2);			  
            }
	     } 
		 
	  // check that same number of items in tooltips as in hebrew and sound
         if (!(hebrew.length ==  tips.length) ) { return;  }	// this is an error 
      }
 

     // now get final contents
 	 
	  if (selection) {   // need random selection of items
         var tempHebrew = cloneArray(hebrew);
         var tempSound = cloneArray(sound);
 		// if (cantillation) { var tempHebrewStressedSyllable = cloneArray(hebrewStressedSyllable);    }  
         if (tooltips) {
			 var tempTooltips = cloneArray(tips);
			 if (tooltipsShowStress) {var tempTooltipsStressedSyllable = cloneArray(tooltipsStressedSyllable);}
		 }
		 
		 var nhebrew = hebrew.length;
		 
		 if ( nhebrew < nSelection) {
			 
			 // this will only happen with c+v when there are not enough combinations
			 // add random selection to make up numbers
			 // since only c+v only need Hebrew and sounds
		     for (i = nhebrew; i < nSelection; i++){
				 
                 var thisIndex = getRandomInteger(0,nhebrew-1);
				 tempHebrew[i] = hebrew[thisIndex];
				 tempSound[i] = sound[thisIndex];
			 }	 
     
	         nhebrew = nSelection;
         }		 
	   
	     hebrew.length = 0;
		 sound.length = 0;
	     if (tooltips) {
	 		 tips.length = 0;
	 	 	 if (tooltipsShowStress) {tooltipsStressedSyllable.length = 0; }
	 	 }
         var selectionList = shuffleArray(createIntegerArray(0, nhebrew -1));
	 	 for (i=0; i < nSelection; i++) { 
            hebrew[i] = tempHebrew[selectionList[i]];
            sound[i] = tempSound[selectionList[i]];
 	        if (tooltips) {
	 		   tips[i] = tempTooltips[selectionList[i]];
	 	 	   if (tooltipsShowStress) {tooltipsStressedSyllable[i] = tempTooltipsStressedSyllable[selectionList[i]]; }
	 		}
	 	 }
	   
	   
	  }
		   

       // now create the new flexbox
	   //---------------------------
  
   var flexdiv = document.createElement("div");

   flexdiv.classList.add(flexboxClass);
   flexdiv.classList.add(containerClass);
   flexdiv.classList.add(colorClass);
   if (!(targetId == null)) {flexdiv.setAttribute("id", targetId);}

       // add arrow at start if requested
   if (arrow ){
		var celldiv = document.createElement("div");
 
        var span = document.createElement("span");
        //span.classList.add("hebrew35");
        span.classList.add("start-audio");
		span.classList.add("arrowclick");
		
        celldiv.appendChild(span);
        flexdiv.appendChild(celldiv);
   }
  
	 // now add contents of each flexbox cell

   for (i=0; i < hebrew.length; i++){
 
     //var thisHebrew = hebrew[i].trim();
	  var celldiv = document.createElement("div");	
 	  
      var thisHebrew = hebrew[i];
	  var thisSound = sound[i];
 	  if (thisHebrew[0].trim() == "-"){
         celldiv.classList.add("flex-container-spacer");
         flexdiv.appendChild(celldiv);
	  
	  } else {
 			  
             if (hebrewInSyllables){ 
                 // combine hebrew syllables into words if required
	               thisHebrew = wordFromSyllables(thisHebrew);
			 }	
			  
			 if (hebrewInImage){
			    var img1 = document.createElement("img");
	            img1.src = setJpgName(thisHebrew, imagesDir);
				img1.classList.add(hebrewClass);
			    if (selectLetterClick) {img1.classList.add( "selectletterclick");}
		        else                   {img1.classList.add("soundclick");}
		        celldiv.appendChild(img1);
             } else {
			    var text1= document.createTextNode(thisHebrew);
	            var span1 = document.createElement("span");
 	            span1.appendChild(text1);
				span1.classList.add(hebrewClass);
			    if (selectLetterClick) {span1.classList.add( "selectletterclick");}
		        else                   {span1.classList.add("soundclick");}
		        celldiv.appendChild(span1);
		     }
			 var span2 = crAudioSpan(addAudioDirToSoundName(thisSound, audioDir));
		     celldiv.appendChild(span2);
		
		     if (tooltips) {
		 
		       if (!(tooltipsShow)) {
               //var text3= document.createTextNode(" ");
                 var para3 = document.createElement("p");
		         para3.classList.add("button-plus-minus-tooltip"); // puts some padding at the top of the para
	             var span3 = document.createElement("span");
			   // span3.appendChild(text3);
		         span3.classList.add("button-plus");
		         span3.classList.add("tooltip-button-marker"); // no CSS, just a marker
			     para3.appendChild(span3);
			     celldiv.appendChild(para3);
		       } 
			 
               var para4 = document.createElement("p");
				
			   if (!(tooltipsShowStress)) {	
 			      var text4= document.createTextNode(tips[i]);
                  para4.appendChild(text4);
			   } else {
                
                  var thisTipsArray = splitIntoArrayAtSpaces(tips[i]);
				  var thisStressedSyllableNumber = getStressedSyllableNumber(tips[i],tooltipsStressedSyllable[i]);
	          
                  for (j=0; j < thisTipsArray.length; j++){
				  	 var text1= document.createTextNode(thisTipsArray[j]);
	                 var span1 = document.createElement("span");
					 if (thisStressedSyllableNumber == j ){	span1.classList.add("stressed-syllable")};
 	                 span1.appendChild(text1);
                     para4.appendChild(span1);
					 
					 var text2 = document.createTextNode(" ");
		             para4.appendChild(text2);
				  }	  
               }				   
		       if (!(tooltipsShow)) {para4.classList.add("hidden");}
 		       if (!(tooltipsClass == null)){para4.classList.add(tooltipsClass);}
		       para4.classList.add("tooltip-marker");  // no CSS content, just a marker 
 
               celldiv.appendChild(para4);
             }	// tooltips	  

 		     flexdiv.appendChild(celldiv);
 		
	  }	// not "-"  
   }	  

   // finished creating the celldiv with the flexbox items
//test("hello from createJavascriptList " + targetId);
   // add event listeners to flexbox
    var flexdivElements =  flexdiv.getElementsByTagName("*");
    for (i=0; i < flexdivElements.length; i++){
      if (flexdivElements[i].classList.contains("soundclick")) {
		 addsoundclickEventListener(flexdivElements[i]);
      } else if (flexdivElements[i].classList.contains("selectletterclick")) {
         addSelectLetterEventListener(flexdivElements[i]);  
	  } else if (flexdivElements[i].classList.contains("arrowclick")) {
		 addArrowclickEventListener(flexdivElements[i]);
	  }
		  
	    // tooltips
      if (flexdivElements[i].classList.contains("tooltip-button-marker")) {
           flexdivElements[i].addEventListener("click", function(){ShowHideParentNextSibling(event.target)});
      }

    } 

   // add flexbox to document	
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);

}


//----------------------------------------------------------

 function shuffleJavascriptList(thisId){
	var i;

    const container = document.getElementById(thisId);
	if (container == null){ return;}

	// turn off sound if playing because of arrow click
    turnOffArrowSound()

    var hebrew0 = [];
	var sound0 = [];
	var tooltips0 = [];
	
	var soundclicks = container.getElementsByClassName("soundclick");
	if (soundclicks.length == 0) {return;}
	
	var imageList = false;
	if (soundclicks[0].tagName.trim().toLowerCase() == "img"){imageList = true;}
	
	var tooltipMarkers = container.getElementsByClassName("tooltip-marker");

	if (tooltipMarkers.length == 0) { var hasTooltips = false; }
	else {
		if (!(tooltipMarkers.length == soundclicks.length)) { return;}
		else {var hasTooltips = true;}
	}	
	
    for (i=0; i < soundclicks.length; i++){
	   if (imageList) {
          hebrew0[i] = soundclicks[i].src;
       } else {		   
          hebrew0[i] = soundclicks[i].innerHTML;
	   }	  
	   sound0[i] = soundclicks[i].nextSibling.innerHTML
	   if (hasTooltips) { tooltips0[i] = tooltipMarkers[i].innerHTML; }
	}
	
    var shuffleOrder = shuffleArray(createIntegerArray(0, hebrew0.length - 1));	
	var hebrew = [];
	var sound = [];
	var tooltips = [];
    for (i=0;  i < soundclicks.length; i++){
		hebrew[i] = hebrew0[shuffleOrder[i]];
		sound[i] = sound0[shuffleOrder[i]];
		if (hasTooltips) {tooltips[i] = tooltips0[shuffleOrder[i]];}
	}	

	
    for (i=0; i < soundclicks.length; i++){
	   if (imageList) {
 	      soundclicks[i].src = hebrew[i];
       } else {		   
	      soundclicks[i].innerHTML = hebrew[i];
	   }	  
	   soundclicks[i].nextSibling.innerHTML = sound[i] ;
	   if (hasTooltips){tooltipMarkers[i].innerHTML = tooltips[i];  } 
	}
	
  hideTooltips(thisId);
  changeUpArrowToDown(thisId);
	
}	
 

//------------------------------------------------------------------

function hideTooltips(thisId){
   // hide any currently visible tooltips
  var i;
  
  var container = document.getElementById(thisId);
  if (container == null){ return;}
  var tooltips = container.getElementsByClassName("tooltip-marker");
  for (i=0; i < tooltips.length; i++ ) {
	  if (!(tooltips[i].classList.contains("hidden"))) {tooltips[i].classList.add("hidden");}
  }	  
}


function changeUpArrowToDown(thisId){
   // change any up arrow to down 
   // in  up/down arrrows which display/hide material in child nodes\
   
   // now plus/minus instead of arrows
  var i;
  
  var container = document.getElementById(thisId);
  if (container == null){ return;}
  
  var plusminus = container.getElementsByClassName("tooltip-button-marker");

  for (i=0; i < plusminus.length; i++ ) {
    if (plusminus[i].classList.contains("button-minus")){
	   plusminus[i].classList.toggle("button-minus");
       plusminus[i].classList.toggle("button-plus");  
    }
  }	
  

}

function addSelectLetterEventListener(element){
    // selectletter in <span>, letter in following <p> (or <span>)

   element.addEventListener("click", function() {
      this.classList.toggle("select-letter");
      //hideExerciseDiv();
	  //turnOffArrowSound();
   });
}

 



