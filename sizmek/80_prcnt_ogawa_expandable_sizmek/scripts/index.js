
function startBannerScript() {
  bannerUiChanges();
  loadBannerAdConfig();
}
function loadBannerAdConfig() {
  setBannerInteractive('expand');
}

function setBannerInteractive(type) {
  const adClickConfig = {
    behavior: "expand"
  }
  if(type === 'qrCode'){
    
    const placeholderElement = document.querySelector('.qrCodeSpace')
    const height = placeholderElement?.offsetHeight;
    const width = placeholderElement?.offsetWidth;
    const top = placeholderElement?.offsetTop;
    const left = placeholderElement?.offsetLeft;
    
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
  window?.Android?.setInteractive(JSON.stringify(adClickConfig));
}
  

function bannerUiChanges() {
  clickThroughAnimation();
}

function clickThroughAnimation() {
  const textList = ['Master Drive Plus', 'True Message. True Intelligence', 'Click to learn more'];
  const container = document.querySelector('.animatedSubtext');
  const mainContainer = document.querySelector('.banner');
  mainContainer.addEventListener('click', onExpandClick);
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
  changeMainBannerOpenState(isExpanded);
  if(isExpanded) {
    adkit.expand({
      panelName: "expand",
      useCustomClose: false,
      animate: {
          clip: "rect(0, 20%, 20%, 0)",
          duration: 1000,
          easing: adkit.Animation.Easing.EASE_IN,
          opacity: 1,
          init: {
              clip: "rect(0, 100%, 0, 100%)",
              opacity: 0
          }
      }
  });
  }

  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    if(bannerEL?.style)
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
}

window.addEventListener('load', (event) => {
  startBannerScript();
});




//Client APK APIs definition

window.setSelected = function (value) {
                
  var element = document.querySelector('.banner');
  if(value) {
      element.classList.add('selected');
  } else {
      element.classList.remove('selected');
  }
}

window.setExpanded = function (isExpanded) {
  if(!isExpanded)
  {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
