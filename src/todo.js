// 1. DOM을 이용해서 HTML 문서에서 form, input, ul을 가져온다.
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDos = document.querySelector(".toDos");

const TODOLIST = "toDoList";
let toDoList = [];

function saveToDo(toDo) {
    const toDoObj = {
        text: toDo,
        id: toDoList.length + 1,
    };

    toDoList.push(toDoObj);
    localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function delToDo(event){
    const {target: button} = event;
    const li = button.parentNode;
    toDos.removeChild(li);

    // 로컬스토어 데이터도 지워주기
    toDoList = toDoList.filter((toDo) => toDo.id !== Number(li.id)); // id값이 다르면 filter를 통해 제외한다.
    localStorage.setItem(TODOLIST, JSON.stringify(toDoList)); // 갱신
  }

// PaintToDo 함수는 input에 입력한 값인 toDo를 인자로 받는다.
function paintToDo(toDo) {
    // 1. li태그, span태그를 만들어서
    const li = document.createElement("li");
    const span = document.createElement("span");

    // 삭제 버튼
    const delButton = document.createElement("button");
    delButton.innerText = "Del";
    delButton.addEventListener("click", delToDo);

    // 2. toDo를 span태그에 넣어주고,
    span.innerHTML = toDo;

    // 3. span을 li에, li를 ul에 넣어준다.
    li.appendChild(span);
    li.appendChild(delButton);
    li.id = toDoList.length + 1;

    toDos.appendChild(li);
}

// createToDo 함수는 event를 인자로 받는다.
function createToDo(event) {
    // 1. form이 submit될 때 페이지가 새로고침되는 기본 동작을 막는다.
    event.preventDefault();

    // 2. input에 입력된 값을 변수 toDo로 선언해서, paintToDo 함수에 넣어준다.
    const toDo = toDoInput.value;
    paintToDo(toDo);
    saveToDo(toDo);
    // 3. paintToDo 함수가 실행되고 나면 input을 비워준다.
    toDoInput.value = "";
}

// 로컬 스토리지에 있는 데이터 불러오기
function loadToDoList() {
    const loadedToDoList = localStorage.getItem(TODOLIST);
    // 값이 있다면 실행
    if (loadedToDoList !== null) {
        const parsedToDoList = JSON.parse(loadedToDoList);
        for (let toDo of parsedToDoList) {
            const {text} = toDo;
            paintToDo(text);
            saveToDo(text);
        }
    }
}


// 2. form에 submit 이벤트를 감지하는 이벤트 리스너를 달아준다.
function init() {
    loadToDoList();
    // 이벤트 리스너는 submit 이벤트가 발생하면 콜백으로 createToDo 함수를 실행한다.
    toDoForm.addEventListener("submit", createToDo);
}

init();

