
"use strict";

// only used in alephbet-exercises for consonant+vowel
var globalFlexlistHebrew = [];
var globalFlexlistSound = [];


function turnOffArrowSound(){
   var j;
   var arrow = document.getElementsByClassName("stop-audio");
   for (j = 0; j < arrow.length; j++) {
	   // arrow has already been clicked, second click stops playing
 	   arrow[j].classList.add("stop-sound");
   }   
}

//---- flexboxes containing clickable lists of letters
//----------------------------------------------------
	
//function reCreateJavascriptList(thisSpecId, displayType){
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
   //createJavascriptList(thisSpecElement, displayType);
  createJavascriptList(thisSpecElement);
	 
}
	
//function createJavascriptList(thisSpecElement, displayType){
function createJavascriptList(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the flexbox
	
	// 3 alternative ways of specifying hebrew and sound content
	// (i) in single source (sourceId) with hebrew:sound pairs and separated by |
	// (ii) in 2 sources (sourceHebrewId and sourceSoundId) either
	//        (a)separated by | in each list
	//           or
	//        (b)hebrew in separate paragraphs and sounds separated by |
	//           if hebrew in separate paras, reference must be <div> that encloses them
	// (iii) in global variables globalHebrew and globalSound which have been populated before creating the list 
	//        (only used in consonant+vowel exercises)
	//  All methods have  optional spacers |-| eg hebrew:sound|- :-|hebrew:sound specifying spaces between items
	//  Method (i) has optional grouping  "(" and ")"(so that items are not divided when width of window changed)
	//  Lists which have dividers must be recreated instead of being shuffled, spec randomgroups
	// Optional tooltips (separated by | or in separate paragraphs) always in separate source
	//                    if tooltips in separate paras, reference id must be in a <div>, not in a <p>

   var j;
   var i;

   var containerClass = "flex-container-heb";  // specifies size of gap between items, default
   var hebrewClass = "hebrew35";  // default								   
   var tooltipsClass = "flex-container-heb-tooltip"; // default
   var colorClass = null;

   var sourceId = null;  // the id of the HTML para with the hebrew and sound combined
   var sourceHebrewIds = null; // alternative to single source for hebrew and sound
   var sourceSoundIds = null; 
   var targetId = null;  // the id of the list to be created
   var audioDir = null;  //replaces above, name of sub-directory containing audio
   
   var hebrewSeparateParas = false;  // if true, Hebrew in separate paragraphs which are contained in a <div>
                                      // default, Hebrew in single paragraph separated by |
   var hebrewInSyllables = false;  // indicate whether each hebrew word has to be combined into a whole word
   var cantillation = false;       // add cantillation marks to Hebrew. Requires hebrewInSyllables 
   var hebrewGroupStressedSyllable = null;     // in cantillation specification:one value for each sourceHebrewId, values "last" "secondlast"
   
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
			// these  options only used in	alephbet-exercises for consonant+vowel			 
   var selectLetterClick = false;  // indicates whether letterclick event listener added instead of soundclick event listener
                              // letterclick event listener
   var sourceGlobal = false; // indicates that the content for hebrew and sounds is already in the
                             // global variables globalHebrew and globalSound
							 // (ie, not in sourceId in the HTML section)
							 // only used in alefbet-exercises consonant+vowel
 	
           //---------------------------------------------------------------
   var selection =  false;
   var nSelection = 0;
   var arrow = false;
   //var arrowType = null;
   var randomOrder = false; // indicates whether items should be shuffled
   var randomGroups = false; // 4/10/23 only used in alefbet-exercises Consonants which look similar but have different sounds
							 
							 // 18/10/23 Groups now defined by ( and ) and can only be specified 
							 // if input is combined hebrew and sound
							 // In the created flexbox list, each group is a separate div
							 // indicates that items within a group should appear in random order
							 // "-" now only used for spacing (separate div in flexbox list) - these lists cannot be shuffled

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
		 } else if (thisP0 == "cantillation"){
			cantillation = true; 
		    //hebrewStressedSyllable = removeFirstItem(thisParameterSpec);  // allowing for possibly multiple specifications
		    hebrewGroupStressedSyllable = removeFirstItem(thisParameterSpec);  // allowing for possibly multiple specifications

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
			
		 } else if (thisP0 == "selectletterclick"){
		    selectLetterClick=true;
		 } else if (thisP0 == "sourceglobal"){
		    sourceGlobal = true;
			   
         } else if (thisP0 == "selection"){
	        selection = true;
	        nSelection = thisP[1].trim();
		 } else if (thisP0 == "arrow"){
		    arrow=true;
		 } else if (thisP0 == "randomorder"){
		    randomOrder=true;
		 } else if (thisP0 == "randomgroups"){
		    randomGroups=true;
		 } 
   }


	  
   // check consistency of specifications
   //-----------------------------------   
    if (cantillation ){
		if (!(hebrewInSyllables)) { return;}
		if (hebrewGroupStressedSyllable == null) { return;}
	}	
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
	//if (cantillation) {var hebrewStressedSyllableNumber = [];}
	if (cantillation) {var hebrewStressedSyllable = [];}


 	  // hebrew and sounds read from global variables (only used in consonant+vowel exercises)
	  //-------------------------------------------------------------------------------------
   if (sourceGlobal) {
 
	  // used when a Hebrew syllables and sounds already created in global variables
	   for (i=0; i < globalFlexlistHebrew.length; i++){
		  hebrew[i] = globalFlexlistHebrew[i];
       }		 
	   for (i=0; i < globalFlexlistSound.length; i++){
		  sound[i] = globalFlexlistSound[i];
       }		 

    // read in hebrew and sounds from HTML
	//---------------------------------------
   } else if (sourceId != null){
	  // hebrew and sounds in a single source
	  
	  // can't have hebrewInSyllables or hebrewStressedSyllable
	  // no multiple sources
  	  
	  // possibly groups indicated by ( and )
	  // used in alefbet  and alefbet-exercises "consonants which look similar"
	  var nGroups = 0;
	  var groupStarted = false;
	  var groupItemNumber = 0;

      var sourceElement = document.getElementById(sourceId);
	  if (sourceElement == null) { return;}
      var source = sourceElement.innerHTML.split(globalDivider1);
      for (j = 0; j < source.length; j++) {
		  var thisSource = source[j].split(globalDivider2);
  
		  if (thisSource[0].trim() == "(") {
			  groupStarted = true;
			  var thisGroupHebrew = [];
			  var thisGroupSound = [];
			  groupItemNumber = 0;
		  } else if (thisSource[0].trim() == ")") {
			  if (randomGroups){
	              // only used in alefbet-exercises "Consonants which look similar but have different sounds"
				  // randomize order in this group
				 var nInGroup =  thisGroupHebrew.length;
				 var order = createIntegerArray(0,nInGroup - 1 );
                 var shuffleOrder = shuffleArray(order);
 				 var tempHebrew = Array.from(thisGroupHebrew); //"shallow" copy
                 var tempSound = Array.from(thisGroupSound);					
                 for (i=0; i < nInGroup; i++){
		             thisGroupHebrew[i] = tempHebrew[shuffleOrder[i]];
		             thisGroupSound[i] = tempSound[shuffleOrder[i]];
				 }
 
              }				 
			  hebrew[nGroups] = thisGroupHebrew;
			  sound[nGroups] = thisGroupSound;
              groupStarted = false;
              nGroups++;
			  
          } else if (groupStarted){
			  thisGroupHebrew[groupItemNumber] = thisSource[0];
			  thisGroupSound[groupItemNumber] = thisSource[1];
			  groupItemNumber++;

          } else {			  
			  hebrew[nGroups] = thisSource[0];
			  sound[nGroups] = thisSource[1];
              nGroups++;
          }
	  }	  
	     
   } else if (sourceHebrewIds != null &  sourceSoundIds != null){
   // hebrew and sounds in separate sources  (no groups)
      
	  //-- get sounds --
	    var idsArray = sourceSoundIds.split(globalDivider2);
 	    for (i=0; i < idsArray.length; i++) { 
	       var temp = getFromHTML(idsArray[i].trim(), false);
	       sound = sound.concat(temp);
	    }  
   
       //-- get hebrew--
        var idsArray = sourceHebrewIds.split(globalDivider2);
		if (cantillation){ var stressedSyllableArray = hebrewGroupStressedSyllable.split(globalDivider2);}
		
        for (i=0; i < idsArray.length; i++) { 
	       var temp1 = getFromHTML(idsArray[i].trim(), hebrewSeparateParas);
	       hebrew = hebrew.concat(temp1);
		   
		   if (cantillation) {
			  var temp2 = [];
			  for (j=0; j < temp1.length; j++) {
				 temp2[j] = stressedSyllableArray[i];
			  }
              hebrewStressedSyllable = hebrewStressedSyllable.concat(temp2);			  
		   }	   
	    }  
 
   } else {
       return;
   }

   // check that same number of items in hebrew and sound
      if (hebrew.length !=  sound.length)  { return;  }	// this is an error 

   // read in tooltips (if any) from HTML (can't have tooltips if there are groups)
      if (tooltips) { 
	  	 var idsArray = tooltipsSourceIds.split(globalDivider2);
	  
	     if (tooltipsShowStress){
			 var stressedSyllableArray = tooltipsGroupStressedSyllable.split(globalDivider2);
		     //var tempStressedSyllables = [];
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
 		 if (cantillation) { var tempHebrewStressedSyllable = cloneArray(hebrewStressedSyllable);    }  
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
		 if (cantillation){hebrewStressedSyllable.length = 0;}
	     if (tooltips) {
	 		 tips.length = 0;
	 	 	 if (tooltipsShowStress) {tooltipsStressedSyllable.length = 0; }
	 	 }
         var selectionList = shuffleArray(createIntegerArray(0, nhebrew -1));
	 	 for (i=0; i < nSelection; i++) { 
            hebrew[i] = tempHebrew[selectionList[i]];
            sound[i] = tempSound[selectionList[i]];
       	    if (cantillation){hebrewStressedSyllable[i] = tempHebrewStressedSyllable[selectionList[i]];}
	        if (tooltips) {
	 		   tips[i] = tempTooltips[selectionList[i]];
	 	 	   if (tooltipsShowStress) {tooltipsStressedSyllable[i] = tempTooltipsStressedSyllable[selectionList[i]]; }
	 		}
	 	 }
	   
	   
	  }
		   
  
       // now create the new flexbox
	   //---------------------------
  
   var flexdiv = document.createElement("div");

   flexdiv.classList.add(containerClass);
   if (!(colorClass == null)) {flexdiv.classList.add(colorClass);}
   if (!(targetId == null)) {flexdiv.setAttribute("id", targetId);}
  
       // add arrow at start if requested
   if (arrow ){
        var span = document.createElement("span");
        //span.classList.add("hebrew35");
        span.classList.add("start-audio");
		span.classList.add("arrowclick");
		
		var celldiv = document.createElement("div");
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
           
		  // more than one hebrew item in this div?
		  if (Array.isArray(thisHebrew)){
			  // yes, can't have hebrew in syllables or cantillation
		     for (j=0; j < thisHebrew.length; j++){
				var span1 = crTextClickSpan(thisHebrew[j], hebrewClass, "soundclick");
 		        celldiv.appendChild(span1);
		  
		        var span2 = crAudioSpan(addAudioDirToSoundName(thisSound[j], audioDir));

		        celldiv.appendChild(span2);
		   
		        var text3= document.createTextNode(" ");
		        celldiv.appendChild(text3);
             }
		
		     flexdiv.appendChild(celldiv);
	
	         var celldiv = document.createElement("div");	
             celldiv.classList.add("flex-container-spacer");
             flexdiv.appendChild(celldiv);
			 
		  } else {
			  // only one hebrew item in this div
			  
             if (hebrewInSyllables){ 
                 // combine hebrew syllables into words if required
	            if (cantillation){
                   var stressedSyllableNumber =  getStressedSyllableNumber(thisHebrew, hebrewStressedSyllable[i]);
                   thisHebrew = wordFromSyllables(addCantillationToStressedSyllable(thisHebrew, stressedSyllableNumber, thisSound,"all"));
                } else {
	               thisHebrew = wordFromSyllables(thisHebrew);
	            }
			 }	
			  
			 if (hebrewInImage){
			    if (selectLetterClick) {var img1 =  crImageClick(thisHebrew, imagesDir, hebrewClass, "selectletterclick");}
		        else                   {var img1 =  crImageClick(thisHebrew, imagesDir, hebrewClass, "soundclick");}
		        celldiv.appendChild(img1);
             } else {
			    if (selectLetterClick) {var span1 = crTextClickSpan(thisHebrew, hebrewClass, "selectletterclick");}
		        else                   {var span1 = crTextClickSpan(thisHebrew, hebrewClass, "soundclick");}
		        celldiv.appendChild(span1);
		     }
			 
			 var span2 = crAudioSpan(addAudioDirToSoundName(thisSound, audioDir));
		     celldiv.appendChild(span2);
	
		     if (tooltips) {
		 
		       if (!(tooltipsShow)) {
               //var text3= document.createTextNode(" ");
                 var para3 = document.createElement("p");
		         para3.classList.add("showhidenextsiblingclick");
		         para3.classList.add("button-plus-minus-tooltip");
	             var span3 = document.createElement("span");
			   // span3.appendChild(text3);
		         span3.classList.add("button-plus");
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
 		
          } // only 1 item
	  }	// not "-"  
   }	  

   // finished creating the celldiv with the flexbox items
   
    // add order to each div 
    // addOrderToFlexdiv(flexdiv);

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
      if (flexdivElements[i].classList.contains("showhidenextsiblingclick")) {
           addShowHideNextSiblingEventListener(flexdivElements[i]);
      }

    } 

   // add flexbox to document	
   //thisElement.parentNode.insertBefore(flexdiv, thisElement);
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);
   
   if (randomOrder) {shuffleJavascriptList(targetId);}

}
function crImageClick(imageName, imageDir, imgClass, clickType){
	var image1 = document.createElement("img");
	image1.src = setJpgName(imageName, imageDir);
	image1.classList.add(imgClass);
	image1.classList.add(clickType);
 	
	return image1;
}

function crTextClickSpan(thisText, hebrewClass, clickType){
	var text1= document.createTextNode(thisText);
	var span1 = document.createElement("span");
	span1.classList.add(hebrewClass);
	span1.classList.add(clickType);
 	span1.appendChild(text1);
	
	return span1;
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
 
 function oldshuffleJavascriptList(thisId){
	var i;
	var j;

    const container = document.getElementById(thisId);
	if (container == null){ return;}
	
	const divs = container.children;  
	
	// turn off sound if playing because of arrow click
    var arrow = document.getElementsByClassName("flex-container-arrow-selected");
    for (j = 0; j < arrow.length; j++) {
	        // arrow has already been clicked, second click stops playing
 	       arrow[j].classList.add("stop-sound");
	}   


	var hebrew0 = [];
	var sound0 = [];
	var tooltips0 = [];
	
	var index = 0;
    for (i=0; i < divs.length; i++){
	   var soundclicks = divs[i].getElementsByClassName("soundclick");
	   if (soundclicks.length > 0){
		   hebrew0[index] = soundclicks[0].innerHTML;
		   sound0[index] = soundclicks[0].nextSibling.innerHTML
		   
	       var hasTooltip = divs[i].getElementsByClassName("tooltip-marker");
		   if (hasTooltip.length > 0) {
			   tooltips0[index] = hasTooltip[0].innerHTML;
		   }
   
		   index++;
	   }   
	}
    var shuffleOrder = shuffleArray(createIntegerArray(0, hebrew0.length - 1));	
	var hebrew = [];
	var sound = [];
	var tooltips = [];
    for (index=0; index < hebrew0.length; index++){
		hebrew[index] = hebrew0[shuffleOrder[index]];
		sound[index] = sound0[shuffleOrder[index]];
		tooltips[index] = tooltips0[shuffleOrder[index]];
	}	
	var index = 0;
    for (i=0; i < divs.length; i++){
	   var soundclicks = divs[i].getElementsByClassName("soundclick");
	   if (soundclicks.length > 0){
		   soundclicks[0].innerHTML = hebrew[index];
		   soundclicks[0].nextSibling.innerHTML = sound[index] 

	       var hasTooltip = divs[i].getElementsByClassName("tooltip-marker"); //tooltips
	       if (hasTooltip.length > 0){
		      hasTooltip[0].innerHTML = tooltips[index];
	       } 

		   index++;
	   }   
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
  
  var plusminus = container.getElementsByClassName("showhidenextsiblingclick");

  for (i=0; i < plusminus.length; i++ ) {
    if (plusminus[i].firstElementChild.classList.contains("button-minus")){
	   plusminus[i].firstElementChild.classList.toggle("button-minus");
       plusminus[i].firstElementChild.classList.toggle("button-plus");  
    }
  }	
  

}


  


