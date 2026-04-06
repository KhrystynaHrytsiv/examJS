let form = document.forms[0];
let infoBlock = document.getElementsByClassName('infoBlock')[0];
let array = [];
form.onsubmit = function (ev){
    ev.preventDefault();
    let input = form.keys.value;
    let match = input.match(/^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/);
    let error = document.getElementById('error');
    if (match){
        let name = match[1];
        let value = match[2];
        array.push({name, value});
        error.style.display = 'none';
        show()
    }else {
        error.style.display = 'block';
    }
    form.reset()
}
function show (){
    infoBlock.innerHTML = '';
    array.forEach(item =>{
        let div = document.createElement('div');
        div.innerText = `${item.name} = ${item.value}`;
        infoBlock.appendChild(div);
    })
}

let sortByNameButton = document.getElementById('sortByName');
sortByNameButton.onclick = function (){
    array.sort((a, b) => a.name - b.name);
    show()
};
let sortByValueButton = document.getElementById('sortByValue');
sortByValueButton.onclick = function (){
    array.sort((a, b) => a.value - b.value);
    show()
};

let deleteButton = document.getElementById('delete');
deleteButton.onclick = function (){
    infoBlock.innerText = ''
    array = [];
};