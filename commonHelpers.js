import{i as l}from"./assets/close-ed18032b.js";import{f as h,i}from"./assets/vendor-77e16229.js";const c=document.querySelector("[data-start]");document.querySelector(".timer");let s=null;const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:function(t){s=t[0],s<=new Date?(i.error({title:"Error",titleColor:"#fff",titleSize:"16px",message:"Please choose a date in the future",position:"topRight",backgroundColor:"red",messageColor:"white",iconUrl:l,theme:"dark"}),c.disabled=!0):c.disabled=!1}};h("#datetime-picker",g);c.addEventListener("click",()=>{if(!s){i.error({title:"Error",message:"Please select a date and time.",titleColor:"#fff",titleSize:"16px",position:"topRight",backgroundColor:"red",messageColor:"white",iconUrl:l,theme:"dark"});return}const t={days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")},o=setInterval(()=>{const r=Date.now(),e=s-r;if(e<=0){clearInterval(o),i.success({title:"Completed",message:"The countdown has finished!",titleColor:"#fff",titleSize:"16px",position:"topRight",backgroundColor:"green",messageColor:"white",theme:"dark"});return}const n=a(e);p(t,n)},1e3)});function a(t){const d=Math.floor(t/864e5),u=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:d,hours:u,minutes:m,seconds:f}}console.log(a(2e3));console.log(a(14e4));console.log(a(2414e4));function p(t,{days:o,hours:r,minutes:e,seconds:n}){t.days.textContent=String(o).padStart(2,"0"),t.hours.textContent=String(r).padStart(2,"0"),t.minutes.textContent=String(e).padStart(2,"0"),t.seconds.textContent=String(n).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map