const userClick = document.querySelectorAll(".user-bottom-link");
userClick.forEach((element, index)=>{
     element.addEventListener('click', ()=>{
          document.querySelector(".active").classList.remove('active');
          element.classList.add('active')
     })
})

function start() {
     getData(render)
}

function getData(callback) {
     const API = "http://localhost:3000/tracking";
     fetch(API)
     .then(response => response.json())
     .then(callback);
}

function render(tracking) {
     const wrapTracking = document.querySelector(".wrap-tracking");
     userClick.forEach((item) => {
          item.addEventListener('click', (e)=>{
               const clickIndex = e.target.dataset.click;
               let timeFramesCurrent = "";
               let timeFremesPre = "";
               var htmls = tracking.map((element)=> {
                    const { background, title, timeframes, weekly, daily, monthly } = element;
                    if(clickIndex === "weekly") {
                         timeFramesCurrent = timeframes.weekly.current;
                         timeFremesPre = timeframes.weekly.previous;
                    }
                         
                    else if (clickIndex === "daily") {
                         timeFramesCurrent = timeframes.daily.current;
                         timeFremesPre = timeframes.daily.previous;
                    }
                    else if (clickIndex === "monthly") {
                         timeFramesCurrent = timeframes.monthly.current;
                         timeFremesPre = timeframes.monthly.previous;
                    }
                    return (
                         `
                         <div class="time-tracking">
                              <div class="time-tracking-label tracking-${background}"></div>
                              <div class="time-tracking-content">
                                   <div class="time-tracking-top">
                                        <h4>${title}</h4>
                                        <img src="./images/icon-ellipsis.svg" alt="">
                                   </div>
                                   <div class="time-tracking-bottom">
                                        <h1 class="time-tracking-hours">${timeFramesCurrent}hrs</h1>
                                        <p class="time-tracking-lastweek">Last Week - ${timeFremesPre}hrs</p>
                                   </div>
                              </div>
                         </div>
                         `
                    );
               });
               wrapTracking.innerHTML = htmls.join('');
          })
     })
     // var htmls = tracking.map((element)=> {
     //      return (
     //           `
     //           <div class="time-tracking">
     //                <div class="time-tracking-label tracking-${element.background}"></div>
     //                <div class="time-tracking-content">
     //                <div class="time-tracking-top">
     //                     <h4>${element.title}</h4>
     //                     <img src="./images/icon-ellipsis.svg" alt="">
     //                </div>
     //                <h1 class="time-tracking-hours">${element.timeframes.weekly.current}hrs</h1>
     //                <p class="time-tracking-lastweek">Last Week - ${element.timeframes.weekly.previous}hrs</p>
     //                </div>
     //           </div>
     //           `
     //      )
     // });
     // wrapTracking.innerHTML = htmls;
}
start();