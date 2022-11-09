/* enable strict mode */
'use strict';

// create redips container
let redips = {};
var first=true;


// redips initialization
redips.init = function () {
	if(first){
		retrievePlan();
		document.getElementById("receipt-list").innerHTML +=`
		<tr>
			<td>
				<div class="redips-drag redips-clone" style="border-style:solid;cursor:move;">
					<img src="https://www.edamam.com/web-img/4f0/4f090a3a481c1f2b4d3afea39fe45d7e.jpg" class = 'img-fluid rounded'> <br>
					<a style="color:black;" href="https://www.epicurious.com/recipes/food/views/the-coconut-cake-baked-by-melissa">The Coconut Cake</a>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div class="redips-drag redips-clone" style="border-style:solid;cursor:move;">
					<img src="https://www.edamam.com/web-img/fb2/fb236074102bc19e60e975e0809f4deb" class = 'img-fluid rounded'> <br>
					<a style="color:black;" href="https://www.bonappetit.com/recipe/pasta-with-pancetta-and-miso?verso=true">Pasta with Pancetta and Miso</a>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div class="redips-drag redips-clone" style="border-style:solid;cursor:move;">
					<img src="https://www.edamam.com/web-img/b07/b072b5e540fe302ead7a4ac06e6435f2.jpeg" class = 'img-fluid rounded'> <br>
					<a style="color:black;" href="https://www.foodnetwork.com/recipes/rachael-ray/tropical-breakfast-parfait-recipe-1957021">Tropical Breakfast Parfait</a>
				</div>
			</td>
		</tr>
		`;
		first=false;
	}
	// reference to the REDIPS.drag object
	let rd = REDIPS.drag;
	// initialization
	rd.init();
	// REDIPS.drag settings
	rd.dropMode = 'single';			// dragged elements can be placed only to the empty cells
	rd.hover.colorTd = '#9BB3DA';	// set hover color
	rd.clone.keyDiv = true;			// enable cloning DIV elements with pressed SHIFT key
	// prepare node list of DIV elements in table2
	redips.divNodeList = document.getElementById('table2').getElementsByTagName('div');
	// set cloned flag (needed im checkColumn() function)
	rd.event.moved = function (cloned) {
		redips.clonedFlag = cloned;
	};
	// prevent two subjects in the same column
	rd.event.droppedBefore = function (targetCell) {
		// call redips.checkColumn and return result (true or false)
		// in case of false, REDIPS.drag will cancel DIV dropping
		let column = redips.checkColumn(rd.obj, targetCell);
		// return true / false
		return column;
	};
	// element is dropped
	rd.event.dropped = function () {
		let objOld = rd.objOld,					// original object
			targetCell = rd.td.target,			// target cell
			targetRow = targetCell.parentNode,	// target row
			i, objNew;							// local variables
	};
};


// save elements and their positions
function save() {
	// scan timetable content
	let content = REDIPS.drag.saveContent('table2');
	
	var url = "./backendProcess/update_mealplan.php?" + content;		
	var request = new XMLHttpRequest();
	var title = document.getElementById("title")

	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText //string
			if (result == "login"){
				window.location.href="./login.html";
			}
			else{	
				result = JSON.parse(result);
				if (result=='true') {
					title.innerText = "Updated";
				} else {
					title.innerText = "Please try again later!";
				}
			}

		}
	}

	request.open("GET", encodeURI(url), true)
	request.send()

};

function del(){
	document.getElementById("table2").innerHTML=
	`
	<colgroup>
	<col width="50px"/>
	<col width="100px"/>
	<col width="100px"/>
	<col width="100px"/>
	<col width="100px"/>
	<col width="100px"/>
	<col width="100px"/>
	<col width="100px"/>
</colgroup>
<tbody>
	<tr>
		
		<td td class = "redips-mark blank" style = 'border-left-color: white; border-top-color:white'>
	
		</td>
		<td class="redips-mark clear">Mon</td>
		<td class="redips-mark clear">Tue</td>
		<td class="redips-mark clear">Wed</td>
		<td class="redips-mark clear">Thu</td>
		<td class="redips-mark clear">Fri</td>
		<td class="redips-mark clear">Sat</td>
		<td class="redips-mark clear">Sun</td>

	</tr>
	<tr>
		<td class="redips-mark clear">Breakfast</td>
		<td id="row1col1" class='offwhite'></td>
		<td id="row1col2" class='offwhite'></td>
		<td id="row1col3" class='offwhite'></td>
		<td id="row1col4" class='offwhite'></td>
		<td id="row1col5" class='offwhite'></td>
		<td id="row1col6" class='offwhite'></td>
		<td id="row1col7" class='offwhite'></td>
	</tr>
	<tr>
		<td class="redips-mark clear">Snack</td>
		<td id="row2col1" class='offwhite'></td>
		<td id="row2col2" class='offwhite'></td>
		<td id="row2col3" class='offwhite'></td>
		<td id="row2col4" class='offwhite'></td>
		<td id="row2col5" class='offwhite'></td>
		<td id="row2col6" class='offwhite'></td>
		<td id="row2col7" class='offwhite'></td>
	</tr>
	<tr>
		<td class="redips-mark clear">Lunch</td>
		<td id="row3col1" class='offwhite'></td>
		<td id="row3col2" class='offwhite'></td>
		<td id="row3col3" class='offwhite'></td>
		<td id="row3col4" class='offwhite'></td>
		<td id="row3col5" class='offwhite'></td>
		<td id="row3col6" class='offwhite'></td>
		<td id="row3col7" class='offwhite'></td>
	</tr>
	<tr>
		<td class="redips-mark clear">Snack</td>
		<td id="row4col1" class='offwhite'></td>
		<td id="row4col2" class='offwhite'></td>
		<td id="row4col3" class='offwhite'></td>
		<td id="row4col4" class='offwhite'></td>
		<td id="row4col5" class='offwhite'></td>
		<td id="row4col6" class='offwhite'></td>
		<td id="row4col7" class='offwhite'></td>
	</tr>
	<tr>
		<td class="redips-mark clear">Dinner</td>
		<td id="row5col1" class='offwhite'></td>
		<td id="row5col2" class='offwhite'></td>
		<td id="row5col3" class='offwhite'></td>
		<td id="row5col4" class='offwhite'></td>
		<td id="row5col5" class='offwhite'></td>
		<td id="row5col6" class='offwhite'></td>
		<td id="row5col7" class='offwhite'></td>
	</tr>
	<tr>
		<td class="redips-mark clear">Supper</td>
		<td id="row6col1" class='offwhite'></td>
		<td id="row6col2" class='offwhite'></td>
		<td id="row6col3" class='offwhite'></td>
		<td id="row6col4" class='offwhite'></td>
		<td id="row6col5" class='offwhite'></td>
		<td id="row6col6" class='offwhite'></td>
		<td id="row6col7" class='offwhite'></td>
	</tr>
</tbody>
	`;
}



redips.checkColumn = function (obj, targetCell) {
	let rd = REDIPS.drag,			// define reference to the REDIPS.drag library
		id = obj.id.substr(0, 2),	// ID of dropped DIV element (only first two chars)
		tbl = rd.findParent('TABLE', targetCell),	// reference to the target table
		col = targetCell.cellIndex,	// set column where DIV element is dropped
		subject, cell, i;			// local variables
	// loop goes through all rows in target table
	for (i = 0; i < tbl.rows.length; i++) {
		// define cell in a target column
		cell = tbl.rows[i].cells[col];
		// cell can be undefined in case of colspan 
		if (cell !== undefined) {
			// skip target cell if is the same as source cell
			// DIV belongs to source cell in droppedBefore stage
			if (redips.clonedFlag === false && cell === rd.td.source) {
				continue;
			}
			// each cell can have only one subject
			subject = cell.getElementsByTagName('div')[0];
			// if subject exists and is the same as dropped DIV element
			if (subject !== undefined && id === subject.id.substr(0, 2)) {
				return false;
			}
		}
	}
	// if column is clear then return true
	return true;
};

// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redips.init, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redips.init);
}

function getRecipe2() {
	var q=document.getElementById('search2').value;
	if (q.trim() == '') {
		document.getElementById("receipt-list").innerHTML = "You did not entered anything...";
	}
	else{
		//Edamam API
		var edamamAPIKey = "d4265655fd92fef90f747bb4391d2c28";
		/* As this is a free API, there is a limit to number of results. Set it to a number you find appropriate*/
		var apiID = "d9c08e20";
				var url = "https://api.edamam.com/search?q=" + q + "&app_id=" + apiID + "&app_key=" + edamamAPIKey;

				var request = new XMLHttpRequest();
				var numberofResults=9;
				

				request.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						document.getElementById("receipt-list").innerHTML = '';
						var str = '';
						var res = JSON.parse(this.responseText);
						if (res.count == 0){
							document.getElementById("receipt-list").innerHTML = "Not search results";
						}
						else{
							var count = 0;
							for (var i = 0; i < numberofResults; i++) {

								var titleText = res.hits[i].recipe.label;
								var photo = res.hits[i].recipe.image
								var recipeUrl = res.hits[i].recipe.url;
								var labels = []; //All the healthy food labels

								for (var j = 0; j < res.hits[i].recipe.dietLabels.length; j++) {
									labels.push(res.hits[i].recipe.dietLabels[j]);
								}
								for (var k = 0; k < res.hits[i].recipe.healthLabels.length; k++) {
									labels.push(res.hits[i].recipe.healthLabels[k]);
								}

								var ingredientsList = res.hits[i].recipe
								.ingredientLines; //List of ingredients to show on Modal

								var labelStr = labels.join(", ");
								count++;
								str += `
								<tr>
									<td>
										<div class="redips-drag redips-clone" style="border-style:solid;cursor:move;">
											<img src="${photo}" class = 'img-fluid rounded'> <br>
											<a style="color:black" href="${recipeUrl}">${titleText}</a>
										</div>
									</td>
								</tr>
								`;
								// saving images and links into database
								var url1 = "./backendProcess/addSearch.php?receipe="+titleText+"&image="+photo+"&url="+recipeUrl;		
								var request1 = new XMLHttpRequest();
								request1.open("GET", encodeURI(url1), true)
								request1.send()
							}
							document.getElementById("receipt-list").innerHTML = str;
							redips.init();

						}
						

					} else {
						document.getElementById("receipt-list").innerHTML = "Loading";
					}
				}

				request.open("GET", encodeURI(url), true);
				request.send();
			}
		}
function retrievePlan(){
		var url = "./backendProcess/retrieve_mealplan.php";		
		var request = new XMLHttpRequest();
		var $row=1;
		var $col = 1;
	
		request.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var results = this.responseText //string
				if (results == "login"){
					window.location.href="./login.html";
				}
				else{
					results = JSON.parse(results);
					if (results!='') {
						for(let i=0;i<results.length;i++){
							var id="row"+results[i][0]+"col"+results[i][1];
							if (results[i][2] != null){
								document.getElementById(id).innerHTML = "<div class='redips-drag redips-clone' style='border-style:solid;cursor:move;'><img src=" + results[i][3] + " class = 'img-fluid rounded'><a style='color:black' href='" + results[i][4] + "'>" + results[i][2] + "</a></div>";
							}
							
						}
						
					} 
				}
				
			}
		}
	
		request.open("GET", encodeURI(url), true)
		request.send()

}