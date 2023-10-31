/*******************
Ad Format: Single Expandable 
Amazon Template Version: 1.0.1
Last Updated On: 2023-02-20
*******************/

var isExpanded = false;

const KeyAction = {
  DOWN: 0,
  UP: 1,
}

const KeyCode = {
  DPAD_CENTER: 23,
  DPAD_DOWN: 20,
  BACK: 4,
}

const AndroidGravity = {
  TOP: 48,
  BOTTOM: 80,
  LEFT: 3,
  RIGHT: 5,
  CENTER: 17,
  TOP_LEFT: 51,
  TOP_RIGHT: 53,
  BOTTOM_LEFT: 83,
  BOTTOM_RIGHT: 85,
}

function initializeCreative(event) {
  addEventListeners();
	initializeVideoTracking();
}

function addEventListeners() {
  // expand_btn.addEventListener("click", handleExpandButtonClick);
  // close_btn.addEventListener("click", handleCloseButtonClick);
  // user_action_btn.addEventListener("click", handleUserActionButtonClick);
  // clickthrough_btn.addEventListener("click", handleClickthroughButtonClick);

  show_toast_btn.addEventListener("click", () => sendHopprToast("ShowWebViewToast", "This text come from the WebView"));
  show_toast_btn_2.addEventListener("click", () => sendHopprToast("ShowWebViewToast", "Toast One"));
  load_video_btn.addEventListener("click", () => sendHopprTrigger("LoadVideo"));
  play_video_btn.addEventListener("click", () => sendHopprTrigger("PlayVideo"));
  deeplink_netflix_btn.addEventListener("click", () => sendIntent("Intent", "http://www.netflix.com/watch/70202141"));
  user_properties_btn.addEventListener("click", () => requestHopprUserProperties());

  gravity_bottom_left_btn.addEventListener("click", () => setHopprWebviewGravity(AndroidGravity.BOTTOM_LEFT));
  gravity_top_right_btn.addEventListener("click", () => setHopprWebviewGravity(AndroidGravity.TOP_RIGHT));
  gravity_bottom_right_btn.addEventListener("click", () => setHopprWebviewGravity(AndroidGravity.BOTTOM_RIGHT));
  gravity_center_btn.addEventListener("click", () => setHopprWebviewGravity(AndroidGravity.CENTER));

  overlay_hotspot_banner.addEventListener("click", handleoverlayHotspotClick);
  overlay_hotspot_panel.addEventListener("click", handleoverlayHotspotClick);
}

function handleExpandButtonClick() {
  EB.expand();
  banner.style.display = "none";
  panel.style.display = "block";

  setHopprWebviewSize(1280, 720);
  isExpanded = true;
  // document.getElementById("slide1button").focus();
}

function handleCloseButtonClick() {
  banner.style.display = "block";
  panel.style.display = "none";
  EB.collapse();

  setHopprWebviewSize(728, 90);
  isExpanded = false;
  document.getElementById("expand_btn").focus();
}

function handleUserActionButtonClick() {
  EB.userActionCounter("CustomInteraction");
}

function handleoverlayHotspotClick() {
  EB.clickthrough();
  handleCloseButtonClick();
}

function handleClickthroughButtonClick() {
  EB.clickthrough();
  handleCloseButtonClick();
}

adkit.onReady(initializeCreative);

setInteractive("nonFocusableInteractive");

window.addEventListener("message", (event) => {
  const obj = event?.data;

  if (obj?.source === "Hoppr") {
    console.log("Hoppr Message", JSON.stringify(obj));

    switch (obj.type) {
      case "selected":
        document.getElementById("expand_btn").focus();
        changeBorderColor("blue");
        break;
      case "unselected":
        document.getElementById("expand_btn").blur();
        document.getElementById("show_toast_btn_2").blur();
        changeBorderColor("transparent");
        break;
      case "keyEvent":
        handleKeyEvent(obj?.data);
        break;
      case "userData":
        document.getElementById('userProperties').innerText = "User Properties: " + JSON.stringify(obj?.data);
        break;
      default:
        break;
    }
  }
});

function handleKeyEvent(data) {
  const keyEvent = stringToObject(data);
  if (!keyEvent) return;

  console.log(
    "Hoppr KeyEvent",
    keyEvent.mKeyCode,
    keyEvent.mAction,
    isExpanded
  );

  if (keyEvent.mAction === KeyAction.UP) {
    switch (keyEvent.mKeyCode) {
      case KeyCode.DPAD_CENTER:
        if(!isExpanded){
          handleExpandButtonClick()
        }
        break;
      case KeyCode.BACK:
        setSelected(false);
        handleCloseButtonClick();
        break;
      case KeyCode.DPAD_DOWN:
        if (!isExpanded) {
          setSelected(false);
        }
        break;
    }
  }
}

function sendHopprMessage(data) {
  Hoppr?.sendMessage(JSON.stringify(data));
}

function setInteractive(mode) {
  sendHopprMessage({
    type: "setInteractive",
    mode: mode,
  });
}

function setSelected(value) {
  sendHopprMessage({
    type: "setSelected",
    isSelected: value,
  });

  if(value){
    EB.userActionCounter("Selected");
  }else{
    EB.userActionCounter("UnSelected");
  }
}

function setHopprWebviewSize(width, height) {
  sendHopprMessage({
    type: "setSize",
    width: width,
    height: height,
  });
}

function setHopprWebviewGravity(gravity) {
  sendHopprMessage({
    type: "setGravity",
    gravity: gravity,
  });

  EB.userActionCounter("ChangeGravity");
}

function sendHopprToast(trigger, message) {
  sendHopprMessage({
    type: "callback",
    data: {
      trigger: trigger,
      toastContent: message,
    },
  });

  EB.userActionCounter("HopprToast");
}

function sendHopprTrigger(trigger) {
  sendHopprMessage({
    type: "callback",
    data: {
      trigger: trigger,
    },
  });

  EB.userActionCounter("HopprTrigger");
}

function sendIntent(trigger, data) {
  sendHopprMessage({
    type: "callback",
    data: {
      trigger: trigger,
      data: data,
    },
  });

  EB.userActionCounter("LaunchNetflix");
}

function requestHopprUserProperties() {
  sendHopprMessage({
    type: "requestUserProperties"
  });

  EB.userActionCounter("RequestUserProperties");
}

function changeBorderColor(color) {
  var borderElements = document.querySelectorAll("#border");
  borderElements.forEach(function (element) {
    element.style.borderColor = color;
  });
}

function stringToObject(str) {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error("Failed to parse the string into an object:", error);
    return null;
  }
}

function initializeVideoTracking() {
	videoTrackingModule = new EBG.VideoModule(video);
}

// document.addEventListener("keydown", function (event) {
//   console.log("Document keydown", event);
//   if (event.keyCode == 4) {
//   }
// });

// document.addEventListener("keyup", function (event) {
//   console.log("Document keyup", event);
//   if (event.keyCode == 4) {
//   }
// });
