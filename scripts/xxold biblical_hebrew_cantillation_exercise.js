
"use strict";
// split string by one or more spaces
//const arr = str.trim().split(/\s+/);

function removeExistingExercise(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications
 
   var j;
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

    // now remove the list if it exists
   if (!(targetId==null )) {	// have to specify an id
	   var thisList = document.getElementById(targetId);	 
       if (!( thisList== null)) {
		  // first,turn off sound if playing because of arrow click
          turnOffArrowSound() ;	   

	   // remove list
	      thisList.parentNode.removeChild(thisList);
       }
   }
 	
}
	
function reCreateCantillationExercise(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications
  
   // remove existing exercise (if any) 
   removeExistingExercise(thisSpecId);
   
   // now create the list again
   var thisSpecElement = document.getElementById(thisSpecId);
   if (thisSpecElement==null ) { return;}	
   crCantillationExercise(thisSpecElement);

}



function reCreateCantillationJavascriptList(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications
   // remove existing exercise (if any) 
   removeExistingExercise(thisSpecId);

   // now create the list again
   var thisSpecElement = document.getElementById(thisSpecId);
   if (thisSpecElement==null ) { return;}	
   crCantillationJavascriptList(thisSpecElement);
	 
}

//------------------------------------------------------------------------------------------------
//--- cantillation exercise (click on stressed syllable as shown by the cantillation mark

function addStressedSyllableEventListener(element){
   // add event listener to add "stressed-syllable" class to the stressed syllable when clicked
   element.addEventListener("click", function() {
	   this.classList.add("stressed-syllable");
	   
	   if (cantillationExerciseFinished(this)) {
	       rewardModal("xx"); 
       }	  

   });
}

function cantillationExerciseFinished(thisSpec){
   // thisSpec is one of the boxes with syllables in the cantillation flexbox
   // this box has is a <span> with class cantillation-click
   // if all the elements with class cantillation-click also have class stressed-syllable then we're finished  
   var i;
   var finished = true;	
   const questionsFlexdiv = thisSpec.parentNode.parentNode.parentNode;
   const syllables = questionsFlexdiv.getElementsByClassName("cantillation-click");
   for (i = 0; i < syllables.length; i++) {
      if (!(syllables[i].classList.contains("stressed-syllable"))){
		 finished = false;
		 break;
	  }	 
   }
   return finished;
}              

function crCantillationExercise(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the cantillation exercise
	
    // For each set of inputs:
	//    - sounds specified in <p> separated by |
	//    - hebrew words divided into syllables specified in <div> separated by <p> (tooltips)
   var i;
   var j;

  // set the default specifications for the cantillation exercise 
   var sourceSyllableIds = null;
   var sourceSoundIds  = null; 
   var stress  = null;
   var targetId = null;  // the id of the list to be created
  
   var whichList = "all"
   var audioDir = "words";  

   var flexboxClass = "flex-container-ltr"; // used for all example flexboxes
   var containerClass = "flex-container-cantillation-exercise";  
   var hebrewClass = "hebrew35"; 
   var colorClass = "vocab-color";
   var tooltipsClass = "flex-container-tooltip"; 
   var nSelection = 10; //number of items to be randomly selected for each exercise
  
   // get the specifications for the cantillation exercise
  //------------------------------------------------------
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);

   for (j = 0; j < parameters.length; j++) {
	     var thisParameterSpec = parameters[j];
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 
		 if (thisP0 == "whichlist") {
		    whichList = thisP[1].trim();
         } else if(thisP0 == "sourcesyllables"){
		    sourceSyllableIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "sourcesound"){
		    sourceSoundIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "stress"){
		    stress = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "id"){
		    targetId = thisP[1].trim();
		 } else if (thisP0 == "audio"){
		    audioDir = thisP[1].trim();
         } else if (thisP0 == "selection"){
	        nSelection = thisP[1].trim();
		 } 
   }		

	
  // check same number of sources
    if (!(sourceSyllableIds.split(globalDivider2).length == sourceSoundIds.split(globalDivider2).length)) {return;}
 	if (!(sourceSoundIds.split(globalDivider2).length == stress.split(globalDivider2).length)) {return;}


    // get contents of new flexbox
    //----------------------------
	var sound0 = [];
	var syllables0 = [];
	var whichSyllable0 = [];
    for (i = 0; i < sourceSyllableIds.split(globalDivider2).length; i++) {
	   var sound1 = getFromHTML(sourceSoundIds.split(globalDivider2)[i].trim(), false);
       var syllables1 = getFromHTML(sourceSyllableIds.split(globalDivider2)[i].trim(), true);  // true cos in separate paragraphs
       var whichSyllable1 = [];
       for (j = 0; j < sound1.length; j++) {
		   whichSyllable1[j] = stress.split(globalDivider2)[i].trim();
	   }
	   sound0 = sound0.concat(sound1);
	   syllables0 = syllables0.concat(syllables1);
	   whichSyllable0 = whichSyllable0.concat(whichSyllable1);
	}	

    // check same number of items in both lists
    if (!(syllables0.length == sound0.length)) { return;}

     // randomly select nSelection items
    var syllables = [];
    var sound = [];
	var whichSyllable = [];
	   
    var selectionList = shuffleArray(createIntegerArray(0, syllables0.length-1));
	for (j=0; j < nSelection; j++) { 
	    syllables[j] = syllables0[selectionList[j]];
	    sound[j] = sound0[selectionList[j]];
	    whichSyllable[j] = whichSyllable0[selectionList[j]];
	}	 

       // now create the new flexbox
	   //---------------------------

    const flexdiv = document.createElement("div");
   
	flexdiv.classList.add(flexboxClass);
    flexdiv.classList.add(colorClass);
	flexdiv.classList.add(containerClass);
    flexdiv.setAttribute("id", targetId);
	
	 // now add contents of each flexbox cell
	 
    for (i=0; i < syllables.length; i++){
          const para1 = document.createElement("p");

	      var theseSyllables = syllables[i].trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables
          var stressedSyllableNumber =  getStressedSyllableNumber(syllables[i], whichSyllable[i]);
          var thisHebrew = wordFromSyllables(addCantillationToStressedSyllable(syllables[i], stressedSyllableNumber, sound[i],whichList));
		  const celldiv = document.createElement("div");
          const span1 = document.createElement("span");
          const text1= document.createTextNode(thisHebrew);
	      span1.classList.add(hebrewClass);
	      span1.classList.add("soundclick");
          span1.appendChild(text1);
		  para1.appendChild(span1);
		  
          //const thisSound = audioDir + "/" + sound[i].trim();
          const span2 = document.createElement("span");
          const thisSound = addAudioDirToSoundName(sound[i], audioDir);
	      const text2= document.createTextNode(thisSound);
	      span2.classList.add("hidden");
	      span2.appendChild(text2);
          para1.appendChild(span2);
		  
          celldiv.appendChild(para1);
		  
	 
	      // create the cell with the word divided into syllables
          const para4 = document.createElement("p");
	            
		  for (j = 0; j < theseSyllables.length; j++) {
             var text0 = document.createTextNode(theseSyllables[j]);
 	         var span0 = document.createElement("span");
		     span0.classList.add("clickable");
			 if (j  == stressedSyllableNumber) {
				span0.classList.add("cantillation-click");
			 }
	         span0.appendChild(text0);
	         para4.appendChild(span0);
				   
			 // add space between syllables 	   
               //var text00 = document.createTextNode(&emsp);
             var text00 = document.createTextNode(" ");
	         var span00 = document.createElement("span");
	         span00.appendChild(text00);
	         para4.appendChild(span00);
				   
          }
		  para4.classList.add(hebrewClass);
		  para4.classList.add(tooltipsClass); // dotted border

          celldiv.appendChild(para4);
      	  
          flexdiv.appendChild(celldiv);
	}	

 // add event listeners to flexbox
   var flexdivElements =  flexdiv.getElementsByTagName("*");
   for (i=0; i < flexdivElements.length; i++){
     if (flexdivElements[i].classList.contains("soundclick")) {
		 addsoundclickEventListener(flexdivElements[i]);
	 }else  if (flexdivElements[i].classList.contains("cantillation-click")) {
		 addStressedSyllableEventListener(flexdivElements[i]);
	 }	 
	 
   } 
   

 // add flexbox to document	
   //var thisElement = document.getElementById(insertElementId);
   //thisElement.parentNode.insertBefore(flexdiv, thisElement);
   
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);

}



//-----------------------------------------------------------------------------------------------------------------------------
//   list of words with cantillation marks, can click on + to show tooltip with stressed syllable
//-----------------------------------------------------------------------------------------------------------------------------

function crCantillationJavascriptList(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the flexbox
	
	// this is a cut-down version of createJavascriptList
   var j;
   var i;

   var flexboxClass = "flex-container-rtl"; // used for all hebrew flexboxes with audio
   var containerClass = "flex-container-heb-with-tooltips";  // specifies size of gap between items, default
   var hebrewClass = "hebrew35";  // default								   
   var tooltipsClass = "flex-container-heb30-tooltip"; 
   var colorClass = "vocab-color";

   var sourceHebrewIds = null; // alternative to single source for hebrew and sound
   var sourceSoundIds = null; 
   var targetId = null;  // the id of the list to be created
   var audioDir = null;  //replaces above, name of sub-directory containing audio
   
   var hebrewGroupStressedSyllable = null;     // in cantillation specification:one value for each sourceHebrewId, values "last" "secondlast"
   
   var tooltipsSourceIds = null;
   var tooltipsGroupStressedSyllable = null;     // in tooltipsShowStress specification: one value for each tooltipsSourceIds, values "last" "secondlast"
 
   var tooltipsSeparateParas = true;  
   var hebrewSeparateParas = true;  // if true, Hebrew in separate paragraphs which are contained in a <div>
   var tooltipsShowStress = true;  // in tooltips, show individual Hebrew syllables with stressed syllable marked
                                    // requires tooltips to be divided by spaces into syllables 
   var selection =  true;
   var nSelection = 10;
   var arrow = true;

  // get the specifications for the flexbox list
  //-----------------------------------------------
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   for (j = 0; j < parameters.length; j++) {
	     var thisParameterSpec = parameters[j];
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 if (thisP0 == "id"){
		    targetId = thisP[1].trim();
		 } else if (thisP0 == "sourcehebrew"){
		    sourceHebrewIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "sourcesound"){
		    sourceSoundIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "audio"){
		    audioDir = thisP[1].trim();
			
		 } else if (thisP0 == "cantillation"){
		    hebrewGroupStressedSyllable = removeFirstItem(thisParameterSpec);  // allowing for possibly multiple specifications
			
		 } else if (thisP0 == "tooltips"){
		    tooltipsSourceIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "tooltipsshowstress"){
		    tooltipsGroupStressedSyllable = removeFirstItem(thisParameterSpec);  // allowing for possibly multiple specifications
			
         } else if (thisP0 == "selection"){
	        selection = true;
	        nSelection = thisP[1].trim();
		 } 
   }


   // check consistency of specifications
   //-----------------------------------   
		if (hebrewGroupStressedSyllable == null) { return;}
		if (tooltipsGroupStressedSyllable == null) { return;}

   // get contents of new flexbox
   //----------------------------
    var hebrew = [];
    var sound = [];
 	var tips = [];
	var tooltipsStressedSyllable = [];
	
	var hebrewStressedSyllable = [];

    if (sourceHebrewIds != null &  sourceSoundIds != null){
      // hebrew and sounds in separate sources  
      
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
		   
		   var temp2 = [];
		   for (j=0; j < temp1.length; j++) {
			   temp2[j] = stressedSyllableArray[i];
		   }
           hebrewStressedSyllable = hebrewStressedSyllable.concat(temp2);			  
	    }  
 
    } else {  return; }

   // check that same number of items in hebrew and sound
      if (hebrew.length !=  sound.length)  { return;  }	// this is an error 

   // read in tooltips  from HTML 
	  	 var idsArray = tooltipsSourceIds.split(globalDivider2);
	  
		 var stressedSyllableArray = tooltipsGroupStressedSyllable.split(globalDivider2);
		 
 	     for (i=0; i < idsArray.length; i++) { 
	        var temp1 = getFromHTML(idsArray[i].trim(), tooltipsSeparateParas);
	        tips = tips.concat(temp1);
			
			var temp2 = [];
			for (j=0; j < temp1.length; j++) {
			   temp2[j] = stressedSyllableArray[i];
			}
            tooltipsStressedSyllable = tooltipsStressedSyllable.concat(temp2);			  
 	     } 
		 
	  // check that same number of items in tooltips as in hebrew and sound
         if (!(hebrew.length ==  tips.length) ) { return;  }	// this is an error 
 
  
     // now get final contents
	 
	  if (selection) {   // need random selection of items
         var tempHebrew = cloneArray(hebrew);
         var tempSound = cloneArray(sound);
 		 var tempHebrewStressedSyllable = cloneArray(hebrewStressedSyllable);   
		 var tempTooltips = cloneArray(tips);
		 var tempTooltipsStressedSyllable = cloneArray(tooltipsStressedSyllable);
		 
		 var nhebrew = hebrew.length;
	   
	     hebrew.length = 0;
		 sound.length = 0;
		 hebrewStressedSyllable.length = 0;
	 	 tips.length = 0;
	 	 tooltipsStressedSyllable.length = 0; 
         var selectionList = shuffleArray(createIntegerArray(0, nhebrew -1));
	 	 for (i=0; i < nSelection; i++) { 
            hebrew[i] = tempHebrew[selectionList[i]];
            sound[i] = tempSound[selectionList[i]];
       	    hebrewStressedSyllable[i] = tempHebrewStressedSyllable[selectionList[i]];
	 		tips[i] = tempTooltips[selectionList[i]];
	 	 	tooltipsStressedSyllable[i] = tempTooltipsStressedSyllable[selectionList[i]]; 
	 	 }
	  }
 
       // now create the new flexbox
	   //---------------------------
  
   var flexdiv = document.createElement("div");

   flexdiv.classList.add(flexboxClass);
   flexdiv.classList.add(containerClass);
   if (!(colorClass == null)) {flexdiv.classList.add(colorClass);}
   if (!(targetId == null)) {flexdiv.setAttribute("id", targetId);}
  
       // add arrow at start 
		var celldiv = document.createElement("div");
 
        var span = document.createElement("span");
        //span.classList.add("hebrew35");
        span.classList.add("start-audio");
		span.classList.add("arrowclick");
		
        celldiv.appendChild(span);
        flexdiv.appendChild(celldiv);
   
	 // now add contents of each flexbox cell

   for (i=0; i < hebrew.length; i++){

     //var thisHebrew = hebrew[i].trim();
	  var celldiv = document.createElement("div");	
 	  
      var thisHebrew = hebrew[i];
	  var thisSound = sound[i];
           // combine hebrew syllables into words 
      var stressedSyllableNumber =  getStressedSyllableNumber(thisHebrew, hebrewStressedSyllable[i]);
      thisHebrew = wordFromSyllables(addCantillationToStressedSyllable(thisHebrew, stressedSyllableNumber, thisSound,"all"));
//test("hello from crCantillationJavascriptList, i="+i);		 
	  var text1= document.createTextNode(thisHebrew);
	  var span1 = document.createElement("span");
 	  span1.appendChild(text1);
	  span1.classList.add(hebrewClass);
	  span1.classList.add("soundclick");
 	  celldiv.appendChild(span1);

	  var span2 = crAudioSpan(addAudioDirToSoundName(thisSound, audioDir));
	  celldiv.appendChild(span2);
		 
      var para3 = document.createElement("p");
	  para3.classList.add("button-plus-minus-tooltip"); // puts some padding at the top of the para
	  var span3 = document.createElement("span");
      span3.classList.add("button-plus");
      span3.classList.add("tooltip-button-marker"); // no CSS, just a marker
      para3.appendChild(span3);
      celldiv.appendChild(para3);
			 
      var para4 = document.createElement("p");
                
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
 	  para4.classList.add("hidden");
 	  para4.classList.add(tooltipsClass);
	  para4.classList.add("tooltip-marker");  // no CSS content, just a marker 
 
      celldiv.appendChild(para4);

 	  flexdiv.appendChild(celldiv);
 
   }	  
 
   // finished creating the celldiv with the flexbox items
   
 
   // add event listeners to flexbox
    var flexdivElements =  flexdiv.getElementsByTagName("*");
    for (i=0; i < flexdivElements.length; i++){
      if (flexdivElements[i].classList.contains("soundclick")) {
		 addsoundclickEventListener(flexdivElements[i]);
	
	  
	  } else if (flexdivElements[i].classList.contains("arrowclick")) {
		 addArrowclickEventListener(flexdivElements[i]);
 	
	  }
		  
	    // tooltips
      if (flexdivElements[i].classList.contains("tooltip-button-marker")) {
           //addShowHideNextSiblingEventListener(flexdivElements[i]);
           flexdivElements[i].addEventListener("click", function(){ShowHideParentNextSibling(event.target)});
      }

    } 

   // add flexbox to document	
   //thisElement.parentNode.insertBefore(flexdiv, thisElement);
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);
   
 
}

//--------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------
function addCantillationToStressedSyllable(syllables, stressedSyllableNumber, audio, whichList = "all")	{
   		   // combine syllables into word with random cantillation mark on stressed syllable
    var j;
	
	var theseSyllables = syllables.trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables

	if (whichList == "all"){var thisCantillation = getCantillationCode(audio);}
	else if (whichList == "pashta-kadma"){var thisCantillation = getCantillationCodePashtaKadma();}
	
    if ((thisCantillation[0] == "pashta") && (stressedSyllableNumber == theseSyllables.length - 1)){
       // add pashta at end of last syllable   
	   theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u0599";
		
    } else {

       theseSyllables[stressedSyllableNumber] = addCantillation(theseSyllables[stressedSyllableNumber], thisCantillation[1]);
	   if (thisCantillation[0] == "pashta") { theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u0599";} 
	   if (thisCantillation[0] == "sof") { theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u05C3";} 
    }		   

    var syllablesWithCantillation = theseSyllables[0];
	if (theseSyllables.length > 1 ){
	   for (j = 1; j < theseSyllables.length ; j++) {
		  syllablesWithCantillation = syllablesWithCantillation + " ";
		  syllablesWithCantillation = syllablesWithCantillation + theseSyllables[j];
       }
	}   
    return syllablesWithCantillation;

}	


function addCantillation(inputSyllable, inputCantillation){	
   var i;		  
   var cantillationAdded = false;			  
   var letters = inputSyllable.trim().split("");
   var thisSyllable = letters[0];
   for (i=1; i < letters.length; i++){
	  if (isConsonant(letters[i])) {
		 if (!(cantillationAdded)) {thisSyllable = thisSyllable + inputCantillation;}
		 cantillationAdded = true;
      }
      thisSyllable = thisSyllable + letters[i];				  
   }
   if (!(cantillationAdded)) {thisSyllable = thisSyllable + inputCantillation;}	
   
   return thisSyllable;
}


function getCantillationCode(thisAudio = "xxxx"){
	var i;

    const cantillationCodes1 = ["\u05A5","\u05A3"];
    const cantillationNames1 = ["mercha","munach"];	
	
	  // not sof or etnachta
    const cantillationCodes2 = ["\u0596","\u059B","\u05A5","\u05A3","\u05A4","\u05A7",
	                           "\u0594","\u0595","\u0597","\u059C","\u059E","\u05A1","\u05A8","\u05A8"
							   ];
    const cantillationNames2 = ["tipcha","tvir","mercha","munach","mapach","darga",
	                           "katan","zakef gadol","rvii","azla","gershayim","pazer","kadma","pashta"
							   ];
							   
    const cantillationCodes3 = ["\u05BD","\u0591","\u0591","\u0596","\u059B","\u05A5","\u05A3","\u05A4","\u05A7",
	                           "\u0594","\u0595","\u0597","\u059C","\u059E","\u05A1","\u05A8","\u05A8"
							   ];
    const cantillationNames3 = ["sof","etnachta","etnachta","tipcha","tvir","mercha","munach","mapach","darga",
	                           "katan","zakef gadol","rvii","azla","gershayim","pazer","kadma","pashta"
							   ];
    const audio1 = ["w005_et","w005_vuhet","w007_al","w008_el","w009_asher","w013_bnei","w016_kaasher",
	                      "w024_lifnei","w028_ydei","w033_ad","w039_arei","w044_im","w060_ehn","w071_al"];
	const audio2 = ["w014_ki","w043_hinei","w043_vhinei","w072_acharei","w085_koh","w086_mah","w095_tachat","w095_mitachat"];
	
	var answer = [];
	
	var audioMatch = false;
	var thisAudio = thisAudio.trim().toLowerCase();
	
	for (i = 0; i < audio1.length; i++) {
	   if (thisAudio == audio1[i].trim().toLowerCase()){
          var codeNumber = getRandomInteger(0, cantillationCodes1.length - 1);
	      answer[0] = cantillationNames1[codeNumber];
	      answer[1] = cantillationCodes1[codeNumber];
		  audioMatch = true;
		  break;
	   }	  
	}	
		
	if (!audioMatch) {
	   for (i = 0; i < audio2.length; i++) {
	      if (thisAudio == audio2[i].trim().toLowerCase()){
             var codeNumber = getRandomInteger(0, cantillationCodes2.length - 1);
	         answer[0] = cantillationNames2[codeNumber];
	         answer[1] = cantillationCodes2[codeNumber];
		     audioMatch = true;
		     break;
		  }	 
	   }	  

       if (!audioMatch) {
          var codeNumber = getRandomInteger(0, cantillationCodes3.length - 1);
	      answer[0] = cantillationNames3[codeNumber];
	      answer[1] = cantillationCodes3[codeNumber];
	   }	   

	}	

    return answer;
 }	 

function getCantillationCodePashtaKadma(){

    const cantillationCodes = ["\u05A8","\u05A8"];
    const cantillationNames = ["kadma","pashta"];	

  // Returns a random integer from 0 to 9:
  //Math.floor(Math.random() * 10);
    var codeNumber = Math.floor(Math.random() * cantillationCodes.length);
	var answer = [];
	answer[0] = cantillationNames[codeNumber];
	answer[1] = cantillationCodes[codeNumber];
	
    return answer;
 }	 

	


function testArray(){
	var ttarray = [];
	ttarray[3] = "hello";
	test(ttarray);
	// ok
	ttarray.length = 0;
	test("this is the array with zero length:" + ttarray);
	
}	


function testCantillation(){  

  var p1 = document.getElementById("test1").innerHTML.trim();
  var p2 = document.getElementById("test2").innerHTML.trim();
  
  var cant1 = "";
  var cant2 = "";
  var list = "";
   // sof
  cant1 = "\u05BD";
   // pasuk
  cant2 = "\u05C3";
  list = list + " " + p1 + cant1 + p2 + cant2;
  
   cant2 = ""
 
 // etnachta
   cant1 = "\u0591";
  list = list + " " + p1 + cant1 + p2 + cant2;

 //tipcha
   cant1 = "\u0596";
   list = list + " " + p1 + cant1 + p2 + cant2;

 //tvir
   cant1 = "\u059B";
   list = list + " " + p1 + cant1 + p2 + cant2;
//mercha
   cant1 = "\u05A5";
   list = list + " " + p1 + cant1 + p2 + cant2;
//munach
   cant1 = "\u05A3";
   list = list + " " + p1 + cant1 + p2 + cant2;
//mapach
   cant1 = "\u05A4";
   list = list + " " + p1 + cant1 + p2 + cant2;
//darga
   cant1 = "\u05A7";
   list = list + " " + p1 + cant1 + p2 + cant2;
//katan
   cant1 = "\u0594";
   list = list + " " + p1 + cant1 + p2 + cant2;
//zakef gadol
   cant1 = "\u0595";
   list = list + " " + p1 + cant1 + p2 + cant2;
//rvii
   cant1 = "\u0597";
   list = list + " " + p1 + cant1 + p2 + cant2;
//azla
   cant1 = "\u059C";
   list = list + " " + p1 + cant1 + p2 + cant2;
//gershayim
   cant1 = "\u059E";
   list = list + " " + p1 + cant1 + p2 + cant2;
//pazer
   cant1 = "\u05A1";
   list = list + " " + p1 + cant1 + p2 + cant2;

   // kadma
  cant1 = "\u05A8";
    list = list + " " + p1 + cant1 + p2 + cant2;
 
  // pashta 
   cant1 = "\u05A8";
   cant2 = "\u0599";
   list = list + " " + p1 + cant1 + p2 + cant2;
  
 
 test(list);

}