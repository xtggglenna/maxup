const params = new URLSearchParams(window.location.search);

if (params.has('error')) {
    alert('We were unable to submit your post. :-(\n\nPlease check your inputs and try again!');
}

document.forms[0].addEventListener('submit', validateForm);

function validateForm() {

    const title = document.forms[0]['title'].value;
    const username = document.forms[0]['username'].value;
    const blog = document.forms[0]['blog'].value;

    const titleError = document.getElementById('titleError');
    const usernameError = document.getElementById('usernameError');
    const blogError = document.getElementById('blogError');



    if (title.length === 0 || username.length === 0 || blog.length === 0) {
        event.preventDefault();
        if (title.length === 0) {
            titleError.className = 'text-danger d-inline';
        } else {
            titleError.className = 'd-none';
        }
        if (username.length === 0) {
            usernameError.className = 'text-danger d-inline';
        } else {
            usernameError.className = 'd-none';
        }

        if (blog.length === 0) {
            blogError.className = 'text-danger d-inline';
        } else {
            blogError.className = 'd-none';
        }
    }


}

function checkSession() {
    var url = "./backendProcess/postnewBlog.php";
    var request = new XMLHttpRequest();
    


    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = this.responseText //string
            
            if (results == "login") {
                window.location.href = "./login.html";
            }
        }
    }

    request.open("GET", encodeURI(url), true)
    request.send()

}

checkSession()