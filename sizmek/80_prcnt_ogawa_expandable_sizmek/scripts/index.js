
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
    adClickConfig.packageName = "";
    adClickConfig.behavior = "qrCode";
    adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';

    adClickConfig.qrCallbackMessage = "Muchas Gracias";
    adClickConfig.qrAnchor = ["bottom", "right"];
    adClickConfig.qrPadding = [-560, -400];
    adClickConfig.qrSize = 360;
    adClickConfig.redirectedURL = "https://www.sizmek.com/";
  }
  console.log('setBannerInteractive type : ', type);
  window?.Android?.setInteractive(JSON.stringify(adClickConfig));
}
  

function bannerUiChanges() {
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
  changeMainBannerOpenState(isExpanded);
  adkit.expand({
    panelName: "expand",
    useCustomClose: false,
    animate: {
        clip: "rect(0, 100%, 100%, 0)",
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
  bannerEL.style.display = isExpanded ? 'none' : 'block';
}
window.addEventListener('load', (event) => {
  startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}
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
      adClickConfig.packageName = "";
      adClickConfig.behavior = "qrCode";
      adClickConfig.clickThruLink = 'https://google.com?adurl=https://google.com';
  
      adClickConfig.qrCallbackMessage = "Muchas Gracias";
      adClickConfig.qrAnchor = ["bottom", "right"];
      adClickConfig.qrPadding = [-560, -400];
      adClickConfig.qrSize = 360;
      adClickConfig.redirectedURL = "https://www.sizmek.com/";
    }
    console.log('setBannerInteractive type : ', type);
    window?.Android?.setInteractive(JSON.stringify(adClickConfig));
  }
    
  
  function bannerUiChanges() {
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
    changeMainBannerOpenState(isExpanded);
    adkit.expand();
  }
  
  function changeMainBannerOpenState(isExpanded) {
    const bannerEL = document.querySelector('.banner');
    bannerEL.style.display = isExpanded ? 'none' : 'block';
  }
  window.addEventListener('load', (event) => {
    startBannerScript();
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
    setBannerInteractive('qrCode');
  }
  else {
    setBannerInteractive('expand');
  }
  onExpandClick(isExpanded);
}