let container = document.getElementsByClassName('container')[0];
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        for (const user of users) {
            let {id, name } = user;
            let userBLock = document.createElement('div');
            userBLock.classList.add('userBlock')
            let h3 = document.createElement('h3');
            h3.innerText = `${id}. ${name}`
            let a = document.createElement('a');
            a.innerText = 'See more details'
            a.href = `../user-details/user-details.html?id=${id}`;
            userBLock.append(h3, a);
            container.appendChild(userBLock);
        }
    })   .catch(reason =>{
    console.log(reason);
    container.innerHTML = 'Error of loading data'
})
