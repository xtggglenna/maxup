/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {

  $("#showUpdateUserModal").on("hide", function() { // remove the event listeners when the dialog is dismissed
    $("#showUpdateUserModal a.btn").off("click");
  });

  $("#showUpdateUserModal").on("hidden", function() { // remove the actual elements from the DOM when fully hidden
    $("#showUpdateUserModal").remove();
  });


  $("table").on('click', '#EditUser', function() {
    showUpdateUserModal();
    var edit = $(this).attr("name");
    //alert(edit);
    var tr = document.getElementById(edit);
    var tds = tr.getElementsByTagName("td");
    //alert(tds.length);
    for (var i = 0; i < tds.length; i++) {
      switch (i) {
        case 0:
          var username = $("#username" + edit).text();
          $("#username_update").val(username);
          break;
        case 1:
          var firstname = $("#firstname" + edit).text();
          $("#firstName_update").val(firstname);
          break;
        case 2:
          var lastname = $("#lastname" + edit).text();
          $("#lastName_update").val(lastname);
          break;
        case 3:
          var usertype = $("#usertype" + edit).text();
          $("#usertype_update").val(usertype);
          break;
        case 4:
          var lastlogin = $("#lastlogin" + edit).text();
          $("#login_update").val(lastlogin);
          break;
      }
    }
  });

  $("#UpdateUser").click(function(event) {
    var username = document.getElementById("username_update").value;
    var firstname = document.getElementById("firstName_update").value;
    var lastname = document.getElementById("lastName_update").value;
    var usertype = $('#usertype_update option:selected').val();
    var password = document.getElementById("password_update").value;
    var cfmPassword = document.getElementById("cfmpassword_update").value;

    if (usertype === "0") {
      showErrorModal("User Type not selected!");
      return;
    }

    if (password !== cfmPassword) {
      showErrorModal("Password don't match!");
      return;
    }

    // disable search button and clear table
    $("#showUpdateUserModal").modal('hide');

    // send json to servlet
    $.ajax({
      type: "POST",
      url: "/SMUtBank_APIDemo/UserServlet",
      data: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        usertype: usertype,
        password: password,
        type: "updateUser"
      },
      success: function(data) {
        $("#trans_table").html("");
        refresh();
      },
      error: function(xhr, status, error) {

      }
    });

    showSuccessModal("Successfully updated user!");
    
  });



  $("#AddNewUser").click(function() {
    $("#AddNewUserModal").modal("show");
  });

  $('#usernameNew').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });

  $('#passwordNew').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });

  $('#confirmPassword').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });

  $('#firstName').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });

  $('#lastName').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });
  
  
  $('#createButton').on('click', function(){
    var usernameNew = document.getElementById("usernameNew").value;
    var passwordNew = document.getElementById("passwordNew").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    //var userTypeSelection = document.getElementById("userType");
    //var userType = userTypeSelection.options[userTypeSelection.selectedIndex].value;
    var userType = $('#userType').val();

    var err = "";

    if (passwordNew !== confirmPassword) {
      err = "Please enter the same passowrd!";
    } else if (usernameNew.trim() === "" || passwordNew.trim() === "" || firstName.trim() === "" || lastName.trim() === "" || userType.trim() === "") {
      err = "Please input all the fields!";
    }


    if (err === "") {
      if (document.getElementById("ErrorMessage") !== null) {
        var parent = document.getElementById("newUser");
        var child = document.getElementById("ErrorMessage");
        parent.removeChild(child);
      }
      var data = {
        username: usernameNew,
        password: passwordNew,
        firstName: firstName,
        lastName: lastName,
        userType: userType,
        type: "create"
      }

      $.ajax({
        url: '/SMUtBank_APIDemo/UserServlet',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(data) {
          if (data.success) {
            document.getElementById("newUser").reset();
            $("#trans_table").html("");
            refresh();
            showSuccessModal("New user has been created successfully.");
          } else {
            showErrorModal("Creation Failed.");
          }
        },
        error: function(xhr, status, error) {
          // alert(xhr.error);
        }
      });
    } else {
      showErrorModal(err);
    }
  })

  $("#confirmPassword").blur(function() {
    var passwordNew = document.getElementById("passwordNew").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (passwordNew !== confirmPassword) {
      if (document.getElementById("PasswordErr") === null) {
        var div = document.getElementById("confirm");
        var div_outer = document.createElement('div');
        div_outer.id = "PasswordErr";
        div_outer.className = "form-group";

        var div_left = document.createElement('div');
        div_left.className = "col-sm-3";

        var div_right = document.createElement('div');
        div_right.className = "col-sm-9";
        div_right.id = "err";
        div_right.innerHTML = "&nbsp;&nbsp;Please enter the same passowrd!";
        div_right.style.color = "red";
        div_right.style.size = "2";

        div_outer.appendChild(div_left);
        div_outer.appendChild(div_right);

        div.appendChild(div_outer);
      }
    } else {
      var child = document.getElementById("PasswordErr");
      if (child !== null) {
        var parent = document.getElementById("confirm");
        parent.removeChild(child);
      }
    }
  });

  refresh(); // by default

  $("table").on('click', '#DeleteUser', function() {
    var del = $(this).attr("name");
    $("#myModal").modal({ // wire up the actual modal functionality and show the dialog
      "backdrop": "static",
      "keyboard": true,
      "show": true // ensure the modal is shown immediately
    });
    $("#myModal #cfmDelete").on("click", function(e) {
      $("#myModal").modal('hide'); // dismiss the dialog

      var username = $("#username" + del).text();

      // set request parameters
      var parameters = {
        username: username
      };

      parameters = JSON.stringify(parameters);

      // send json to servlet
      $.ajax({
        type: "POST",
        url: "/SMUtBank_APIDemo/UserServlet?type=deleteUser",
        contentType: "application/json",
        dataType: "json",
        data: parameters
      });

      
      $("#trans_table").html("");
      refresh();
      showSuccessModal("Successfully delete user!");
    });
  });


});

function showSuccessModal(successMessage) {
  document.getElementById("successMsg").innerHTML = successMessage;
  $('#successModal').modal('show');

  setTimeout(function() {
    $("#user_create").click(); //Delay the refresh to show the success message before refreshing
  }, 2500);

}

function leaveChange() {
  if (document.getElementById("userType").value != "") {
    document.getElementById("createButton").disabled = false;
  }
}

function showErrorModal(errorMessage) {
  document.getElementById("errorMsg").innerHTML = errorMessage;
  $('#errorModal').modal('show');
}

function refresh() {
  $.get("/SMUtBank_APIDemo/UserServlet?type=retrieveUser", {
    "_": $.now()
  }, function(responseJson) {
    //alert(responseJson);
    var strings = responseJson.split(",");
    var htmlcode = "";

    htmlcode += "<tr>";
    htmlcode += "<th>Username<\/th>";
    htmlcode += "<th>First Name<\/th>";
    htmlcode += "<th>Last Name<\/th>";
    htmlcode += "<th>User Type<\/th>";
    htmlcode += "<th>Last Logged In<\/th>";
    htmlcode += "<th>Action<\/th>";
    htmlcode += "<\/tr>";

    var count = 1;
    for (var i = 0; i < strings.length; i += 5) {
      htmlcode += "<tr class='record' id='" + count + "'>";
      htmlcode += "<td class='username' id='username" + count + "'>" + strings[i] + "<\/td>";
      htmlcode += "<td class='firstname' id='firstname" + count + "'>" + strings[i + 1] + "<\/td>";
      htmlcode += "<td class='lastname' id='lastname" + count + "'>" + strings[i + 2] + "<\/td>";
      htmlcode += "<td class='userType' id='usertype" + count + "'>" + strings[i + 3] + "<\/td>";
      htmlcode += "<td id='lastlogin" + count + "'>" + strings[i + 4] + "<\/td>";
      htmlcode += "<td><button id='EditUser' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button> <button id='DeleteUser' type='button' class='btn btn-xs btn-danger' name='" + count + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Delete<\/button><\/td>";

      htmlcode += "<\/tr>";
      count++;
    }
    htmlcode += "<\/select>";
    $("#trans_table").html(htmlcode);
  });
}

function showUpdateUserModal() {
  $('#showUpdateUserModal').modal('show');
}

function search() {
  var counter = 0;
  var questionNameSearch = $('#usernameSearch').val().trim().toLowerCase();
  $.each($(".record"), function(i) {
    $(this).removeClass("hidden1");
    var question_name = $(this).children(".username").text().toLowerCase();
    var first_name = $(this).children(".firstname").text().toLowerCase();
    var last_name = $(this).children(".lastname").text().toLowerCase();
    if (question_name.indexOf(questionNameSearch) != -1 || first_name.indexOf(questionNameSearch) != -1 || last_name.indexOf(questionNameSearch) != -1) {
      if ( !$(this).hasClass("hidden2") ) { // 
                $(this).show();
                counter++;
            } 
    } else {
      $(this).hide();
      $(this).addClass("hidden1");
    }
  });
  //$("#recordsLength").text(counter);
}


function filter() {
    var counter = 0;
    var filtering = $("#userFilter").val().trim().toLowerCase();
    $.each($(".record"), function(i) {
        $(this).removeClass("hidden2");
        var question_type = $(this).children(".userType").text().toLowerCase();
        console.log("filtering: " + filtering);
        console.log("question type: " + question_type);
        if (question_type == filtering  ) { // If search string matches records
            if ( !$(this).hasClass("hidden1") ) { // 
                $(this).show();
                counter++;
            } 
        } else if (filtering == "blank") {
            $(this).removeClass("hidden2");
            if ( !$(this).hasClass("hidden1")) {
                $(this).show();
            }
        } else {
          $(this).hide();
          $(this).addClass("hidden2");
        }
      });
}

    
