function startScript() {
  uiChanges();
}

function uiChanges() {
  clickThroughAnimation();
}

function clickThroughAnimation() {
  const textList = ['Master Drive Plus'/* , 'True Message. True Intelligence' */, 'Click to learn more'];
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

function openBanner() {
  const expandedBannerEL = document.querySelector('.expandedBanner');
  expandedBannerEL.style.display = 'flex';
  setTimeout(() => {
    expandedBannerEL.style.width = '80vw'; 
    expandedBannerEL.style.height = '80vh';
  }, 0) 
  const videoEl = document.querySelector('.videoContainer video');
  videoEl?.play && videoEl?.play();

}





window.addEventListener('load', (event) => {
  startScript();
});

