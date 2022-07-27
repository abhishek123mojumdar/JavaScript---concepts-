// Import stylesheets
import './style.css';

var throttleEvent = document.getElementById('throttleEvent');
var debounceEvent = document.getElementById('debounceEvent');
function showInHTML(string) {
  showInputString.innerHTML = string;
}
function showInHTMLDebounce(counter, string) {
  showInputStringDebounce.innerHTML = counter + string;
}
let throttleEventCall = throttleCall(4000, showInHTML);
let debounceEventCall = debounceCall(showInHTMLDebounce);
throttleEvent.addEventListener('input', throttleEventCall);
debounceEvent.addEventListener('input', debounceEventCall);
let showInputString = document.getElementById('showInput');
let showInputStringDebounce = document.getElementById('showInputDebounce');

function throttleCall(limit, cb) {
  let throttleFlag = true; // the throttle flag is true i.e initial call will go
  return function (e) {
    if (throttleFlag) {
      // call to the call back function is made when the throttle flag is true
      cb(e.target.value);
    }
    throttleFlag = false; // throttle flag is made false
    setTimeout(() => {
      throttleFlag = true;
    }, limit);
  };
} // in a setTimeout the throttleFlag is again made true; which means that only after a certain time the throttleFlag is again made true ; till that time is passed which is (4000 ms in this case ) the call back function can not be called as the flag is false for these 4000 ms

function debounceCall(cb) {
  let counter = 0;
  let timer; // This is the timer which will help us to clear the setTimeOut Time
  return function (e) {
    clearTimeout(timer); // We clear out the timer which has been set ; let 's say we have typed something and timer of 4000 ms is set ; within that 4000 ms another event is triggered ; For this event to execute as it has the updated data we cancel the last event which is done by clearTimeOut
    setTimeout(() => {
      counter++;
      cb(counter, e.target.value);
    }, 4000);
  };
}

//------------------------------------------- Events -------------------------------------------//

let grandParent = document.querySelector('.grandParent');
let parent = document.querySelector('.parent');
let child = document.querySelector('.child');
let gpt = document.querySelector('.gpt');
let pt = document.querySelector('.pt');
let cd = document.querySelector('.cd');
let reset = document.getElementById('reset');
let loading = document.getElementById('loading');

loading.style.display = 'none';

grandParent.addEventListener('click', (e) => {
  console.log(e);
  console.log('GrandParent');
  gpt.innerHTML = 'GrandParent &#8593;';
  checkEvent(e);
});

parent.addEventListener('click', (e) => {
  console.log(e);
  console.log('parent');
  pt.innerHTML = 'Parent &#8593;';
  checkEvent(e);
});

child.addEventListener('click', (e) => {
  console.log(e);
  console.log('Child');
  cd.innerHTML = 'Child &#8593;';
  checkEvent(e);
});

reset.addEventListener('click', () => {
  resetEvent();
});

function resetEvent() {
  gpt.classList.remove('active');
  pt.classList.remove('active');
  cd.classList.remove('active');
}

function checkEvent(e) {
  resetEvent();
  loading.style.display = 'inline';
  setTimeout(() => {
    loading.style.display = 'none';
    if (e.target.className === 'child') {
      cd.classList.add('active');
      pt.classList.add('active');
      gpt.classList.add('active');
    } else if (e.target.className === 'parent') {
      pt.classList.add('active');
      gpt.classList.add('active');
    } else if (e.target.className === 'grandParent') {
      gpt.classList.add('active');
    }
  }, 1000);
}
