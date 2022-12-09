function checkIfAdKitReady(event) {
  adkit.onReady(setTimeout(startScript, 100));
}

function startScript() {
  uiChanges();
  setTimeout(loadAdConfig, 2000);
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
    expandedBannerEL.style.width = isExpanded ? '100%' : 0; 
    expandedBannerEL.style.height = isExpanded ? '100%' : 0;
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
    
    const placeholderElement = document.querySelector('.qrCodeSpace')
    const height = placeholderElement?.offsetHeight;
    const width = placeholderElement?.offsetWidth;
    const top = parseInt(placeholderElement?.offsetTop/2) + 5;
    const left = parseInt(placeholderElement?.offsetLeft/2) + 3;
    
    const size = Math.min(height, width);
    
    // Config
    adClickConfig.packageName = "";
    adClickConfig.behavior = "qrCode";
    adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';

    adClickConfig.qrCallbackMessage = "Thanks For Scanning the QR code";
    adClickConfig.qrAnchor = ["top", "left"];
    adClickConfig.qrPadding = [left, top];
    adClickConfig.qrSize = size;
    adClickConfig.redirectedURL = "https://www.sizmek.com/";
  }
  console.log('setInteractive ', adClickConfig);
  window?.Android?.setInteractive(JSON.stringify(adClickConfig));
}

function setExpanded(isExpanded) {
  if(!isExpanded) 
  {
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

