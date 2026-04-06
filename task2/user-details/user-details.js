const id = new URLSearchParams(window.location.search).get('id');
let userBlock = document.getElementsByClassName('userBlock')[0];
fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
          .then(response =>{
              if (!response.ok){
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json()
          })
          .then(user => openArrays(user, userBlock))
    .catch(reason => {
        console.log(reason);
        userBlock.innerHTML = 'Error of loading data'
    })

function openArrays(user, userBlock){
    for (const key in user) {
        let div = document.createElement('div');
        div.classList.add('field')
        if (typeof user[key] === 'object' && user[key] !== null) {
            div.innerText = `${key}:`;
            let insideDiv = document.createElement('div');
            insideDiv.classList.add('insideDiv')
            openArrays(user[key], insideDiv);
            div.appendChild(insideDiv)
        }else {
            div.innerText = `${key}: ${user[key]}`;
        }
        userBlock.appendChild(div)
    }
}
let button = document.getElementsByTagName('button')[0];
let postContainer = document.getElementsByClassName('postContainer')[0];
button.onclick = function (){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(response =>{
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json()
        })
        .then(posts =>{
            for (let post of posts){
                let postDiv = document.createElement('div');
                postDiv.classList.add('post');
                let title = document.createElement('p');
                title.innerText = post.title;
                let a = document.createElement('a');
                a.href = `../post-details/post-details.html?id=${post.id}`;
                a.innerText  = 'details'
                postDiv.append(title, a);
                postContainer.appendChild(postDiv);
            }
        })
        .catch(error => {
            console.error(error);
            postContainer.innerHTML = 'Error loading posts';
        });
    button.disabled = true;
}