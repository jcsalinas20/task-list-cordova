document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function addNewElement(e) {
    e.preventDefault();
    var value = $("form.add-new-element input[type='text']").val();
    $("#list").append(`<li class="ui-last-child"><a href="#${value}" class="ui-btn ui-btn-icon-right ui-icon-carat-r">${value}</a></li>`)
}

$(function () {
    $("form.add-new-element").on("click", (e) => addNewElement(e));
})