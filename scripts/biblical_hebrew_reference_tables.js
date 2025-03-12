"use strict";
	


//-----------------------------------------------------------------------------------------------
//    OTHER TABLES
//-----------------------------------------------------------------------------------------------

function crHeaderRow(headings, tableType){
	var i;
   // header row

	var thisRow = document.createElement("tr");
	   
	   var thisCol = document.createElement("th");
 	   thisCol.colSpan = "2";
	   thisRow.appendChild(thisCol);
	   
	for (i = 0; i < headings.length; i++) {
	   var thisCol = document.createElement("th");
	   var thisHeading = headings[i];

	   // if 2 items, first is hebrew
	   if (thisHeading.length > 1){

       }		   
       thisCol.appendChild(document.createTextNode(thisHeading[0]));
       thisCol.classList.add("reference-table-header-cell");
       if (tableType == "possessive-suffix"){ thisCol.classList.add("possessive-suffix-table-header-cell");	}  
       else if (tableType == "object-suffix"){ thisCol.classList.add("object-suffix-table-header-cell");	}  
 	   thisRow.appendChild(thisCol);
	}
		
	return thisRow;	
	
}	

function crReferenceTableRow(thisRowHeader,thisRowSpecs, dash){
   var i;
   var col;

   var thisRow = document.createElement("tr");
   
   var thisCol = document.createElement("td");
   thisRow.appendChild(thisCol);


   var thisCol = document.createElement("td");
   thisCol.appendChild(document.createTextNode(thisRowHeader));
   thisRow.appendChild(thisCol);
	
   var nCols = thisRowSpecs.length ;	
   
   for (col = 0; col < nCols; col++){
	  // if 2 items in a column, 
 	  //    first item in each column is consonant image, second is hebrew letters
	  // otherwise, item is hebrew letters
      var thisCol = document.createElement("td");
      thisCol.classList.add("reference-table-cell");
	  
	  var thisColText = thisRowSpecs[col];

 	  var thisSuffix = thisColText[0];
	  var thisSpan = document.createElement("span");
	  thisSpan.classList.add("hebrew25");
	  thisSpan.appendChild(document.createTextNode(thisSuffix));
	  thisCol.appendChild(thisSpan);
	  
	  if (thisColText.length == 2){
         var thisConsonantImg = thisColText[1];
 		 var thisSpan = document.createElement("span");
	     thisSpan.classList.add("generic-consonant-image-" + thisConsonantImg);
	     thisCol.appendChild(thisSpan);
      }
	  
	  if (dash) {
	     var thisSpan = document.createElement("span");
	     thisSpan.classList.add("hebrew25");
	     thisSpan.appendChild(document.createTextNode("-"));
	     thisCol.appendChild(thisSpan);
	  }
	  
      thisRow.appendChild(thisCol);
   
   }  

   return thisRow;
}


//---------------------------------------------------------
//----------------------------------------------------------

function crObjectSuffixOnPrepositionReferenceTable(thisDiv) {
	
    var selectedPrepositions = ["l","b"];								  
    var thisTableData = crSelectedPrepositionsWithObjects(selectedPrepositions);
	
    var thisTable = document.createElement("table");
    thisTable.classList.add("reference-table");
	
    var headings = extractObjectSuffixRow(thisTableData,0);
 	thisTable.appendChild(crHeaderRow(headings));

   // "Singular" header row
   thisTable.appendChild(crReferenceTableSectionHeaderRow("Singular"));

   // singular rows
   //--------------
	
    thisTable.appendChild(crReferenceTableRow("me",extractObjectSuffixRow(thisTableData,1), false));
    thisTable.appendChild(crReferenceTableRow("you (addressing one male)",extractObjectSuffixRow(thisTableData,2), false));
    thisTable.appendChild(crReferenceTableRow("him",extractObjectSuffixRow(thisTableData,3), false));

  // plural rows
  //------------
   thisTable.appendChild(crReferenceTableSectionHeaderRow("Plural"));

    thisTable.appendChild(crReferenceTableRow("us",extractObjectSuffixRow(thisTableData,4), false));
    thisTable.appendChild(crReferenceTableRow("you (addressing several males, or males and females)",extractObjectSuffixRow(thisTableData,5), false));
    thisTable.appendChild(crReferenceTableRow("them (males, or males and females)",extractObjectSuffixRow(thisTableData,6), false));


  // females only rows
  //------------------
    thisTable.appendChild(crReferenceTableSectionHeaderRow("Females only"));
	
    thisTable.appendChild(crReferenceTableRow("you (addressing one female)",extractObjectSuffixRow(thisTableData,7), false));
    thisTable.appendChild(crReferenceTableRow("her",extractObjectSuffixRow(thisTableData,8), false));
    thisTable.appendChild(crReferenceTableRow("you (addressing several females)",extractObjectSuffixRow(thisTableData,9), false));
    thisTable.appendChild(crReferenceTableRow("them (females only)",extractObjectSuffixRow(thisTableData,10), false));

    thisDiv.appendChild(thisTable);
	
	
    // note about cantillation marks indicating stressed
    thisDiv.appendChild(crNoteAboutStressedSyllable());
   

}
function crSelectedPrepositionsWithObjects(selectedPrepositions){
	var i;
	
	var selectedPrepositionsWithObjects = [];
	for (i = 0; i < selectedPrepositions.length; i++) {
	   if (selectedPrepositions[i] == "l"){
		   var thisPrep = [[lamed+schwah,"(to)"],
		                   lamed+chirik+yod, lamed+schwah+finalChaf+kamatz, lamed+vav+cholam,
						   lamed+kadma+kamatz+nun+vav+dagesh, lamed+kamatz+chaf+segol+finalMem, lamed+kamatz+heh+segol+finalMem,
						   lamed+kamatz+finalChaf+schwah, lamed+kamatz+heh+dagesh,""  , lamed+kamatz+heh+segol+finalNun];
		   selectedPrepositionsWithObjects.push(thisPrep);
	   } else if (selectedPrepositions[i] == "b"){	
		   var thisPrep = [[bet+dagesh+schwah,"(in)"],
		                   bet+dagesh+chirik+yod, bet+dagesh+schwah+finalChaf+kamatz+thinsp+bet+dagesh+kamatz+finalChaf+schwah, bet+dagesh+vav+cholam,
						   bet+dagesh+kadma+kamatz+nun+vav+dagesh, bet+dagesh+kamatz+chaf+segol+finalMem, bet+dagesh+kamatz+heh+segol+finalMem+thinsp+bet+dagesh+kamatz+finalMem,
						   bet+dagesh+kamatz+finalChaf+schwah, bet+dagesh+kamatz+heh+dagesh,""  , bet+dagesh+kamatz+heh+tsere+finalNun];
		   selectedPrepositionsWithObjects.push(thisPrep);
	   
	   } else if (selectedPrepositions[i] == "k"){	
		   var thisPrep = [[bet+dagesh+schwah,"(in)"],
		                   bet+dagesh+chirik+yod, bet+dagesh+schwah+finalChaf+kamatz+thinsp+bet+dagesh+kamatz+finalChaf+schwah, bet+dagesh+vav+cholam,
						   bet+dagesh+kadma+kamatz+nun+vav+dagesh, bet+dagesh+kamatz+chaf+segol+finalMem, bet+dagesh+kamatz+heh+segol+finalMem+thinsp+bet+dagesh+kamatz+finalMem,
						   bet+dagesh+kamatz+finalChaf+schwah, bet+dagesh+kamatz+heh+dagesh,""  , bet+dagesh+kamatz+heh+tsere+finalNun];
		   selectedPrepositionsWithObjects.push(thisPrep);

       }	   
		
	}	
	
	return selectedPrepositionsWithObjects;

}


function extractObjectSuffixRow(tableData, itemNumber){
	var i;
	var columns = [];
	
	for (i=0; i < tableData.length; i ++) {
	   var thisPreposition = tableData[i];
	   var thisColumn = [thisPreposition[itemNumber]];
	   columns.push(thisColumn);	
	}
	
	return columns;
}	
	

//---------------------------------------------------------
//----------------------------------------------------------


function crPossessiveSuffixTable(thisDiv){
	var thisType = "possessive-suffix";
	
	var thisTable = document.createElement("table");
    thisTable.classList.add("reference-table");
	
	var headings = [["Singular nouns"],["Plural nouns"]];
	thisTable.appendChild(crHeaderRow(headings, thisType));

   // "Singular" header row
  //------------
    thisTable.appendChild(crReferenceTableSectionHeaderRow("Singular"));

	var thisRowSpecs = [[yod,"chirik-white"],[yod,"patach-white"]];
    thisTable.appendChild(crReferenceTableRow("my",thisRowSpecs, true));
	var thisRowSpecs = [[finalChaf+kamatz,"schwah-white"],[yod+finalChaf+kamatz,"segol-white"]];
    thisTable.appendChild(crReferenceTableRow("your (addressing one male)",thisRowSpecs, true));
	var thisRowSpecs = [[vav+cholam],[yod+vav,"kamatz-white"]];
    thisTable.appendChild(crReferenceTableRow("his",thisRowSpecs, true));


  // plural rows
  //------------
    thisTable.appendChild(crReferenceTableSectionHeaderRow("Plural"));

	var thisRowSpecs = [[nun+vav+dagesh,"tsere-white"],[yod+nun+vav+dagesh,"tsere-white"]];
    thisTable.appendChild(crReferenceTableRow("our",thisRowSpecs, true));
	var thisRowSpecs = [[chaf+segol+finalMem,"schwah-white"],[yod+chaf+segol+finalMem,"tsere-white"]];
    thisTable.appendChild(crReferenceTableRow("your (addressing several males, or males and females)",thisRowSpecs, true));
	var thisRowSpecs = [[finalMem,"kamatz-white"],[yod+heh+segol+finalMem,"tsere-white"]];
    thisTable.appendChild(crReferenceTableRow("their (males, or males and females)",thisRowSpecs, true));

  // females only rows
  //------------------
    thisTable.appendChild(crReferenceTableSectionHeaderRow("Females only"));
	
	var thisRowSpecs = [[heh+dagesh,"kamatz-white"],[yod+heh+kamatz,"segol-white"]];
    thisTable.appendChild(crReferenceTableRow("her",thisRowSpecs, true));
	var thisRowSpecs = [[finalChaf+schwah,"tsere-white"],[yod+chirik+finalChaf+schwah,"patach-white"]];
    thisTable.appendChild(crReferenceTableRow("your (addressing one female)",thisRowSpecs, true));
	var thisRowSpecs = [[chaf+segol+finalNun,"schwah-white"],[yod+chaf+segol+finalNun,"tsere-white"]];
    thisTable.appendChild(crReferenceTableRow("your (addressing several females)",thisRowSpecs, true));
	var thisRowSpecs = [[finalNun,"kamatz-white"],[yod+heh+segol+finalNun,"tsere-white"]];
    thisTable.appendChild(crReferenceTableRow("their (females only)",thisRowSpecs, true));
	
   // insert table in document	
	thisDiv.appendChild(thisTable);

	
}
//----------------------------------------------------------

