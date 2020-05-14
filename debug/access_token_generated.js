'use strict';

mapboxgl.accessToken = getAccessToken();

function getAccessToken() {
    var accessToken = (
        undefined ||
        "pk.eyJ1IjoidGhpYmF1ZC1taWNoZWwiLCJhIjoiY2sxODFicG83MGUzMjNlbXpydDRzdHBtdiJ9.vIUDkExus2d7R7bhK2AqPg" ||
        getURLParameter('access_token') ||
        localStorage.getItem('accessToken')
    );
    try {
        localStorage.setItem('accessToken', accessToken);
    } catch (_) {}
    return accessToken;
}

function getURLParameter(name) {
    var regexp = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
    var output = regexp.exec(window.location.href);
    return output && output[1];
}
