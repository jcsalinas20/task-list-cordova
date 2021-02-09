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
                    <i class="material-icons trash">delete_forever</i>
                </div>
                <div class="ui-input-btn box-btn edit">
                    <i class="material-icons edit">edit</i>
                </div>
                ${value}
            </div>
        </li>`);

    $("ul#list trash").last().on("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let element = (event.target.tagName == "path") ? $(event.target).parent().parent() : (event.target.tagName == "svg") ? $(event.target).parent() : $(event.target);
        element.parent().parent().remove();
    });

    $("ul#list edit").last().on("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let element = (event.target.tagName == "path") ? $(event.target).parent().parent() : (event.target.tagName == "svg") ? $(event.target).parent() : $(event.target);
        element.parent().parent().remove();
    });
}

$(function () {
    $("form.add-new-element").on("submit", (e) => addNewElement(e));
})