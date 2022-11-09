//Edamam API
var edamamAPIKey = "fe9f081208967d6e0560da72256819a2";
var apiID = "c02c1563";
var btn = document.getElementById('btn');
btn.addEventListener('click', analyse);

function analyse() {
    var q = document.getElementById('search').value;
    var url = "https://api.edamam.com/api/nutrition-data?app_id=" + apiID + "&app_key=" + edamamAPIKey +
        "&ingr=" + q;
    var str = '';
    var toDisplay = document.getElementById('nutri');
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.status == 400) { //Did not enter anything causing status 400
            toDisplay.innerHTML = 'Please enter something...';
        }
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            

            //Nutritional Variables and Data Validation
            if (res.totalWeight == 0) { //If user enter something funny

                toDisplay.innerHTML = 'You entered a invalid input';
            } else {
                var weight = res.totalWeight + 'g'; //Total weight

                if (!res.hasOwnProperty('calories')) { //calories
                    var calories = 'No data';
                } else {
                    var calories = res.calories;
                }

                if (!res.totalNutrientsKCal.hasOwnProperty('FAT_KCAL')) { //Calories from fat
                    var caloriesFromFat = 'No data';
                } else {
                    var caloriesFromFat = res.totalNutrientsKCal.FAT_KCAL.quantity.toFixed(1) + res
                        .totalNutrientsKCal.FAT_KCAL.unit;
                }

                if (!res.totalNutrients.hasOwnProperty('FAT')) { //Total Fat
                    var totalFat = 'No data';
                } else {
                    var totalFat = res.totalNutrients.FAT.quantity.toFixed(1) + res.totalNutrients.FAT.unit;
                }

                if (!res.totalNutrients.hasOwnProperty('FASAT')) { // Saturated Fat
                    var saturatedFat = 'No data';
                } else {
                    var saturatedFat = res.totalNutrients.FASAT.quantity.toFixed(1) + res.totalNutrients
                        .FASAT
                        .unit;
                }

                if (!res.totalNutrients.hasOwnProperty('FAMS')) { //Monounsaturated Fat
                    var monoUnSaturatedFat = 'No data';
                } else {
                    var monoUnSaturatedFat = res.totalNutrients.FAMS.quantity.toFixed(1) +
                        res.totalNutrients.FAMS.unit;
                }

                if (!res.totalNutrients.hasOwnProperty('FAPU')) { //Polyunsaturated Fat
                    var polyUnSaturatedFat = 'No data';
                } else {
                    var polyUnSaturatedFat = res.totalNutrients.FAPU.quantity.toFixed(1) +
                        res.totalNutrients.FAPU.unit;
                }

                if (!res.totalNutrients.hasOwnProperty('CHOLE')) { //Cholesterol
                    var cholesterol = 'No data';
                } else {
                    var cholesterol = res.totalNutrients.CHOLE.quantity.toFixed(1) + res.totalNutrients
                        .CHOLE
                        .unit;
                }

                if (!res.totalNutrients.hasOwnProperty('NA')) { //Sodium
                    var sodium = 'No data';
                } else {
                    var sodium = res.totalNutrients.NA.quantity.toFixed(1) + res.totalNutrients.NA.unit;
                }

                if (!res.totalNutrients.hasOwnProperty('CHOCDF')) { //Total Carbohydrates
                    var totalCarbs = 'No data';
                } else {
                    var totalCarbs = res.totalNutrients.CHOCDF.quantity.toFixed(1) + res.totalNutrients
                        .CHOCDF
                        .unit;
                }

                if (!res.totalNutrients.hasOwnProperty('FIBTG')) { //Dietary Fiber
                    var dietaryFiber = 'No data';
                } else {
                    var dietaryFiber = res.totalNutrients.FIBTG.quantity.toFixed(1) + res.totalNutrients
                        .FIBTG
                        .unit;
                }

                if (!res.totalNutrients.hasOwnProperty('SUGAR')) { //Sugar
                    var sugar = 'No data';
                } else {
                    var sugar = res.totalNutrients.SUGAR.quantity.toFixed(1) + res.totalNutrients.SUGAR
                        .unit;
                }

                if (!res.totalNutrients.hasOwnProperty('PROCNT')) { //Protein
                    var protein = 'No data';
                } else {
                    var protein = res.totalNutrients.PROCNT.quantity.toFixed(1) + res.totalNutrients.PROCNT
                        .unit;
                }

                if (!res.totalNutrients.hasOwnProperty('VITA_RAE')) { //Vitamin A
                    var vitaminA = 'No data';
                } else {
                    var vitaminA = res.totalNutrients.VITA_RAE.quantity.toFixed(1) + res.totalNutrients
                        .VITA_RAE
                        .unit;
                }

                if (!res.totalNutrients.hasOwnProperty('VITC')) { //Vitamin C
                    var vitaminC = 'No data';
                } else {
                    var vitaminC = res.totalNutrients.VITC.quantity.toFixed(1) + res.totalNutrients.VITC
                        .unit;
                }

                if (!res.totalNutrients.hasOwnProperty('CA')) { //Calcium
                    var calcium = 'No data';
                } else {
                    var calcium = res.totalNutrients.CA.quantity.toFixed(1) + res.totalNutrients.CA.unit;
                }

                if (!res.totalNutrients.hasOwnProperty('FE')) { //Iron
                    var iron = 'No data';
                } else {
                    var iron = res.totalNutrients.FE.quantity.toFixed(1) + res.totalNutrients.FE.unit;
                }


                //Daily Needs in % and Data Validation
                if (!res.totalDaily.hasOwnProperty('FAT')) { //Daily Fat
                    var dailyFat = 'No data';
                } else {
                    var dailyFat = Math.ceil(res.totalDaily.FAT.quantity) + '%';
                }

                if (!res.totalDaily.hasOwnProperty('FASAT')) { //Daily Saturated Fat
                    var dailySatFat = 'No data';
                } else {
                    var dailySatFat = Math.ceil(res.totalDaily.FASAT.quantity) + '%';
                }

                if (!res.totalDaily.hasOwnProperty('CHOLE')) { //Daily Cholesterol
                    var dailyCholes = 'No data';
                } else {
                    var dailyCholes = Math.ceil(res.totalDaily.CHOLE.quantity) + '%';
                }

                if (!res.totalDaily.hasOwnProperty('NA')) { //Daily Sodium
                    var dailySodium = 'No data';
                } else {
                    var dailySodium = Math.ceil(res.totalDaily.NA.quantity) + '%';
                }

                if (!res.totalDaily.hasOwnProperty('CHOCDF')) { //Daily Carbohydrates
                    var dailyCarbs = 'No data';
                } else {
                    var dailyCarbs = Math.ceil(res.totalDaily.CHOCDF.quantity) + '%';
                }

                if (!res.totalDaily.hasOwnProperty('FIBTG')) { //Daily Dietary Fiber
                    var dailyFiber = 'No data';
                } else {
                    var dailyFiber = Math.ceil(res.totalDaily.FIBTG.quantity) + '%';
                }

                if (!res.totalDaily.hasOwnProperty('PROCNT')) { //Daily Protein
                    var dailyProtein = 'No data';
                } else {
                    var dailyProtein = Math.ceil(res.totalDaily.PROCNT.quantity) + '%';
                }

                //Creation of table
                str += `<section class="performance-facts">
                            <header class="performance-facts__header">
                                <h1 class="performance-facts__title">Nutrition Facts</h1>
                                <p>Total Weight: ${weight} </p>
                            </header>
                            <table class="performance-facts__table">
                                <thead>
                                    <tr>
                                        <th colspan="3" class="small-info">
                                            Amount Per Serving
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th colspan="2">
                                            <b>Calories</b>
                                            ${calories}
                                        </th>
                                        <td>
                                            Calories from Fat
                                            ${caloriesFromFat}
                                        </td>
                                    </tr>
                                    <tr class="thick-row">
                                        <td colspan="3" class="small-info">
                                            <b>% Daily Value*</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">
                                            <b>Total Fat</b>
                                            ${totalFat}
                                        </th>
                                        <td>
                                            <b>${dailyFat}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Saturated Fat:
                                            ${saturatedFat}
                                        </th>
                                        <td>
                                            <b>${dailySatFat}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Monounsaturated Fat:
                                            ${monoUnSaturatedFat}
                                        </th>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Polyunsaturated Fat:
                                            ${polyUnSaturatedFat}
                                        </th>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">
                                            <b>Cholesterol</b>
                                            ${cholesterol}
                                        </th>
                                        <td>
                                            <b>${dailyCholes}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">
                                            <b>Sodium</b>
                                            ${sodium}
                                        </th>
                                        <td>
                                            <b>${dailySodium}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">
                                            <b>Total Carbohydrate</b>
                                            ${totalCarbs}
                                        </th>
                                        <td>
                                            <b>${dailyCarbs}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Dietary Fiber:
                                            ${dietaryFiber}
                                        </th>
                                        <td>
                                            <b>${dailyFiber}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Sugars:
                                            ${sugar}
                                        </th>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr class="thick-end">
                                        <th colspan="2">
                                            <b>Protein</b>
                                            ${protein}
                                        </th>
                                        <td>
                                            <b>${dailyProtein}</b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table class="performance-facts__table--grid">
                                <tbody>
                                    <tr>
                                        <td colspan="2">
                                            Vitamin A
                                            ${vitaminA}
                                        </td>
                                        <td>
                                            Vitamin C
                                            ${vitaminC}
                                        </td>
                                    </tr>
                                    <tr class="thin-end">
                                        <td colspan="2">
                                            Calcium
                                            ${calcium}
                                        </td>
                                        <td>
                                            Iron
                                            ${iron}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <p class="small-info">* Percent Daily Values are based on a 2,000 calorie diet. Your daily
                                values may be
                                higher or lower depending on your calorie needs:</p>

                            <table class="performance-facts__table--small small-info">
                                <thead>
                                    <tr>
                                        <td colspan="2"></td>
                                        <th>Calories:</th>
                                        <th>2,000</th>
                                        <th>2,500</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th colspan="2">Total Fat</th>
                                        <td>Less than</td>
                                        <td>65g</td>
                                        <td>80g</td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell"></td>
                                        <th>Saturated Fat</th>
                                        <td>Less than</td>
                                        <td>20g</td>
                                        <td>25g</td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">Cholesterol</th>
                                        <td>Less than</td>
                                        <td>300mg</td>
                                        <td>300 mg</td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">Sodium</th>
                                        <td>Less than</td>
                                        <td>2,400mg</td>
                                        <td>2,400mg</td>
                                    </tr>
                                    <tr>
                                        <th colspan="3">Total Carbohydrate</th>
                                        <td>300g</td>
                                        <td>375g</td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell"></td>
                                        <th colspan="2">Dietary Fiber</th>
                                        <td>25g</td>
                                        <td>30g</td>
                                    </tr>
                                    <tr>
                                        <th colspan="3">Protein</th>
                                        <td>50g</td>
                                        <td>50g</td>
                                    </tr>
                                </tbody>
                            </table>

                            <p class="small-info">
                                Calories per gram:
                            </p>
                            <p class="small-info text-center">
                                Fat 9
                                &bull;
                                Carbohydrate 4
                                &bull;
                                Protein 4
                            </p>
                            </div>
                            </div>`
                toDisplay.innerHTML = str;
            }
        }
        toDisplay.style.display = 'inline-block';

    }
    request.open("GET", encodeURI(url), true);
    request.send();
}