const postLimit = 12;
let highestID = 0;
let totalCards = 0;

function stripHTML(input) {
    return input.replace(/(<([^>]+)>)/gi, "");
}

function updateModal() {
    document.getElementById('modal-title').innerHTML = `${this.title}`;
    document.getElementById('modal-body').innerHTML = `<img src="${this.src}" class="w-100"> <span>${this.alt}</span>`
}

function addLike() {
    const id = this.id.split("-")[2];
    const request = new XMLHttpRequest();
    var title = document.getElementById("title")

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            if (data.success == true) {
                title.innerText = "Your like has been noted";
                document.getElementById('like-num-' + id).innerText++;
            } else {
                alert('Oops! Something went wrong...');
            }
        }
    };

    request.open('POST', './blog/addLike.php', true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(`id=${id}`);
}

function getLatestPosts() {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText).posts.reverse();

            const cardRow = document.getElementById('posts');

            if (data.length > 0) {
                totalCards += data.length;

                for (const post of data) {
                    let div = document.createElement('div');
                    div.className = "card";
                    div.innerHTML += `<img class="card-img-top" src="${stripHTML(post.imgLocation)}" alt="${stripHTML(post.blog)}" title="${stripHTML(post.title)}" data-toggle="modal" data-target="#exampleModalCenter">
                                                <div class="card-body">
                                                    <h5 class="card-title">${stripHTML(post.title)}</h5>
                                                    <p class="card-text"><span id="like-num-${stripHTML(post.id)}">${stripHTML(post.likes)}</span>
                                                        <span id = "like-icon-${stripHTML(post.id)}"
                                                            class="like-icon" data-toggle="modal" data-target="#outputModal">&#10084;&#65039;</span><br><b>${stripHTML(post.title)}</b>
                                                        by
                                                        ${stripHTML(post.username)}</p>
                                                </div>`;
                    div.getElementsByClassName('card-img-top')[0].addEventListener('click', updateModal);
                    div.getElementsByClassName('like-icon')[0].addEventListener('click', addLike);
                    cardRow.insertBefore(div, cardRow.firstChild);
                    highestID = post.id;
                }
            }

            while (totalCards > postLimit) {
                
                cardRow.lastElementChild.remove();

                totalCards--;

            }
        }
    };

    request.open('GET', './blog/getPosts.php?higherThanID=' + highestID, true);
    request.send();
}

getLatestPosts();

window.setInterval(getLatestPosts, 1000);