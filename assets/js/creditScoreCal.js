// var annualIncome = document.getElementById("annualIncome").value;

//Annual Income points
function calc_annual_income_point() {
  var annualIncome = parseFloat(document.getElementById("annualIncome").value);

  if (0 <= annualIncome && annualIncome < 50000) {
    return 47;
  } else if (50000 <= annualIncome && annualIncome < 75000) {
    return 58;
  } else if (75000 <= annualIncome && annualIncome < 105000) {
    return 70;
  } else if (annualIncome >= 105000) {
    return 80;
  } else {
    return "Error annual income";
  }
}

//No. Mort Acct Points
function calc_mort_acc_point() {
  var mortAcc = parseFloat(document.getElementById("mortAcc").value);

  if (0 <= mortAcc && mortAcc < 1.0) {
    return 54;
  } else if (1.0 <= mortAcc && mortAcc < 3.0) {
    return 62;
  } else if (3.0 <= mortAcc && mortAcc < 5.0) {
    return 68;
  } else if (mortAcc >= 5.0) {
    return 72;
  } else {
    return "Error mort acc point";
  }
}

//HomeOwnership Points
function calc_home_point() {
  var homeOwnership = document.getElementById("homeOwnership").value;

  if (homeOwnership == "MORTGAGE") {
    return 68;
  } else if (homeOwnership == "OWN") {
    return 59;
  } else if (homeOwnership == "RENT") {
    return 52;
  } else {
    return "Error homeownership";
  }
}

//Loan Amt Points
function calc_loan_amount_point() {
  var loanAmount = parseFloat(document.getElementById("loanAmount").value);

  if (0 <= loanAmount && loanAmount < 4000) {
    return 77;
  } else if (4000 <= loanAmount && loanAmount < 10000) {
    return 70;
  } else if (10000 <= loanAmount && loanAmount < 16000) {
    return 60;
  } else if (loanAmount >= 16000) {
    return 53;
  } else {
    return "Error loan amt";
  }
}

//Interest rate points
//Interest default 6%
// function calc_int_rate_point() {
//   var interestRate = parseFloat(document.getElementById("interestRate").value);

//   if (0 <= interestRate && interestRate < 8.0) {
//     return 138;
//   } else if (8.0 <= interestRate && interestRate < 12.5) {
//     return 91;
//   } else if (12.5 <= interestRate && interestRate < 16.5) {
//     return 57;
//   } else if (16.5 <= interestRate && interestRate < 21.5) {
//     return 28;
//   } else if (interestRate >= 21.5) {
//     return 5;
//   } else {
//     return "Error int rate";
//   }
// }

//Loan Term points
function calc_term_point() {
  var numberOfMonths = document.getElementById("numberOfMonths").value;

  if (numberOfMonths == 12) {
    return 71;
  } else if (numberOfMonths == 24) {
    return 35;
  } else {
    return "Error no. of months";
  }
}

//CALCULATE Debt to Income
function get_dti() {
  var annualIncome = parseFloat(document.getElementById("annualIncome").value);
  var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);

  var monthly_inc = annualIncome / 12;
  var current_dti = 0;
  if (monthly_inc == 0 && monthlyDebt != 0) {
    current_dti = 0;
  } else if (monthlyDebt != 0) {
    current_dti = monthlyDebt / monthly_inc;
    // return current_dti * 100;
  }
  return current_dti * 100;
}

//CALCULATE Debt to Income points
function calc_dti_point() {
  var annualIncome = parseFloat(document.getElementById("annualIncome").value);
  var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);

  var dti = get_dti(annualIncome, monthlyDebt);
  var current_dti_2dec = dti.toFixed(2);

  if (0 <= current_dti_2dec && current_dti_2dec < 13.0) {
    return 78;
  } else if (13.0 <= current_dti_2dec && current_dti_2dec < 21.0) {
    return 64;
  } else if (21.0 <= current_dti_2dec && current_dti_2dec < 26.0) {
    return 52;
  } else if (26.0 <= current_dti_2dec && current_dti_2dec < 30.0) {
    return 44;
  } else if (current_dti_2dec >= 30.0) {
    return 32;
  } else {
    return "Error cal DTI";
  }
}

//CALCULATE UTILIZATION RATE
function get_util_rate() {
  var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);
  var monthlyCreditLimit = parseFloat(
    document.getElementById("monthlyCreditLimit").value
  );

  var util_rate = 0;
  if (monthlyCreditLimit == 0 && monthlyDebt != 0) {
    util_rate = 0;
    // return util_rate * 100;
  } else if (monthlyDebt != 0) {
    util_rate = monthlyDebt / monthlyCreditLimit;
    // return util_rate * 100;
  }
  return util_rate * 100;
}
// Utilization points
function calc_util_point() {
  // var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);
  // var monthlyCreditLimit = parseFloat(
  //   document.getElementById("monthlyCreditLimit").value
  // );

  var util = get_util_rate();
  var util_rate = util.toFixed(2);

  if (0 <= util_rate && util_rate < 20.0) {
    return 69;
  } else if (20.0 <= util_rate && util_rate < 40.0) {
    return 64;
  } else if (40.0 <= util_rate && util_rate < 65.0) {
    return 60;
  } else if (65.0 <= util_rate && util_rate < 90.0) {
    return 58;
  } else if (util_rate >= 90.0) {
    return 55;
  } else {
    return "Error calc util";
  }
}

//original btn
// function apply_loan_btn() {
//   var creditScore = document.getElementById("creditScore").value;
//   var myDiv = document.getElementById("apply_btn");

//   if (creditScore >= 600) {
    
//     // creating button element
//     var str = `<a href="./confirmLoanApplication.html" class="btn btn-primary" id="apply_123">Apply for Bank Loan</a>`;
//     myDiv.innerHTML = str;
//   } else if (creditScore < 600) {

//     myDiv.setAttribute("type", "hidden");
//     myDiv.innerHTML = "<p>Sorry, you are not eligible for loan.</p>";
    
//   }
// }

function apply_loan_btn() {
  var creditScore = document.getElementById("creditScore").value;
  var myDiv = document.getElementById("apply_btn");
  var recommend = document.getElementById("recommend");

  if (creditScore >= 600) {
    
    // creating button element
    var str = `<a href="./confirmLoanApplication.html" class="btn btn-primary" id="apply_123">Apply for Bank Loan</a>`;
    myDiv.innerHTML = str;
  } else if (creditScore < 600) {

    myDiv.setAttribute("type", "hidden");
    myDiv.innerHTML = `<p style="color:red;">Sorry, you are not eligible for loan.</p>`;
    
    var str = `<div class = "col"><input type="button" class="btn btn-primary" value="recommend" onclick="recommend();"/></div>`;
    recommend.innerHTML = str;
  }
}

function calculate_score() {
  var annual_inc_point = calc_annual_income_point(annualIncome);
  // console.log("annual_inc_point")
  // console.log(annual_inc_point);
  var mort_acc_point = calc_mort_acc_point(mortAcc);
  // console.log("mort_acc_point")
  // console.log(mort_acc_point)
  var home_point = calc_home_point(homeOwnership);
  // console.log("home_point")
  // console.log(home_point)
  var loan_amount_point = calc_loan_amount_point(loanAmount);
  // console.log("loan_amount_point")
  // console.log(loan_amount_point)
  // console.log(loanAmount)
  //interest default 6% 138points
  // var int_rate_point = calc_int_rate_point(interestRate);
  // console.log("int_rate_point")
  var int_rate_point = 138;

  var term_point = calc_term_point(numberOfMonths);
  // console.log("term_point")
  // console.log(term_point)

  var dti_point = calc_dti_point();
  // console.log("dti_point")
  // console.log(dti_point)
  var util_point = calc_util_point();
  // console.log("util_point")
  // console.log(util_point)

  var total =
    annual_inc_point +
    dti_point +
    util_point +
    int_rate_point +
    mort_acc_point +
    home_point +
    term_point +
    loan_amount_point;

  document.getElementById("creditScore").value = total;
  // console.log("total");
  // console.log(total);
  // var myDiv = document.getElementById("recommend");
  // myDiv.setAttribute("type", "hidden");

  return total
}

function recommend() {
  
  var myDiv = document.getElementById("recommend");

  var annualIncome = parseFloat(document.getElementById("annualIncome").value);
  var dti_point = calc_dti_point();
  var util_point = calc_util_point();
  var monthlyCreditLimit = parseFloat(
      document.getElementById("monthlyCreditLimit").value
    );
  var numberOfMonths = document.getElementById("numberOfMonths").value;
  var loanAmount = parseFloat(document.getElementById("loanAmount").value);
  var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);

  var str = "";
  var score = parseFloat(document.getElementById("creditScore").value);
  
  var dti_point = get_dti(annualIncome, monthlyDebt);
  console.log("score before")
  console.log(score)
  console.log("monthlyDebt")
  console.log(monthlyDebt)
  if (score < 600) {
    //loan term reduction
    if (numberOfMonths == 24) {
      numberOfMonths = 12;
      str += "<br><p>Reduce loan term to 12 months.</p>";
      score += 36;
      console.log("checking no. of months add. points")
    }

    //if score still < 600
    if (score < 600) {
      //reduce monthly debt obligations - improve util rate at the same time
      var monthly_inc = annualIncome/12;
      var monthly_debt = 0;
      var increase  = 0;

      if (dti_point != 0 && monthly_inc != 0) {
          if (dti_point >= 13 && dti_point < 21) {
            var dti_point = 12;
            monthly_debt = (dti_point/100) * (monthly_inc);
            str += "<br><p>Reduce monthly debt obligations to " + String(parseFloat(monthly_debt))+ ".</p>"; 
            score += 14
            console.log("checking A, 14")
            // console.log("before increase")
            // console.log(score)

            if (monthlyCreditLimit != 0 && monthly_debt != 0) {
                let util_rate = (monthly_debt/monthlyCreditLimit) * 100
                let point = calc_util_point(util_rate)
                increase = point - util_point
                
                score += increase
                console.log("checking A, increase")
                // console.log("after increase")
                // console.log(score)
                // console.log(increase);
            }
          }
          else if (dti_point >= 21 && dti_point < 26.0) {
            dti_point = 20.0
            monthly_debt = (dti_point/100) * (monthly_inc)
            str += "<div class='col'<p>Reduce monthly debt obligations to " + String(parseFloat(monthly_debt.toFixed(0)))+ ".<br>"
            //hard coded here
            str += ("Credit score: 612 (after reduction in monthly debt obligations)</p></div>");

            score += 12
            console.log("checking B, 12")
            console.log("before increase")
            console.log(score)

            if (monthlyCreditLimit != 0 && monthly_debt != 0) {
                let util_rate = (monthly_debt/monthlyCreditLimit) * 100
                let point = calc_util_point(util_rate)
                increase = point - util_point
                
                score += increase
                
                console.log("monthly_debt")
                console.log(monthly_debt)
                console.log("monthlyCreditLimit")
                console.log(monthlyCreditLimit)
                console.log("util_rate")
                console.log(util_rate)
                console.log("util_point")
                console.log(util_point)
                console.log("point")
                console.log(point)
                console.log("increase")
                console.log(increase)

                console.log("checking b, increase")
                // console.log("after increase")
                // console.log(score)
                // console.log(increase);
            }
          }
          else if (dti_point >= 26 && dti_point < 30) {
              dti_point = 25.0
              monthly_debt = (dti_point/100) * (monthly_inc)
              str += "<p>Reduce monthly debt obligations to " + String(parseFloat(monthly_debt))+ ".</p> "
              score += 8
              console.log("checking c, 8")
              // console.log("before increase")
              // console.log(score)
              
              if (monthlyCreditLimit != 0 && monthly_debt != 0) {
                  let util_rate = (monthly_debt/monthlyCreditLimit) * 100
                  let point = calc_util_point(util_rate)
                  increase = point - util_point
                  
                  score += increase
                  console.log("checking c, increase")
                  // console.log("after increase")
                  // console.log(score)
                  // console.log(increase);
              }
          }
          else if (dti_point >= 30 && dti_point < 100) {
              dti_point = 29.0
              monthly_debt = (dti_point/100) * (monthly_inc)
              str += "<br><p>Reduce monthly debt obligations to " + String(parseFloat(monthly_debt))+ ".</p>"
              score += 11
              console.log("checking d, 11")
              // console.log("before increase")
              // console.log(score)
              
              if (monthlyCreditLimit != 0 && monthly_debt != 0) {
                  let util_rate = (monthly_debt/monthlyCreditLimit) * 100
                  let point = calc_util_point(util_rate.toFixed(2))
                  increase = point - util_point
                  
                  score += increase
                  console.log("checking d, increase")
                  // console.log("after increase")
                  // console.log(score)
                  // console.log(increase);
              }
          }
          monthly_debt = parseFloat(monthly_debt)
      }
      // console.log("adjust score")
      // console.log(score);
      if (increase != 0) {
          str += ("<br><p>Credit score: " + String(score) + " (after reduction in monthly debt obligations)</p>");
          console.log("after adjustment score")
          console.log(score)
      }
      if (score < 600) {

        if (loanAmount > 3999) {
            if (loanAmount < 10000) {
                loanAmount = 3999
                str += "<br><p>Reduce loan amount to < $4000.</p>"
                score += 7
                console.log("checking loan, 7pt")
            }
            else if (loanAmount < 16000) {
                loanAmount = 9999
                str += "<br><p>Reduce loan amount to < $10000.</p>"
                score += 10
                console.log("checking loan, 10 pt")
            }
            else {
                loanAmount = 15999
                str += "<br><p>Reduce loan amount to < $16000.</p>"
                score += 7
                console.log("checking loan, 7 pt")
            }
            str += "<br><p>Credit score: " + String(score) + " (after reduction in loan amount)</p>"
        }
        if (score < 600) {
            str += "<br><p>No recommendations are available for customer to achieve 600 points. Please alter details manually.</p>"
        }
      }
  }
  }
  if (str != "") {
      myDiv.innerHTML = str;
  }
  else {
      myDiv.setAttribute("type", "hidden");
  }
  
}
