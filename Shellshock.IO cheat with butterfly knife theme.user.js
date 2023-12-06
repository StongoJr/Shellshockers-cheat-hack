// ==UserScript==
// @name         Shellshock.IO cheat with butterfly knife theme
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Locks aim to the nearest player in shellshock.io. Comes with an ESP too. Press B, V, N, L to toggle aimbot, esp, esp lines, aimbot on right mouse hold.
// @author       Zertalious (Zert) EDITED BY SHOTTA/ ADDED BACKGROUND AND THEME
// @match        *://shellshock.io/*
// @match        *://algebra.best/*
// @match        *://algebra.vip/*
// @match        *://biologyclass.club/*
// @match        *://deadlyegg.com/*
// @match        *://deathegg.world/*
// @match        *://eggcombat.com/*
// @match        *://egg.dance/*
// @match        *://eggfacts.fun/*
// @match        *://egghead.institute/*
// @match        *://eggisthenewblack.com/*
// @match        *://eggsarecool.com/*
// @match        *://geometry.best/*
// @match        *://geometry.monster/*
// @match        *://geometry.pw/*
// @match        *://geometry.report/*
// @match        *://hardboiled.life/*
// @match        *://hardshell.life/*
// @match        *://humanorganising.org/*
// @match        *://mathdrills.info/*
// @match        *://mathfun.rocks/*
// @match        *://mathgames.world/*
// @match        *://math.international/*
// @match        *://mathlete.fun/*
// @match        *://mathlete.pro/*
// @match        *://overeasy.club/*
// @match        *://scrambled.best/*
// @match        *://scrambled.tech/*
// @match        *://scrambled.today/*
// @match        *://scrambled.us/*
// @match        *://scrambled.world/*
// @match        *://shellshockers.club/*
// @match        *://shellshockers.site/*
// @match        *://shellshockers.us/*
// @match        *://shellshockers.world/*
// @match        *://softboiled.club/*
// @match        *://violentegg.club/*
// @match        *://violentegg.fun/*
// @match        *://yolk.best/*
// @match        *://yolk.life/*
// @match        *://yolk.rocks/*
// @match        *://yolk.tech/*
// @match        *://zygote.cafe/*
// @icon         https://www.google.com/s2/favicons?domain=shellshock.io
// @grant        none
// @run-at       document-start
// @antifeature  ads
// ==/UserScript==

(function () {
    const addScript = () => {
        document.head.innerHTML += `<style>
* {
	--ss-transparent: #00000000;
	--ss-black: #000;
	--ss-white: #8cb8ff; /*White Text*/
	--ss-offwhite: #FFF3E4;
	--ss-yellow0:#000000;
	--ss-yellow: #171717;
	--ss-yolk0: #171717;
	--ss-yolk: #000000; /*blue Buttons*/
	--ss-yolk2: #0044b3;
	--ss-red0: #000000;
	--ss-red: #000000;
	--ss-red2: #000000;
	--ss-red-bright: #000000;
	--ss-pink: #000000;
	--ss-pink1: #000000;
	--ss-pink-light: #000000;
	--ss-brown: #000147;
	--ss-blue00: #003b75;
	--ss-blue0: #ffffff;
	--ss-blue1: #0407b8;
	--ss-blue2: #003b75;
	--ss-blue3: #000123; /*Lighter Box Borders*/
	--ss-blue4: #003b75; /*Blue Subtitles, Darker Box Borders*/
	--ss-blue5: #171717;
	--ss-green0: #000000;
	--ss-green1: #000000;
	--ss-green2: #000000;
	--ss-orange1: #595959;
	--ss-vip-gold: linear-gradient(to right, #0004ff, #0003c9, #0002a1, #000170, #000147);
	--ss-clear: rgba(255, 255, 255, 0);
	--ss-blue2clear: rgba(94, 186, 217, 0);
	--ss-shadow: rgba(0,0,0,0.4);
	--ss-blueshadow: #4a4dff;
	--ss-darkoverlay: rgba(0, 0, 0, 0.8);
	--ss-darkoverlay2: rgba(0, 0, 0, 0.2);
	--ss-lightoverlay: url("https://media.tenor.com/GFsRTjp7ShsAAAAd/knife-butterfly-knife.gif"); /*Main Background*/
	--ss-lightbackground: linear-gradient(var(--ss-blue1), var(--ss-blue2));
	--ss-blueblend1: linear-gradient(#349ec1, #5fbad8); /*Some Box fill colors*/
	--ss-scrollmask1: linear-gradient(var(--ss-blue2clear), var(--ss-blue2));
	--ss-scrollmask2: linear-gradient(rgba(56, 158, 192, 0), #389EC0);
	--ss-fieldbg: linear-gradient(#91CADB, #000000, #000000, #000000, #000000);
	--ss-white-60: rgba(255,255,255,.6);
	--ss-white-90: rgba(255,255,255,.9);

	--ss-me-player-bg: rgba(247,149,32,.8);
	--ss-them-blue-bg: rgba(0,66,87,.8);
	--ss-them-blue-color: #003b75;
	--ss-them-red-bg:  rgb(133,0,0,.8);
	--ss-them-red-color: #ff4145
	--ss-me-red-bg: rgba(255,65,69,.8);
	--ss-me-blue-bg: rgb(94,187,217,.8);
}
</style>`
    }
    document.body ? addScript() : document.addEventListener("DOMContentLoaded", e => addScript());
})();

window.XMLHttpRequest = class extends window.XMLHttpRequest {

	open( method, url ) {

		if ( url.indexOf( 'shellshock.js' ) > - 1 ) {

			this.isScript = true;

		}

		return super.open( ...arguments );

	}

	get response() {

		if ( this.isScript ) {

			const code = super.response;

			let babylonVarName,
				playersVarName,
				myPlayerVarName,
				sceneVarName,
				cullFuncName;

			try {

				babylonVarName = /this\.origin=new ([a-zA-Z]+)\.Vector3/.exec( code )[ 1 ];
				playersVarName = /([^,]+)=\[\],[^,]+=\[\],{}/.exec( code )[ 1 ];
				myPlayerVarName = /"fire":document.pointerLockElement&&([^&]+)&&/.exec( code )[ 1 ];
				sceneVarName = /createMapCells\(([^,]+),/.exec( code )[ 1 ];
				cullFuncName = /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec( code )[ 1 ];

			} catch ( error ) {

				alert( 'Script failed to inject. Report the issue to the script developer.\n' + JSON.stringify( getVars(), undefined, 2 ) );

				return code;

			}

			function getVars() {

				return {
					babylonVarName,
					playersVarName,
					myPlayerVarName,
					playersVarName,
					sceneVarName,
					cullFuncName
				};

			}

			console.log( '%cInjecting code...', 'color: green; background: black; font-size: 2em;', getVars() );

			return code.replace( sceneVarName + '.render()', `

					window[ '${onUpdateFuncName}' ](
						${babylonVarName},
						${playersVarName},
						${myPlayerVarName}
					);

				${sceneVarName}.render()` )
				.replace( `function ${cullFuncName}`, `

					function ${cullFuncName}() {

						return true;

					}

				function someFunctionWhichWillNeverBeUsedNow` );

		}

		return super.response;

	}

};

let espEnabled = true;
let aimbotEnabled = true;
let showLines = true;
let aimbotOnRightMouse = false;

const value = parseInt( new URLSearchParams( window.location.search ).get( 'showAd' ), 16 );
const shouldShowAd = false;
const temp = document.createElement( 'div' );

temp.innerHTML = `<style>

.info {
	position: absolute;
	left: 50%;
	top: 50%;
	padding: 20px;
	background: rgba((50, 205, 50));
	border: 6px solid rgba(50, 205, 50);
	color: #00FF00;
	transform: translate(-50%, -50%);
	text-align: center;
	z-index: 999999;
	font-weight: bolder;
}

.info * {
	color: #00FF00;
}

.close-icon {
	position: absolute;
	right: 5px;
	top: 5px;
	width: 20px;
	height: 20px;
	opacity: 0.5;
	cursor: pointer;
}

.close-icon:before, .close-icon:after {
	content: ' ';
	position: absolute;
	left: 50%;
	top: 50%;
	width: 100%;
	height: 20%;
	transform: translate(-50%, -50%) rotate(-45deg);
	background: #00FF00;
}

.close-icon:after {
	transform: translate(-50%, -50%) rotate(45deg);
}

.close-icon:hover {
	opacity: 1;
}

.btn {
	cursor: pointer;
	padding: 0.5em;
	background: green;
	border: 3px solid rgba(50, 205, 50);
}

.btn:active {
	transform: scale(0.8);
}

.msg {
	position: absolute;
	left: 10px;
	bottom: 10px;
	color: #00FF00;
	background: rgba(50, 205, 50);
	font-weight: bolder;
	padding: 15px;
	animation: msg 0.5s forwards, msg 0.5s reverse forwards 3s;
	z-index: 999999;
	pointer-events: none;
}

@keyframes msg {
	from {
		transform: translate(-120%, 0);
	}

	to {
		transform: none;
	}
}

</style>
<div class="msg" style="display: none;"></div>
<div class="info">${shouldShowAd ? `<big>Loading ad...</big>` : `<div class="close-icon" onclick="this.parentNode.style.display='none';"></div>
	<big>== Aimbot & ESP ==</big>
	<br>
	<br>
	[q] to toggle aimbot
	<br>
	[V] to toggle ESP
	<br>
	[N] to toggle ESP Lines
	<br>
	[L] to toggle aimbot on <br>right mouse hold
	<br>
	[H] to show/hide help
	<br>
	<br>
	By Shotta
	<br>
	<br>
	<div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px;">
		<div class="btn" onclick="window.open('https://discord.gg/K24Zxy88VM', '_blank')">Discord</div>
		<div class="btn" onclick="window.open('https://www.instagram.com/zertalious/', '_blank')">Instagram</div>
		<div class="btn" onclick="window.open('https://twitter.com/Zertalious', '_blank')">Twitter</div>
		<div class="btn" onclick="window.open('https://greasyfork.org/en/users/662330-zertalious', '_blank')">More scripts</div>
	</div>
	` }
</div>`;

const msgEl = temp.querySelector( '.msg' );
const infoEl = temp.querySelector( '.info' );

window.addEventListener( 'DOMContentLoaded', async function () {

	while ( temp.children.length > 0 ) {

		document.body.appendChild( temp.children[ 0 ] );

	}

	if ( shouldShowAd ) {

		const url = new URL( window.location.href );

		url.searchParams.set( 'showAd', Date.now().toString( 16 ) );
		url.searchParams.set( 'scriptVersion', GM.info.script.version );

		window.location.href = 'https://zertalious.xyz?ref=' + new TextEncoder().encode( url.href ).toString();

	}

} );

let rightMouseDown = false;

function handleMouse( event ) {

	if ( event.button === 2 ) {

		rightMouseDown = event.type === 'pointerdown' ? true : false;

	}

}

window.addEventListener( 'pointerdown', handleMouse );
window.addEventListener( 'pointerup', handleMouse );

window.addEventListener( 'keyup', function ( event ) {

	if ( document.activeElement && document.activeElement.tagName === 'INPUT' ) {

		return;

	}

	switch ( event.code ) {

		case 'KeyQ' :

			aimbotEnabled = ! aimbotEnabled;

			showMsg( 'Aimbot', aimbotEnabled );

			break;

		case 'KeyE' :

			espEnabled = ! espEnabled;

			showMsg( 'ESP', espEnabled );

			break;

		case 'KeyN' :

			showLines = ! showLines;

			showMsg( 'ESP Lines', showLines );

			break;

		case 'KeyH' :

			infoEl.style.display = infoEl.style.display === '' ? 'none' : '';

			break;

		case 'KeyL' :

			aimbotOnRightMouse = ! aimbotOnRightMouse;

			showMsg( 'Aimbot On Right Mouse Hold', aimbotOnRightMouse );

			break;

	}

} );

function showMsg( name, bool ) {

	msgEl.innerText = name + ': ' + ( bool ? 'ON' : 'OFF' );

	msgEl.style.display = 'none';

	void msgEl.offsetWidth;

	msgEl.style.display = '';

}

let lineOrigin, lines;

const onUpdateFuncName = btoa( Math.random().toString( 32 ) );

window[ onUpdateFuncName ] = function ( BABYLON, players, myPlayer ) {

	if ( shouldShowAd !== false ) {

		return;

	}

	if ( ! myPlayer ) {

		return;

	}

	if ( ! lineOrigin ) {

		lineOrigin = new BABYLON.Vector3();
		linesArray = [];

	}

	lineOrigin.copyFrom( myPlayer.actor.mesh.position );

	const yaw = myPlayer.actor.mesh.rotation.y;

	lineOrigin.x += Math.sin( yaw );
	lineOrigin.z += Math.cos( yaw );
	lineOrigin.y += Math.sin( - myPlayer.pitch );

	for ( let i = 0; i < linesArray.length; i ++ ) {

		linesArray[ i ].playerExists = false;

	}

	for ( let i = 0; i < players.length; i ++ ) {

		const player = players[ i ];

		if ( ! player || player === myPlayer ) {

			continue;

		}

		if ( player.sphere === undefined ) {

			console.log( 'Adding sphere...' );

			const material = new BABYLON.StandardMaterial( 'myMaterial', player.actor.scene );
			material.emissiveColor = material.diffuseColor = new BABYLON.Color3( 0, 255, 0 );
			material.wireframe = true;

			const sphere = BABYLON.MeshBuilder.CreateBox( 'mySphere', { width: 0.5, height: 0.75, depth: 0.5 }, player.actor.scene );
			sphere.material = material;
			sphere.position.y = 0.3;

			sphere.parent = player.actor.mesh;

			player.sphere = sphere;

		}

		if ( player.lines === undefined ) {

			const options = {
				points: [ lineOrigin, player.actor.mesh.position ],
				updatable: true
			};

			const lines = options.instance = BABYLON.MeshBuilder.CreateLines( 'lines', options, player.actor.scene );
			lines.color = new BABYLON.Color3( 51, 255, 51 );
			lines.alwaysSelectAsActiveMesh = true;
			lines.renderingGroupId = 1;

			player.lines = lines;
			player.lineOptions = options;

			linesArray.push( lines );

			console.log( '%cAdding line...', 'color: green; background: black; font-size: 2em;' );

		}

		player.lines.playerExists = true;
		player.lines = BABYLON.MeshBuilder.CreateLines( 'lines', player.lineOptions );

		player.sphere.renderingGroupId = espEnabled ? 1 : 0;
		player.sphere.visibility = ( aimbotEnabled || espEnabled ) && myPlayer !== player && ( myPlayer.team === 0 || myPlayer.team !== player.team );

		player.lines.visibility = player.playing && player.sphere.visibility && showLines;

	}

	for ( let i = 0; i < linesArray.length; i ++ ) {

		if ( ! linesArray[ i ].playerExists ) {

			console.log( '%cRemoving line...', 'color: ; background: black; font-size: 2em;' );

			linesArray[ i ].dispose();
			linesArray.splice( i, 1 );

		}

	}

	if ( aimbotEnabled && ( aimbotOnRightMouse ? rightMouseDown : true ) && myPlayer.playing ) {

		let minDistance = Infinity;
		let targetPlayer;

		for ( let i = 0; i < players.length; i ++ ) {

			const player = players[ i ];

			if ( player && player !== myPlayer && player.playing && ( myPlayer.team === 0 || player.team !== myPlayer.team ) ) {

				const distance = Math.hypot( player.x - myPlayer.x, player.y - myPlayer.y, player.z - myPlayer.z );

				if ( distance < minDistance ) {

					minDistance = distance;

					targetPlayer = player;

				}

			}

		}

		if ( targetPlayer ) {

			const x = targetPlayer.actor.mesh.position.x - myPlayer.actor.mesh.position.x;
			const y = targetPlayer.actor.mesh.position.y - myPlayer.actor.mesh.position.y;
			const z = targetPlayer.actor.mesh.position.z - myPlayer.actor.mesh.position.z;

			myPlayer.yaw = Math.radAdd( Math.atan2( x, z ), 0 );
			myPlayer.pitch = - Math.atan2( y, Math.hypot( x, z ) ) % 1.5;

		}

	}

}

delete localStorage[ 'lastVersionPlayed' ];

