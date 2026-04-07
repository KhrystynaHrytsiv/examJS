let form = document.forms[0];
let infoBlock = document.getElementsByClassName('infoBlock')[0];
let array = [];
let inputField = form.keys;
let error = document.getElementById('error');

inputField.addEventListener('input', function () {
    let value = inputField.value.trim();
    if (value === '') {
        error.style.display = 'none';
        return;
    }
    let match = value.match(/^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/);
    error.style.display = match ? 'none' : 'block';
});
form.onsubmit = function (ev){
    ev.preventDefault();
    let input = inputField.value;
    let match = input.match(/^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/);
    let error = document.getElementById('error');
    if (match){
        let name = match[1];
        let value = match[2];
        array.push({name, value});
        error.style.display = 'none';
        show();
        form.reset()
    }else {
        error.style.display = 'block';
    }
}

function show (){
    infoBlock.innerHTML = '';
    array.forEach((item, index) =>{
        let div = document.createElement('div');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = index.toString();
        div.innerText = `${item.name} = ${item.value}`;
        div.appendChild(checkbox)
        infoBlock.appendChild(div);

    })
}

let sortByNameButton = document.getElementById('sortByName');
sortByNameButton.onclick = function (){
    array.sort((a, b) =>{
        if(a.name < b.name) return -1;
        if (b.name < a.name) return 1;
        return 0;
    });
    show()
};
let sortByValueButton = document.getElementById('sortByValue');
sortByValueButton.onclick = function (){
    array.sort((a, b) =>{
        if(a.value < b.value) return -1;
        if (b.value < a.value) return 1;
        return 0;
    });
    show()
};

document.getElementById('delete').onclick = function () {
    let checkboxes = infoBlock.querySelectorAll('input[type="checkbox"]');
    array = array.filter((_, index) => !checkboxes[index].checked);
    show();
};