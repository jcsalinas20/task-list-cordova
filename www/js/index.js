document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function addNewElement(e) {
    e.preventDefault();
    var value = $("form.add-new-element input[type='text']").val();
    $("ul#list").append(
        `<li class="ui-last-child">
            <div class="ui-btn general-box">
                <div class="ui-input-btn box-btn trash">
                    <i class="material-icons">delete_forever</i>
                </div>
                <div class="ui-input-btn box-btn edit">
                    <i class="material-icons">edit</i>
                </div>
                ${value}
            </div>
        </li>`);

    $("ul#list .trash").last().on("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let element = (event.target.tagName == "I") ? $(event.target).parent() : $(event.target);
        element.parent().parent().hide("slide", {
            direction: "left"
        }, 500, function () {
            element.parent().parent().remove();
        });
        M.toast({
            html: 'Elemento eliminado!',
            displayLength: 2000
        })
    });

    $("ul#list .edit").last().on("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let element = (event.target.tagName == "path") ? $(event.target).parent().parent() : (event.target.tagName == "svg") ? $(event.target).parent() : $(event.target);
        element.parent().parent().remove();
    });


    M.toast({
        html: 'Elemento creado!',
        displayLength: 2000
    })
}

$(function () {
    $("form.add-new-element").on("submit", (e) => addNewElement(e));
})