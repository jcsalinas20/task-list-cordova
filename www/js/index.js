document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function addNewElement(e) {
    e.preventDefault();
    var value = $("form.add-new-element input[type='text']").val();

    if (value) {
        createNewItem(value);
        eventClick("ul#list .trash", "trash", "Elemento eliminado!");
        eventClick("ul#list .edit", "edit", "Elemento actualizado!")

        $("form.add-new-element input[type='text']").val("");
        updateSession($("ul#list>li>div.ui-btn.general-box"))
        showToast("Elemento creado!");
    }
}

function eventClick(route, type, toastText) {
    $(route).last().on("click", (event) => {
        var showToastMessage = false;
        event.preventDefault();
        event.stopPropagation();
        let element = (event.target.tagName == "I") ? $(event.target).parent() : $(event.target);
        if (type === "trash") {
            if (confirm("Deseas seguir con la operación?")) {
                removeElement(element.parent().parent());
                showToastMessage = true;
            }
        } else if (type === "edit") {
            const newText = prompt("Introduce el nuevo contenido:")
            if (newText) {
                element.parent().contents().last().replaceWith(newText);
                showToastMessage = true;
            }
        }
        updateSession($("ul#list>li>div.ui-btn.general-box"))
        if (showToastMessage) showToast(toastText);
    });
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
    if (localStorage.getItem("items")) {
        let items = JSON.parse(localStorage.getItem("items"));
        for (const item of items) {
            createNewItem(item)
            eventClick("ul#list .trash", "trash", "Elemento eliminado!");
            eventClick("ul#list .edit", "edit", "Elemento actualizado!")
        }
    }
}

function updateSession(list) {
    var items = [];
    list.each((i) => items.push($(list[i]).contents().last()[0].textContent.replace(/\s+/g, '')));
    localStorage.setItem("items", JSON.stringify(items));
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