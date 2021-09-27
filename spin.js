let  list = document.querySelectorAll('.list');
for ( let i=0; i<list.length; i++){
    list[i].onclick = function (){
        let j = 0;
        while (j < list.length){
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
}

let menuToggle = document.querySelectorAll('.toggle');
let navi =document.querySelectorAll('.navi')
menuToggle.onclick = function (){
    menuToggle.classList.toggle('active')
}
