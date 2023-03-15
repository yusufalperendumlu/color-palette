const popup = document.querySelector(".info-pop-up");

const showPopup = () => {
  popup.style.display = "block";
}

document.querySelector(".close").addEventListener('click', () => {
  document.querySelector(".info-pop-up").style.display = "none";
})

window.addEventListener('load', () => {
  showPopup();
})

if (showPopup)
{
  document.querySelector(".close").addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
  })
}



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
const bgval = document.body.style.backgroundColor;
let r = bgval;
let g = bgval;
let b = bgval;
let a = 1;
let color = '#f0f0f0f0'
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
    r -= 3;
    g -= 2;
    b -= 1;
  } 
  else if (!isLeftToRight && Math.abs(e.movementX) > Math.abs(e.movementY)) 
  {
    r += 3;
    g += 2;
    b += 1;
  }
  if (e.movementY > 0)
  {
    a +=0.01;
  }
  else
  {
    a -=0.01;
  }
  if (e.movementY > 0) {
    color = lightenColor(color, 0.1);
  } else {
    color = darkenColor(color, 0.1);
  }
  container.style.backgroundColor = color;

  r = Math.min(Math.max(r, 0), 255);
  g = Math.min(Math.max(g, 0), 255);
  b = Math.min(Math.max(b, 0), 255);
  a = Math.min(Math.max(a, 0), 1);
  container.style.backgroundColor = `rgb(${r}, ${g}, ${b}, ${a})`;
});

container.addEventListener('mousemove', (e) => {

  const hexValue = document.querySelector(".hexactive");
  hexValue.placeholder = color;

  const rgbValue = document.querySelector(".rgbactive");
  rgbValue.placeholder = `rgb(${r}, ${g}, ${b})`;

  const rgbaValue = document.querySelector(".rgbaactive");
  rgbaValue.placeholder = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;

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
            alert("Seçmiş olduğunuz renk panoya kopyalanamadı. Lütfen tekrar deneyiniz.");
        })
    }
})




const rgbaToHex = (r, g, b, a) => {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = Math.round(a * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
};

const hexToRgba = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
    result[4] ? parseInt(result[4], 16) / 255 : 1,
  ] : null;
};

const lightenColor = (hex, amount) => {
  const [r, g, b, a] = hexToRgba(hex);
  return rgbaToHex(
    r - Math.round(r * amount),
    g - Math.round(g * amount),
    b - Math.round(b * amount),
    a - a * amount
  );
};

const darkenColor = (hex, amount) => {
  const [r, g, b, a] = hexToRgba(hex);
  return rgbaToHex(
    r + Math.round((255 - r) * amount),
    g + Math.round((255 - g) * amount),
    b + Math.round((255 - b) * amount),
    a + (1 - a) * amount
  );
  
};