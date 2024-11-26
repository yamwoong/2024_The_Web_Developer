const btn = document.querySelector('#v2');

// const btn2 = document.querySelector('#vv2');

btn.onclick = function () {
    console.log("YOU CLICKED ME!")
    console.log("I HOPE IT WORKED!!")
}

// btn2.onclick = funtion(){
//     console.log('asfdasdf')
//     console.log('asfdasdf')
// }

function scream() {
    console.log("AAAAAHHHHH");
    console.log("STOP TOUCHING ME!")
}

// function scream2() {
//     console.log('asfdasdf')
//     console.log('asfdasdf')
// }

btn.onmouseenter = scream;

// btn2.onmouseenter = scream2

document.querySelector('h1').onclick = () => {
    alert('you clicked the h1!')
}

// document.querySelector('h1').onclick = () => {
//     alert('you clicked the h1!')
// }


const btn3 = document.querySelector('#v3');
btn3.addEventListener('click', function () {
    alert("CLICKED!");
})

const btn4 = document.querySelector('#v4');
btn3.addEventListener('click', function () {
    alert('CLICKED!');
})

function twist() {
    console.log("TWIST!")
}
function shout() {
    console.log("SHOUT!")
}

function twist() {
    console.log('sadf');
}

function shout() {
    console.log('sadf');
}

const tasButton = document.querySelector('#tas');

const tasButton2 = document.querySelector('#tas2');
// tasButton.onclick = twist;
// tasButton.onclick = shout;

tasButton.addEventListener('click', twist)
tasButton.addEventListener('click', shout)

tasButton2.addEventListener('click', twist)
tasButton2.addEventListener('click', shout)