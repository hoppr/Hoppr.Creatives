function startScript() {
  uiChanges();
  loadAdConfig();
}
function loadAdConfig() {
  const adClickConfig = {
    behavior: "deepLink"
  };
  adClickConfig.packageName = "com.netflix.ninja";
  adClickConfig.appLaunchOnly = false;
  adClickConfig.clickThroughLink = "INSERT_LINK_HERE";
  window?.Android?.setInteractive(JSON.stringify(adClickConfig))
  console.log("Done Done!")
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

function onExpandClick() {
  openBanner();
}

function changeVideoPlayState(state = 'play') {
  const videoEl = document.querySelector('.videoContainer video');
  if(videoEl?.play){
    state === 'play' ? videoEl?.play() : videoEl?.pause();;
  }
}

function openBanner() {
  const expandedBannerEL = document.querySelector('.expandedBanner');
  expandedBannerEL.style.display = 'flex';
  setTimeout(() => {
    expandedBannerEL.style.width = '80vw'; 
    expandedBannerEL.style.height = '80vh';
  }, 0) 
  changeVideoPlayState();

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