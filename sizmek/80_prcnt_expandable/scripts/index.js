function startScript() {
  uiChanges();
  loadAdConfig();
}
function loadAdConfig() {
  setInteractive('expand');
}

function setInteractive(type) {
  const adClickConfig = {
    behavior: "expand"
  }
  if(type === 'qrCode'){
    adClickConfig.packageName = "";
    adClickConfig.behavior = "qrCode";
    adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';

    adClickConfig.qrCallbackMessage = "Thanks for scanning the QR code";
    adClickConfig.qrAnchor = ["bottom", "right"];
    adClickConfig.qrPadding = [-560, -400];
    adClickConfig.qrSize = 360;
    adClickConfig.redirectedURL = "https://www.sizmek.com/";
  }
  console.log('setInteractive type : ', type);
  window?.Android?.setInteractive(JSON.stringify(adClickConfig));
}
  

function uiChanges() {
  clickThroughAnimation();
}

function clickThroughAnimation() {
  const textList = ['Master Drive Plus', 'True Message. True Intelligence', 'Click to learn more'];
  const textContainer = document.querySelector('.animatedSubtext');
  const mainContainer = document.querySelector('.banner');
  mainContainer.addEventListener('click', onExpandClick);
  let counter = 0;
  const timerId = setInterval(() => {
    if(counter == (textList.length - 1)){
      clearInterval(timerId);
      textContainer.innerHTML = `<span class = "clickthroughBtn">${textList[counter]}</span>`;
      return;
    }
    textContainer.innerHTML = textList[counter];
    counter++;
  }, 1000);

}

function onExpandClick(isExpanded = true) {
  changeMainBannerOpenState(isExpanded);
  changeBannerOpenState(isExpanded);
  adkit.expand();
}

function changeVideoPlayState(state = 'play') {
  const videoEl = document.querySelector('.videoContainer video');
  if(videoEl?.play){
    state === 'play' ? videoEl?.play() : videoEl?.pause();;
  }
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
}

function changeMainBannerOpenState(isExpanded) {
  const bannerEL = document.querySelector('.banner');
  bannerEL.style.display = isExpanded ? 'none' : 'block';
}

window.addEventListener('load', (event) => {
  startScript();
});


//Client APK APIs definition

function setSelected(value) {
                
  var element = document.querySelector('.banner');
  if(value) {
      element.classList.add('selected');
  } else {
      element.classList.remove('selected');
  }
}

function setExpanded(isExpanded) {
  if(isExpanded){
    setInteractive('qrCode');
  }
  else {
    setInteractive('expand');
  }
  onExpandClick(isExpanded);
}