function changeNavBar() {
  var optionalLogin = document.getElementsByClassName("optionalLogin")[0];
  var optionalLogout = document.getElementsByClassName("optionalLogout")[0];
  var optionalProfile = document.getElementsByClassName("optionalProfile")[0];
  // var optionalPostNewBlog = document.getElementsByClassName(
  //   "optionalPostNewBlog"
  // )[0];
  // var optionalMealPrep = document.getElementsByClassName("optionalMealPrep")[0];
  var request = new XMLHttpRequest();

  var url = "backendProcess/checkStatus.php";

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      if (result == "false") {
        //display new user page (hide log out and profile and new blog post)
        optionalLogin.id = "";
        optionalLogout.id = "optionalLogout";
        optionalProfile.id = "optionalProfile";
        // optionalMealPrep.id = "optionalMealPrep";
      } else {
        //display logged in page (hide login/sign )
        optionalLogin.id = "optionalLogin";
        optionalLogout.id = "";
        optionalProfile.id = "";
        // optionalMealPrep.id = "";
      }
    }
  };

  request.open("GET", url, true);
  request.send();
}
