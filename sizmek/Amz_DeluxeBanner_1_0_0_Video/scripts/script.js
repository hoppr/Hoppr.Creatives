/*******************
VARIABLES
*******************/
var creativeId = "DeluxeBanner";
var creativeVersion = "2.0.0";
var lastModified = "2017-11-01";
var lastUploaded = "2017-11-01";
var templateVersion = "2.0.24";
var templateName = "cf_deluxe_banner_video_1x1_" + creativeVersion + "_6267"; // cf_[format_name]_[template_name]_[wxh]_version_BlockID
var dimensions;
var scrollPos = {
	x: 0,
	y: 0
};
var video;
var primaryContent;
var bannerDiv;
var adId, rnd, uid;

/*******************
INITIALIZATION
*******************/
function checkIfAdKitReady(event) {
	if (window.adkit) {
		adkit.onReady(initializeCreative);
	}
	else {
		initializeCreative();
	}
}

function initializeCreative(event) {

	try { //try/catch just in case localPreview.js is not included
		if (window.localPreview) {
			window.initializeLocalPreview(); //in localPreview.js
		}
	}
	catch (e) {}

	// so messaging can work in safe frames we need to bind the events that are present in the event manager.
	EBG.pm.bind("sendCreativeId", function() {
		eventManager.apply(this, arguments);
	}, this);
	EBG.pm.bind("eventCallback", function() {
		eventManager.apply(this, arguments);
	}, this);

	//Workaround (from QB6573) for Async EB Load where Modernizr isn't properly initialized
	typeof Modernizr == "object" && (Modernizr.touch = Modernizr.touch || "ontouchstart" in window);

	initializeGlobalVariables();

	window.registerInteraction = function() {}; //overwrite rI function because it will never actually be called
	initializeVideo();
    addEventListeners();
	displayDimensions();

	setCreativeVersion();
}

function initializeGlobalVariables() {
	adId = EB._adConfig.adId;
	rnd = EB._adConfig.rnd;
	uid = EB._adConfig.uid;
	dimensions = document.getElementById("dimensions");
	video = document.getElementById("video");
	primaryContent = document.getElementById("primary-content");
	bannerDiv = document.getElementById("banner");
}

function initializeVideo() {
	var videoTracker = new EBG.VideoModule(video);

	video.classList.remove("hide");

	var primaryContent = document.getElementById("primary-content");
	primaryContent.classList.remove("hide");
}

function addEventListeners() {
	document.getElementById("user-action-button").addEventListener("click", handleUserActionButtonClick);
	document.getElementById("clickthrough-button").addEventListener("click", handleClickthroughButtonClick);

	window.addEventListener("resize", checkIfVideoIsVisible);
	window.addEventListener("resize", displayDimensions);
}

/*******************
EVENT HANDLERS
*******************/
function handleUserActionButtonClick(event) {
	EB.userActionCounter("UserAction");
}

function handleClickthroughButtonClick(event) {
	video.pause();
	EB.clickthrough();
}

function checkIfVideoIsVisible(event) {
	if (primaryContent) {
		var isContentVisible = window.getComputedStyle(primaryContent).display !== "none";

		if (!isContentVisible) {
			video.pause();
		}
	}
}

function onPageScroll(event) {
	// use scrollPos anywhere to know the current x/y coordinates.
	scrollPos.x = event.scrollXPercent;
	scrollPos.y = event.scrollYPercent;
	displayDimensions();
}

/*******************
UTILITIES
*******************/

function displayDimensions() {
	if (dimensions) {
		var iw = window.innerWidth,
			ih = window.innerHeight,
			sx = scrollPos.x,
			sy = scrollPos.y;
		var str = iw + "x" + ih + " | Scroll (X: " + sx + "%; Y: " + sy + "%)";
		dimensions.innerHTML = str;
	}
}

function setCreativeVersion() {
	sendMessage("setCreativeVersion", {
		creativeId: creativeId + " - " + templateName,
		creativeVersion: creativeVersion,
		creativeLastModified: lastModified,
		uid: uid
	});
}

/*********************************
HTML5 Event System - Do Not Modify
*********************************/
var listenerQueue;
var creativeIFrameId;

function sendMessage(type, data) {

	//note: the message type we're sending is also the name of the function inside
	//		the custom script's messageHandlers object, so the case must match.

	if (!data.type) data.type = type;
	EB._sendMessage(type, data);
}

function addCustomScriptEventListener(eventName, callback, interAd) {
	listenerQueue = listenerQueue || {};
	var data = {
		uid: uid,
		listenerId: Math.ceil(Math.random() * 1000000000),
		eventName: eventName,
		interAd: !!(interAd),
		creativeIFrameId: creativeIFrameId
	};
	sendMessage("addCustomScriptEventListener", data);
	data.callback = callback;
	listenerQueue[data.listenerId] = data;
	return data.listenerId;
}

function dispatchCustomScriptEvent(eventName, params) {
	params = params || {};
	params.uid = uid;
	params.eventName = eventName;
	params.creativeIFrameId = creativeIFrameId;
	sendMessage("dispatchCustomScriptEvent", params);
}

function removeCustomScriptEventListener(listenerId) {
	var params = {
		uid: uid,
		listenerId: listenerId,
		creativeIFrameId: creativeIFrameId
	};

	sendMessage("removeCustomScriptEventListener", params);
	if (listenerQueue[listenerId])
		delete listenerQueue[listenerId];
}

function eventManager(event) {

	var msg;
	if (typeof event == "object" && event.data) {
		msg = JSON.parse(event.data);

	}
	else {
		// this is safe frame.
		msg = {
			type: event.type,
			data: event
		};
	}
	if (msg.type && msg.data && (!uid || (msg.data.uid && msg.data.uid == uid))) {
		switch (msg.type) {
			case "sendCreativeId":
				creativeIFrameId = msg.data.creativeIFrameId;
				addCustomScriptEventListener('pageScroll', onPageScroll);
				sendMessage("dispatchScrollPos", {
					uid: uid
				});
				if (creativeContainerReady)
					creativeContainerReady();
				break;
			case "eventCallback": // Handle Callback
				var list = msg.data.listenerIds;
				var length = list.length;
				for (var i = 0; i < length; i++) {
					try {
						var t = listenerQueue[list[i]];
						if (!t) continue;
						t.callback(msg.data);
					}
					catch (e) {}
				}
				break;
		}
	}
}

window.addEventListener("message", function() {
	try {
		eventManager.apply(this, arguments);
	}
	catch (e) {}
}, false);

/*************************************
End HTML5 Event System - Do Not Modify
*************************************/

window.addEventListener("load", checkIfAdKitReady);