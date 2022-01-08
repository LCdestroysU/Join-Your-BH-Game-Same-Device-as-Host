// ==UserScript==
// @name         Join Local Game
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       LCDestroysU
// @match        https://*.brick-hill.com/play/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
setTimeout(function(){
const stuff = {
    address: window.BH.apps.SetPage.$children[0].setIp,
    id: window.BH.apps.SetPage.$children[0].setId,
    port: window.BH.apps.SetPage.$children[0].setPort
}
const playButton = document.getElementsByClassName('play-button')[0];
const copyButton = playButton.cloneNode();

copyButton.className = copyButton.className.replace('play-button ', '').replace('green', 'gray');
copyButton.textContent = 'Join Local Game';
copyButton.onclick = () => {
    window.axios.get(window.BH.apiUrl('v1/auth/generateToken?set='.concat(stuff.id)))
        .then(function({data}){
            console.log(`brickhill.legacy://client/${data.token}/10.0.0.79/42480`)
                window.open(`brickhill.legacy://client/${data.token}/10.0.0.79/42480`)
        });
}

playButton.parentNode.append(copyButton);
},500)