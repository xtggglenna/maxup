 //Edamam API
 var edamamAPIKey = "d4265655fd92fef90f747bb4391d2c28";
 /* As this is a free API, there is a limit to number of results. Set it to a number you find appropriate*/
 var apiID = "d9c08e20";

 function getRecipe2(q) {
     var url = "https://api.edamam.com/search?q=" + q + "&app_id=" + apiID + "&app_key=" + edamamAPIKey;

     var request = new XMLHttpRequest();
     var numberofResults = 9;

     request.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
             if (q.trim() == '') {
                 document.getElementById("output2").innerHTML = "You did not entered anything...";
             } else {
                 document.getElementById("output2").innerHTML = '';
                 var str = '';
                 var res = JSON.parse(this.responseText);
                 
                 count = 0;

                 if (res.count == 0) {
                     document.getElementById("output2").innerHTML = 'No search results';
                 }


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

                     if (count == 3) {
                         str += `</div>`;
                         count = 0;
                     }

                     if (count == 0) {
                         str += `<div class = "row">`
                     }
                     count++;

                     str += `<div class = "col-sm my-2">
                                        <div class="card h-100 mx-auto" style="width: 28rem;">
                                            <img src="${photo}" class="card-img-top">
                                                <div class="card-body d-flex flex-column">
                                                    <h3 class="card-title">${titleText}</h3>
                                                    <p class="card-text">${labelStr}</p>
                                                    <div class = "align-self-end mt-auto">
                                                    <a href="${recipeUrl}" class="align-self-end btn btn-lg btn-block btn-success mb-2 justify-content-center" target = "_blank">Recipe</a>
                                                    
                                                    <!-- Button trigger modal -->
                                                    <button type="button" class="align-self-end btn btn-lg btn-block btn-success justify-content-center" data-toggle="modal" data-target="#myModal${i}">
                                                        Ingredients
                                                    </button> </div>
                                                    
                                                    <!-- Modal -->
                                                    <div class="modal fade" id="myModal${i}" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h3 class="modal-title" id="myModalLabel${i}">${titleText}</h3>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body"> 
                                                                    <b> Ingredients Needed: </b>
                                                                    <ul>`;
                     for (var ingredient of ingredientsList) {
                         str += `<li id = "ingreList">${ingredient}</li>`;
                     }

                     str += `</ul>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>`;


                 }
                 document.getElementById("output2").innerHTML = str;

             }
             document.getElementById("output2").style.display = "block";

         } else {
             document.getElementById("output2").innerHTML = "Loading";
             document.getElementById("output2").style.display = "block";
         }
     }

     request.open("GET", encodeURI(url), true);
     request.send();
 }