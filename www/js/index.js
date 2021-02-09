document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function addNewElement(e) {
    e.preventDefault();
    var value = $("form.add-new-element input[type='text']").val();
    createNewItem(value);

    $("ul#list .trash").last().on("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let element = (event.target.tagName == "I") ? $(event.target).parent() : $(event.target);
        removeElement(element.parent().parent());
        showToast("Elemento eliminado!");
    });

    $("ul#list .edit").last().on("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const newText = prompt("Introduce el nuevo contenido:")
        let element = (event.target.tagName == "I") ? $(event.target).parent() : $(event.target);
        element.parent().contents().last().replaceWith(newText);
        showToast("Elemento actualizado!");
    });

    $("form.add-new-element input[type='text']").val("");
    updateSession($("ul#list>li>div.ui-btn.general-box"))
    showToast("Elemento creado!");
}

function createNewItem(text) {
    $("ul#list").append(
        `<li class="ui-last-child">
            <div class="ui-btn general-box">
                <div class="ui-input-btn box-btn trash">
                    <i class="material-icons icon-trash">delete_forever</i>
                </div>
                <div class="ui-input-btn box-btn edit">
                    <i class="material-icons icon-edit">edit</i>
                </div>
                ${text}
            </div>
        </li>`);
}

function getTasks() {

}

function updateSession(list) {
    let array = (sessionStorage.getItem("items")) ? JSON.parse(sessionStorage.getItem("items")) : [];
    list.each((i) => array.push($(list[i]).contents().last()[0].textContent.replace(/\s+/g, '')))
    sessionStorage.setItem("items", JSON.stringify(array));
}

function removeElement(element) {
    element.hide("slide", {
        direction: "left"
    }, 500, function () {
        element.remove();
    });
}

function showToast(text) {
    M.toast({
        html: text,
        displayLength: 2000
    })
}

$(function () {
    getTasks();
    $("form.add-new-element").on("submit", (e) => addNewElement(e));
})