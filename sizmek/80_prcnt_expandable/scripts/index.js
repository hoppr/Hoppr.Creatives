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
    adClickConfig.clickThruLink = 'https://ogawa.com.sg/product/master-drive-plus-2';

    adClickConfig.qrCallbackMessage = "Muchas Gracias";
    adClickConfig.qrAnchor = ["bottom", "right"];
    adClickConfig.qrPadding = [0, 0];
    adClickConfig.qrSize = 80;
    adClickConfig.redirectedURL = "https://www.sizmek.com/";
  }
  window?.Android?.setInteractive(JSON.stringify(adClickConfig));
}
  

function uiChanges() {
  changeVideoPlayState('pause');
  clickThroughAnimation();
}

function clickThroughAnimation() {
  const textList = ['Master Drive Plus', 'True Message. True Intelligence', 'Click to learn more'];
  const container = document.querySelector('.animatedSubtext');
  container.addEventListener('click', onExpandClick);
  let counter = 0;
  const timerId = setInterval(() => {
    if(counter == (textList.length - 1)){
      clearInterval(timerId);
      container.innerHTML = `<span class = "clickthroughBtn">${textList[counter]}</span>`;
      return;
    }
    container.innerHTML = textList[counter];
    counter++;
  }, 1000);

}

function onExpandClick(isExpanded = true) {
  changeBannerOpenState(isExpanded);
}

function changeVideoPlayState(state = 'play') {
  const videoEl = document.querySelector('.videoContainer video');
  if(videoEl?.play){
    state === 'play' ? videoEl?.play() : videoEl?.pause();;
  }
}

function changeBannerOpenState(isExpanded) {
  const expandedBannerEL = document.querySelector('.expandedBanner');
  expandedBannerEL.style.display = isExpanded ? 'flex' : 'none';
  setTimeout(() => {
    expandedBannerEL.style.width = isExpanded ? '80%' : 0; 
    expandedBannerEL.style.height = isExpanded ? '80%' : 0;
  }, 0) 
  changeVideoPlayState(isExpanded ? 'play' : 'pause');
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