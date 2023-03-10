const alertControl = () => {

    toastr.options.positionClass = 'toast-top-right';
    toastr.options.showDuration = 500;
    toastr.options.hideDuration = 500;
    toastr.options.timeOut = 2000;
    toastr.options.extendedTimeOut = 1000;
    toastr.options.showEasing = 'swing';
    toastr.options.hideEasing = 'linear';
    toastr.options.showMethod = 'fadeIn';
    toastr.options.hideMethod = 'fadeOut';

    let bgc = document.body.style.backgroundColor;
    toastr.success(`${bgc} rengi panoya kopalandı.`);
}


const container = document.querySelector('body');
let r = document.body.style.backgroundColor;
let g = document.body.style.backgroundColor;
let b = document.body.style.backgroundColor;
let isLeftToRight = true;

container.addEventListener('mousemove', (e) => {
  if (e.clientX < container.offsetWidth / 2) 
  {
    isLeftToRight = false;
  } 
  else 
  {
    isLeftToRight = true;
  }
  if (isLeftToRight && Math.abs(e.movementX) > Math.abs(e.movementY)) 
  {
    r -= 4;
    g -= 3;
    b -= 2;
    
  } 
  else if (!isLeftToRight && Math.abs(e.movementX) > Math.abs(e.movementY)) 
  {
    r += 4;
    g += 3;
    b += 2;
  }
  r = Math.min(Math.max(r, 0), 255);
  g = Math.min(Math.max(g, 0), 255);
  b = Math.min(Math.max(b, 0), 255);
  container.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});



document.addEventListener('mousedown', (e) => {
    e.preventDefault();
    
    if(e.button === 0)
    {
        let backColor = document.body.style.backgroundColor;

        navigator.clipboard.writeText(backColor).then( () => {
            let audio = new Audio("src/audio/clicksound.wav");
            audio.play();

            window.addEventListener('click', alertControl);

        }, () => {
            alert("Seçmiş olduğunuz renk panoya kopyalanamdı. Lütfen tekrar deneyiniz.");
        })
    }
})

document.addEventListener('mousemove', (e) => {
    let bgc = document.body.style.backgroundColor;
    //console.log(bgc);
    const rgbValue = document.querySelector(".rgbactive");
    rgbValue.placeholder = bgc;
    document.body.appendChild(colorInfo);
})
