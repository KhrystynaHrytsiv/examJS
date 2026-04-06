const id = new URLSearchParams(window.location.search).get('id');
let postBlock = document.createElement('div');
postBlock.classList.add('postBlock');

let commentContainer = document.createElement('div');
commentContainer.classList.add('commentContainer');
document.body.append(postBlock, commentContainer);

fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then(response =>{
              if (!response.ok){
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(post =>{
              for (const key in post) {
                  let div = document.createElement('div');
                  div.innerText = `${key}: ${post[key]}`
                  postBlock.appendChild(div)
              }
          })
    .catch(reason =>{
        console.log(reason);
        postBlock.innerHTML = 'Error of loading data';
    })

fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments `)
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    })
          .then(comments =>{
              for (const comment of comments) {
                  let commentDiv = document.createElement('div');
                  commentDiv.classList.add('comment')
                  for (const key in comment) {
                      let p = document.createElement('p');
                      p.innerText = `${key}: ${comment[key]}`;
                      commentDiv.appendChild(p)
                  }
                  commentContainer.appendChild(commentDiv);
              }
          })
    .catch(reason =>{
        console.log(reason);
        commentContainer.innerHTML = 'Error of loading data'
    })