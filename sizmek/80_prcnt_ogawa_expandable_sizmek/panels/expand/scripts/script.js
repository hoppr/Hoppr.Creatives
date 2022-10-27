function checkIfAdKitReady(event) {
  adkit.onReady(startScript);
}

function startScript() {
  uiChanges();
  loadAdConfig();
  initializeCreative();
}

function uiChanges() {
  changeVideoPlayState('pause');
  changeBannerOpenState(true);
}

function loadAdConfig() {
  setInteractive('qrCode');
}

function changeVideoPlayState(state = 'play') {
  const videoEl = document.querySelector('.videoContainer video');
  if(videoEl?.play){
    state === 'play' ? videoEl?.play() : videoEl?.pause();;
  }
}

function initializeCreative(event) {
  addEventListeners();
}

function addEventListeners() {
  // collapse_btn.addEventListener("click", handleCollapseButton);
  // user_action_btn.addEventListener("click", handleUserActionButton);
  // clickthrough_btn.addEventListener("click", handleClickthroughButton);
  // overlay_hotspot.addEventListener("click", handleClickOverlay);
}


function handleCollapseButton() {
  EB.collapse();
}

function handleUserActionButton() {
  EB.userActionCounter("CustomInteraction");
}

function handleClickthroughButton() {
  EB.clickthrough();
  handleCollapseButton();
}

function changeBannerOpenState(isExpanded) {
  const expandedBannerEL = document.querySelector('.expandedBanner');
  expandedBannerEL.style.animation = isExpanded ? 'expandAnimation 1s' : 'closeAnimation 1s';
  setTimeout(() => {
    expandedBannerEL.style.width = isExpanded ? '80%' : 0; 
    expandedBannerEL.style.height = isExpanded ? '80%' : 0;
    expandedBannerEL.style.display = isExpanded && 'flex';
  }, 0) 
  changeVideoPlayState(isExpanded ? 'play' : 'pause');
  setExpanded(isExpanded);
}

function setInteractive(type) {
  const adClickConfig = {
    behavior: "expand"
  }
  if(type === 'qrCode'){
    adClickConfig.packageName = "";
    adClickConfig.behavior = "qrCode";
    adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';

    adClickConfig.qrCallbackMessage = "Muchas Gracias";
    adClickConfig.qrAnchor = ["bottom", "right"];
    adClickConfig.qrPadding = [-560, -400];
    adClickConfig.qrSize = 360;
    adClickConfig.redirectedURL = "https://www.sizmek.com/";
  }
  console.log('setInteractive type : ', type);
  window?.Android?.setInteractive(JSON.stringify(adClickConfig));
}

function setExpanded(isExpanded) {
  if(isExpanded){
    setInteractive('qrCode');
  }
  else {
    setInteractive('expand');
  }
  onCollapseClick(isExpanded);
}

function onCollapseClick(isExpanded) {
  if(!isExpanded)
  {
    adkit.collapse({
      panelName: "expand",
      animate: {
          clip: "rect(0, 100%, 0, 100%)",
          duration: 1000,
          easing: adkit.Animation.Easing.EASE_IN,
          opacity: 0,
          init: {
              clip: "rect(0, 100%, 100%, 0)",
              opacity: 1
          }
      }
    });
  }
}

window.addEventListener("load", checkIfAdKitReady);

