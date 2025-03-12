"use strict";
	
//-----------------------------------------------------------

//-----------------------------------------------------------
//    VERB TABLES
//-----------------------------------------------------------


//-----------------------------------------------------------
//    used in both generic and specific tables
//-----------------------------------------------------------


function crVerbMainHeaderRow(separateColumns){
	var i;
   // header row
    var headings1 = ["Qatal","Weqatal","Yiktol","Wayyiktol"];
	var headings2 = ["","(vav + Qatal)","","(vav + Yiktol)"];
	
	var thisRow = document.createElement("tr");
	   
	   var thisCol = document.createElement("th");
 	   thisCol.colSpan = "2";
	   thisRow.appendChild(thisCol);
	   
	for (i = 0; i < headings1.length; i++) {
	   var thisCol = document.createElement("th");
	   if (separateColumns) {
		   thisCol.colSpan = "5";
	   }	   
       thisCol.appendChild(document.createTextNode(headings1[i]));
	   if (headings2[i].length > 0){
		  thisCol.appendChild(document.createElement("br"));
		  thisCol.appendChild(document.createTextNode(headings2[i]));
	   }
       thisCol.classList.add("reference-table-header-cell");	   
       thisCol.classList.add("verb-reference-table-header-cell");	   
 	   thisRow.appendChild(thisCol);
	}
	
	return thisRow;
}
	

//-----------------------------------------------------------
//   generic table
//-----------------------------------------------------------

function crGenericVerbReferenceTable(thisDiv){
   
   crGenericVerbReferenceTableMain(thisDiv);
   
    // create a space between tables
   thisDiv.appendChild(crSpaceBetweenTables());
   
   crGenericVerbReferenceTableImperative(thisDiv);

}


function crGenericVerbReferenceTableMain(thisDiv){
    var i;
		
    var thisTable = document.createElement("table");
    thisTable.classList.add("reference-table");
	
	thisTable.appendChild(crVerbMainHeaderRow(true));
	   
   // "Singular" header row
    thisTable.appendChild(crReferenceTableSectionHeaderRow("Singular"));

   // singular rows
   //--------------
	
	var thisRowSpecs = [[tav+dagesh+chirik+yod,"","","",""],
	                    [tav+dagesh+chirik+yod,"","","",vav],
	                    ["","","","",alef],
	                    ["","","","",vav+kamatz+alef]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("I",thisRowSpecs));
	var thisRowSpecs = [[tav+dagesh+kamatz,"","","",""],
	                    [tav+dagesh+kamatz,"","","",vav],
	                    ["","","","",tav+dagesh],
	                    ["","","","",vav+patach+tav+dagesh]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("you (addressing one male)",thisRowSpecs));
	var thisRowSpecs = [["","","","",""],
	                    ["","","","",vav],
	                    ["","","","",yod],
	                    ["","","","",vav+patach+yod]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("he",thisRowSpecs));
	
  // plural rows
  //------------
    thisTable.appendChild(crReferenceTableSectionHeaderRow("Plural"));

	var thisRowSpecs = [[nun+vav+dagesh,"","","",""],
	                    [nun+vav+dagesh,"","","",vav],
	                    ["","","","",nun],
	                    ["","","","",vav+patach+nun]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("we",thisRowSpecs));
	var thisRowSpecs = [[tav+dagesh+segol+finalMem,"","","",""],
	                    [tav+dagesh+segol+finalMem,"","","",vav],
	                    [vav+dagesh,"","","",tav+dagesh],
	                    [vav+dagesh,"","","",vav+patach+tav+dagesh]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("you (addressing several males, or males and females)",thisRowSpecs));
	var thisRowSpecs = [[vav+dagesh,"","","",""],
	                    [vav+dagesh,"","","",vav],
	                    [],
	                    []
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("they (males and/or females)",thisRowSpecs));
	var thisRowSpecs = [[],
	                    [],
	                    [vav+dagesh,"","","",yod],
	                    [vav+dagesh,"","","",vav+patach+yod]
     				   ];
    thisTable.appendChild(crGenericVerbReferenceTableRow("they (males, or males and females)",thisRowSpecs));

  // females only rows
  //------------------
    thisTable.appendChild(crReferenceTableSectionHeaderRow("Females only"));
	
	var thisRowSpecs = [[tav+dagesh+schwah,"","","",""],
	                    [tav+dagesh+schwah,"","","",vav],
	                    [yod,"-chirik","","",tav+dagesh],
	                    [yod,"-chirik","","",vav+patach+tav+dagesh]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("you (addressing one female)",thisRowSpecs));
	var thisRowSpecs = [[heh,"-kamatz","","",""],
	                    [heh,"-kamatz","","",vav],
	                    ["","","","",tav+dagesh],
	                    ["","","","",vav+patach+tav+dagesh]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("she",thisRowSpecs));
	var thisRowSpecs = [[tav+dagesh+segol+finalNun,"","","",""],
	                    [tav+dagesh+segol+finalNun,"","","",vav],
	                    [nun+kamatz+heh,"","","",tav+dagesh],
	                    [nun+kamatz+heh,"","","",vav+patach+tav+dagesh]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("you (addressing  several females)",thisRowSpecs));
	var thisRowSpecs = [[],
	                    [],
	                    [nun+kamatz+heh,"","","",tav+dagesh],
	                    [nun+kamatz+heh,"","","",vav+patach+tav+dagesh]
						];
    thisTable.appendChild(crGenericVerbReferenceTableRow("they (females)",thisRowSpecs));

	
  // insert table in document	
	thisDiv.appendChild(thisTable);
	
 
}

function crGenericVerbReferenceTableImperative(thisDiv){
    var i;
	
 	
  // imperative
  //------------------
	
    var thisTable = document.createElement("table");
    thisTable.classList.add("reference-table");
	var thisRow = document.createElement("tr");
    //thisRow.classList.add("table-border-bottom");
	   
	var thisCol = document.createElement("td");
	thisCol.colSpan = "2";
//	thisCol.classList.add("table-border-bottom");
    thisCol.appendChild(document.createTextNode("Imperative (giving orders)"));
 	thisRow.appendChild(thisCol);
	
	for (i = 1; i < 6; i++){
	   var thisCol = document.createElement("td");
	//   thisCol.classList.add("table-border-bottom");
 	   thisRow.appendChild(thisCol);
	}	
	   
    thisTable.appendChild(thisRow);
	
	var thisRowSpecs = [["","","","",""]];
    thisTable.appendChild(crGenericVerbReferenceTableRow("to one male",thisRowSpecs));
	var thisRowSpecs = [[vav+dagesh,"","","",""]];
    thisTable.appendChild(crGenericVerbReferenceTableRow("to several males, or males and females",thisRowSpecs));
	var thisRowSpecs = [[yod,"-chirik","","",""]];
    thisTable.appendChild(crGenericVerbReferenceTableRow("to one female",thisRowSpecs));
	var thisRowSpecs = [[nun+kamatz+heh,"","","",""]];
    thisTable.appendChild(crGenericVerbReferenceTableRow("to several females",thisRowSpecs));


  // insert table in document	
	thisDiv.appendChild(thisTable);
	

}



function crGenericVerbReferenceTableRow(thisRowHeader,thisRowSpecs){
//test("in crGenericVerbReferenceTableRow(thisRowHeader,thisRowSpecs)" + thisRowSpecs );	   
   var i;
   var group;
   
 
   var thisRow = document.createElement("tr");
   
   var thisCol = document.createElement("td");
   thisRow.appendChild(thisCol);


   var thisCol = document.createElement("td");
 //  thisCol.classList.add("table-border-bottom");
   thisCol.appendChild(document.createTextNode(thisRowHeader));
   thisRow.appendChild(thisCol);
	
   var nGroups = thisRowSpecs.length;	
   
   for (group = 0; group < nGroups; group++){
      var thisGroup = thisRowSpecs[group];
	  
      var thisCol = document.createElement("td");
 //     thisCol.classList.add("table-border-bottom");
   //   thisCol.classList.add("table-border-left");
      thisCol.classList.add("verb-reference-table-hebrew-suffix");
	  if ( thisGroup.length == 0 ){ 
         thisCol.classList.add("table-blank-cell");
	  } else{   
         if ( thisGroup[0].length > 0) {
	        var thisSpan = document.createElement("span");
	        thisSpan.classList.add("hebrew25");
	        thisSpan.appendChild(document.createTextNode(thisGroup[0]));
	        thisCol.appendChild(thisSpan);
         }
	  }	  
      thisRow.appendChild(thisCol);
   
	  for (i = 1; i < 4; i++) {
	     var thisCol = document.createElement("td");
  //       thisCol.classList.add("table-border-bottom");
         if (thisGroup.length == 0){
            thisCol.classList.add("table-blank-cell");
	     } else{   
		    var thisSpan = document.createElement("span");
	        thisSpan.classList.add("generic-consonant-image" + thisGroup[i]);
	        thisCol.appendChild(thisSpan);
		 }	
 	     thisRow.appendChild(thisCol);
	  }
	//var thisRowSpecs = [tavChirik,"","","",""];
	
	  var thisCol = document.createElement("td");
   //   thisCol.classList.add("table-border-bottom");
    //  thisCol.classList.add("table-border-right");
      thisCol.classList.add("verb-reference-table-hebrew-prefix");
      if (thisGroup.length == 0){
         thisCol.classList.add("table-blank-cell");
	  } else{   
         if ( thisGroup[4].length > 0) {
	        var thisSpan = document.createElement("span");
	        thisSpan.classList.add("hebrew25");
	        thisSpan.appendChild(document.createTextNode(thisGroup[4]));
	        thisCol.appendChild(thisSpan);
         }	
      }     	  
 	  thisRow.appendChild(thisCol);

   }  
   

   return thisRow;
}

//-----------------------------------------------------------
//-----------------------------------------------------------
//   non-generic tables
//-----------------------------------------------------------
//-----------------------------------------------------------


function crVerbReferenceTableMain(thisDiv,
                              verbRoot,
							  separateColumns,
                              verbI,verbYouSingM, verbHe, 
                              verbWe,verbYouPluralM, verbTheyMF, verbTheyM, 
							  verbShe, verbYouSingF, verbYouPluralF, verbTheyF){
								  
	var i;							  
	
    var thisTable = document.createElement("table");
    thisTable.classList.add("reference-table");

	
	thisTable.appendChild(crVerbMainHeaderRow(separateColumns));
	
   // "Singular" header row
   thisTable.appendChild(crReferenceTableSectionHeaderRow("Singular"));

   // singular rows
   //--------------
	
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbI));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbYouSingM));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbHe));

  // plural rows
  //------------
   thisTable.appendChild(crReferenceTableSectionHeaderRow("Plural"));

    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbWe));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbYouPluralM));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbTheyMF));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbTheyM));


  // females only rows
  //------------------
    thisTable.appendChild(crReferenceTableSectionHeaderRow("Females only"));
	
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbYouSingF));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbShe));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbYouPluralF));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbTheyF));

    thisDiv.appendChild(thisTable);
	
   
 
   thisDiv.appendChild(thisTable);

}

function crVerbReferenceTableImperative(thisDiv,
                              verbRoot,
							  separateColumns,
							  verbSingM, verbPluralM,  verbSingF, verbPluralF){
								  
	var i;							  
	
   // table with imperative
    var thisTable = document.createElement("table");
    thisTable.classList.add("reference-table");

	var thisRow = document.createElement("tr");
    //thisRow.classList.add("table-border-bottom");
	   
	var thisCol = document.createElement("td");
	thisCol.colSpan = "2";
	//thisCol.classList.add("table-border-bottom");
    thisCol.appendChild(document.createTextNode("Imperative (giving orders)"));
 	thisRow.appendChild(thisCol);
	
	for (i = 1; i < 6; i++){
	   var thisCol = document.createElement("td");
	  // thisCol.classList.add("table-border-bottom");
 	   thisRow.appendChild(thisCol);
	}	
	   
    thisTable.appendChild(thisRow);
	
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbSingM));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbPluralM));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbSingF));
    thisTable.appendChild(crVerbReferenceTableRow(verbRoot, separateColumns, verbPluralF));

   thisDiv.appendChild(thisTable);

}


//-------------------------------------------------------------------
function crVerbReferenceTableRow(verbRoot, separateColumns, thisRowSpecs){
   var col;
   var group;
 
   var thisRow = document.createElement("tr");
   
   var thisCol = document.createElement("td");
   thisRow.appendChild(thisCol);

   var thisRowHeader = thisRowSpecs[0];
   var thisCol = document.createElement("td");
   thisCol.appendChild(document.createTextNode(thisRowHeader));
   thisRow.appendChild(thisCol);
	
   var nGroups = thisRowSpecs.length - 1;	
   
   for (group = 0; group < nGroups; group++){
      var thisGroup = thisRowSpecs[group + 1];
	  
	  if (separateColumns){
		 // separate columns in the root letters
         //-------------------------------------		 
	     if (thisGroup.length == 0){
		  // no content
		    for (col = 0; col < 5; col++) {
               var thisCol = document.createElement("td");
               thisCol.classList.add("table-blank-cell");
		       if (col==0){
                  thisCol.classList.add("verb-reference-table-hebrew-suffix");
		       } else if (col==4){
                  thisCol.classList.add("verb-reference-table-hebrew-prefix");
               } else {
                  thisCol.classList.add("verb-reference-table-hebrew-middle");
               }
			
			   thisRow.appendChild(thisCol);
		    }  
		  
	     } else {	  
	  
		     for (col = 0; col < 5; col++) {
                var thisCol = document.createElement("td");
		        if (col==0){
                   thisCol.classList.add("verb-reference-table-hebrew-suffix");
		        } else if (col==4){
                   thisCol.classList.add("verb-reference-table-hebrew-prefix");
                } else {
                   thisCol.classList.add("verb-reference-table-hebrew-middle");
                }
			
			    if ( thisGroup[col].length > 0) {
	              var thisSpan = document.createElement("span");
	              thisSpan.appendChild(document.createTextNode(thisGroup[col]));
	              thisSpan.classList.add("hebrew25");
			      if (col==1 | col==2 | col==3){
				      if (thisGroup[col].search(verbRoot[col-1]) > -1){
				         thisCol.classList.add("verb-reference-table-verb-root");
				         thisSpan.classList.add("verb-reference-table-verb-root");
				      } else {
				         thisSpan.classList.add("verb-reference-table-verb-root-different");
                      }					   
			      }
	              thisCol.appendChild(thisSpan);
                }
			
			    thisRow.appendChild(thisCol);
		     }  
		 }	// group.length > 0  
		 
      } else {  
		 // not separate columns, 3 root letters all in one column
         //-------------------------------------------------------	 
         var thisCol = document.createElement("td");
		 
	     if (thisGroup.length == 0){
		  // no content
               thisCol.classList.add("table-blank-cell");
		  
	     } else {	  
	         thisCol.classList.add("hebrew25");
	         thisCol.classList.add("verb-reference-table-hebrew");
			 
		     for (col = 4; col > -1; col--) {
			    if (col==0 | col==4 ){
			       if ( thisGroup[col].length > 0) {
	                  var thisSpan = document.createElement("span");
	                  thisSpan.appendChild(document.createTextNode(thisGroup[col]));
	                  thisCol.appendChild(thisSpan);
				   }
				} else 	if (col==1 | col==2 | col==3){
	               var thisSpan = document.createElement("span");
			       if ( thisGroup[col].length > 0) {
	                  thisSpan.appendChild(document.createTextNode(hairsp+thisGroup[col]+hairsp));
				      if (thisGroup[col].search(verbRoot[col-1]) > -1){
				         thisSpan.classList.add("verb-reference-table-verb-root");
				      } else {
				         thisSpan.classList.add("verb-reference-table-verb-root-different");
                      }	
					  
                   } else {
	                  thisSpan.appendChild(document.createTextNode(thinsp));
                   }
				   
	               thisCol.appendChild(thisSpan);
					
				}	
			
		     } // 5 sections of verb			 
			 
		 }	// group.length > 0 
		 
		 thisRow.appendChild(thisCol);
	  
	  } // not separate columns
	  
   }	  

   return thisRow;

}



//-----------------------------------------------------------------------------------

//------- specific tables-------------

//-----------------------------------------------------------------------------------
	
function crAmarVerbReferenceTable(thisDiv){
	
   var verbRoot = [resh,mem,alef];
   
   var verbI = ["I said, I say, I will say",
                [tav+dagesh+chirik+yod,resh+schwah,mem+patach,alef+kamatz,""],
	            [tav+dagesh+chirik+yod,resh+schwah,mem+patach,alef+kamatz,vav+schwah],
	            ["",resh,mem+patach,"",alef+cholam],
	            ["",resh,mem+patach,"",vav+kamatz+alef+cholam]
			   ];
   var verbYouSingM = ["you said, you say, you will say (addressing 1 male)",
                [tav+dagesh+kamatz,resh+schwah,mem+patach,alef+kamatz,""],
	            [tav+dagesh+kamatz,resh+schwah,mem+patach,alef+kamatz,vav+schwah],
	            ["",resh,mem+patach,alef,tav+dagesh+cholam],
	            ["",resh,mem+segol,alef,vav+patach+tav+dagesh+cholam+mapach]
			   ];
   var verbHe = ["he said, he says, he will say",
                 ["",resh,mem+patach,alef+kamatz,""],
	             ["",resh,mem+patach,alef+kamatz,vav+schwah],
	             ["",resh,mem+patach,alef,yod+cholam],
	             ["",resh,mem+segol,alef,vav+patach+dagesh+yod+cholam+mapach]
			   ];
   var verbWe = ["we said, we say, we will say",
                 [nun+vav+dagesh,resh+schwah,mem+kadma+patach,alef+kamatz,""],
	             [nun+vav+dagesh,resh+schwah,mem+kadma+patach,alef+kamatz,vav+schwah],
	             ["",resh,mem+patach,alef,nun+dagesh+cholam],
	             ["",resh,mem+segol,alef,vav+patach+nun+mapach+dagesh+cholam]
			   ];
   var verbYouPluralM = ["you said, you say, you will say (addressing males, or males and females)",
                [tav+dagesh+segol+finalMem,resh+schwah,mem+patach,alef+chatafPatach,""],
	            [tav+dagesh+segol+finalMem,resh+schwah,mem+patach,alef+chatafPatach,vav+patach],
	            [vav+dagesh,resh,mem+schwah,alef,tav+dagesh+cholam],
	            [vav+dagesh,resh,mem+schwah,alef,vav+patach+tav+dagesh+cholam]
			   ];
   var verbTheyMF= ["they said, they say, they will say (males and/or females)",
                [vav+dagesh,resh,mem+schwah,alef+kamatz,""],
	            [vav+dagesh,resh,mem+schwah,alef+kamatz,vav+schwah],
	            [],
	            []
			   ];
   var verbTheyM= ["they said, they say, they will say (males, or males and females)",
	            [],
	            [],
                [vav+dagesh,resh,mem+schwah,alef,yod+cholam],
	            [vav+dagesh,resh,mem+schwah,alef,vav+patach+yod+dagesh+cholam]
			   ];
   var verbShe = ["she said, she says, she will say",
                 [heh,resh+kamatz,mem+schwah,alef+kamatz,""],
	             [heh,resh+kamatz,mem+schwah,alef+kamatz,vav+schwah],
	             ["",resh,mem+patach,alef,tav+dagesh+cholam],
	             ["",resh,mem+segol,alef,vav+patach+tav+dagesh+cholam+mapach]
			   ];
   var verbYouSingF = ["you said, you say, you will say (addressing 1 female)",
                [tav+dagesh+schwah,resh+schwah,mem+patach,alef+kamatz,""],
	            ["","","","",""],
	            [yod,resh+chirik,mem+schwah,alef,tav+dagesh+cholam],
	            [yod,resh+chirik,mem+schwah,alef,vav+patach+tav+dagesh+cholam]
			   ];
   var verbYouPluralF = ["you said, you say, you will say (addressing several females)",
                ["","","","",""],
	            ["","","","",""],
	            ["","","","",""],
	            ["","","","",""]
			   ];
   var verbTheyF= ["they said, they say, they will say (females only)",
	            [],
	            [],
                [nun+kamatz+heh,resh+schwah,mem+patach+kadma,alef,tav+dagesh+cholam],
	            [nun+kamatz+heh,resh+schwah,mem+patach+kadma,alef,vav+patach+tav+dagesh+cholam]
			   ];
			   

   var verbImpSingM = ["Say! (addressing one male)",
                ["",resh,mem+cholam,alef+chatafSegol,""],
	            ];
   var verbImpPluralM = ["Say! (addressing several males, or males and females)",
                [vav+dagesh,resh,mem+schwah,alef+chirik,""],
	            ];
   var verbImpSingF = ["Say! (addressing one female)",
                [yod,resh+chirik,mem+schwah,alef+chirik,""],
	            ];
   var verbImpPluralF = ["Say! (addressing several females)",
                ["","","","",""],
	            ];

   
   crVerbReferenceTableMain(thisDiv,
                           verbRoot,
						   true,
                           verbI,verbYouSingM, verbHe, 
                           verbWe, verbYouPluralM, verbTheyMF, verbTheyM,
						   verbShe, verbYouSingF, verbYouPluralF, verbTheyF);	

	
    // note about cantillation marks indicating stressed
    thisDiv.appendChild(crNoteAboutStressedSyllable());
     // create a space between tables
   thisDiv.appendChild(crSpaceBetweenTables());
   
   crVerbReferenceTableImperative(thisDiv,
                           verbRoot,
						   true,
						   verbImpSingM, verbImpPluralM,  verbImpSingF, verbImpPluralF);

						   

}	

//-----------------------------------------------------------------------------------
function crHayaVerbReferenceTable(thisDiv){
	
   var verbRoot = [heh,yod,heh];
   
   var verbI = ["I was, I will be",
                [tav+chirik+yod,yod,yod+kadma+chirik,heh+kamatz,""],
	            [tav+chirik+yod,yod,yod+kadma+chirik,heh+kamatz,vav+schwah],
	            ["",heh,yod+segol,heh+schwah,alef+segol],
	            ["",heh,yod+segol,heh+schwah,vav+kamatz+alef+segol]
			   ];
   var verbYouSingM = ["you were, you will be (addressing 1 male)",
                [tav+kamatz,yod,yod+kadma+chirik,heh+kamatz,""],
	            [tav+kamatz,yod,yod+kadma+chirik,heh+kamatz,vav+schwah],
	            ["",heh,yod+segol,heh+schwah,tav+dagesh+chirik],
	            ["","",yod,heh+chirik,vav+patach+tav+dagesh+schwah]
			   ];
   var verbHe = ["he was, he will be",
                 ["",heh,yod+kamatz,heh+kamatz,""],
	             ["",heh,yod+kamatz,heh+kamatz,vav+schwah],
	             ["",heh,yod+segol,heh+schwah,yod+chirik],
	             ["","",yod,heh+chirik,vav+patach+yod+schwah]
			   ];
   var verbWe = ["we were, we will be",
                [nun+vav+dagesh,yod,yod+kadma+chirik,heh+kamatz,""],
	            [nun+vav+dagesh,yod,yod+kadma+chirik,heh+kamatz,vav+schwah],
	            ["",heh,yod+segol,heh+schwah,nun+chirik],
	            ["",heh,yod+segol,heh+schwah,vav+schwah+nun+chirik]
			   ];
   var verbYouPluralM = ["uou were, you will be (addressing males or males and females)",
                [tav+segol+finalMem,yod,yod+chirik,heh+chatafSegol,""],
	            [tav+segol+finalMem,yod,yod+chirik,heh+schwah,vav+chirik],
	            [vav+dagesh,"",yod,heh+schwah,tav+dagesh+chirik],
	            [vav+dagesh,"",yod,heh+schwah,vav+patach+tav+dagesh+chirik]
			   ];
   var verbTheyMF= ["they were, they will be (males and/or females)",
                [vav+dagesh,"",yod,heh+kamatz,""],
	            [vav+dagesh,"",yod,heh+kamatz,vav+schwah],
	            [],
	            []
			   ];
   var verbTheyM= ["they were, they will be (males or males and females)",
	            [],
	            [],
                [vav+dagesh,"",yod,heh+schwah,yod+chirik],
	            [vav+dagesh,"",yod,heh+schwah,vav+patach+yod+dagesh+chirik]
			   ];
   var verbShe = ["she was, she will be",
                 [heh,tav+kamatz,yod+schwah,heh+kamatz,""],
	             [heh,tav+kamatz,yod+schwah,heh+kamatz,vav+schwah],
	             ["",heh,yod+segol,heh+schwah,tav+dagesh+chirik],
	             ["","",yod,heh+chirik,vav+patach+tav+dagesh+schwah]
			   ];
   var verbYouSingF = ["you were, you will be (addressing 1 female)",
                [tav,yod,yod+chirik,heh+kamatz,""],
	            [tav,yod,yod+chirik,heh+kamatz,vav+schwah],
	            ["",yod,yod+chirik,heh+schwah,tav+chirik],
	            ["",yod,yod+chirik,heh+schwah,vav+patach+tav+dagesh+chirik]
			   ];
   var verbYouPluralF = ["you were, you will be (addressing several females)",
                ["","","","",""],
	            ["","","","",""],
	            ["","","","",""],
	            ["","","","",""]
			   ];
   var verbTheyF= ["they were, they will be (females only)",
	            [],
	            [],
                [nun+kamatz+heh,yod,yod+segol+kadma,heh+schwah,tav+dagesh+chirik],
	            [nun+kamatz+heh,yod,yod+segol+kadma,heh+schwah,vav+patach+tav+dagesh+chirik]
			   ];
			   

   var verbImpSingM = ["Be! (addressing one male)",
                ["",heh,yod+tsere,heh+chatafSegol,""],
	            ];
   var verbImpPluralM = ["Be! (addressing several males, or males and females)",
                [vav+dagesh,"",yod,heh+chatafSegol,""],
	            ];
   var verbImpSingF = ["Be! (addressing one female)",
                ["",yod,yod+chirik,heh+chatafPatach,""],
	            ];
   var verbImpPluralF = ["Be! (addressing several females)",
                ["","","","",""],
	            ];

   
  crVerbReferenceTableMain(thisDiv,
                           verbRoot,
						   true,
                           verbI,verbYouSingM, verbHe, 
                           verbWe, verbYouPluralM, verbTheyMF, verbTheyM,
						   verbShe, verbYouSingF, verbYouPluralF, verbTheyF);	

 	
    // note about cantillation marks indicating stressed
    thisDiv.appendChild(crNoteAboutStressedSyllable());
    // create a space between tables
   thisDiv.appendChild(crSpaceBetweenTables());
   
   crVerbReferenceTableImperative(thisDiv,
                           verbRoot,
						   true,
						   verbImpSingM, verbImpPluralM,  verbImpSingF, verbImpPluralF);


}	

