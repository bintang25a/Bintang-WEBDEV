const carouselArea = document.querySelector('.blog-carousel');
const blogCard = document.getElementsByClassName('blog-card');

let currentIdx = 0;

function showArrow(idx) {
    const arrowL = blogCard[idx].querySelector('.arrowL');
    const arrowR = blogCard[idx].querySelector('.arrowR');
    arrowL.style.display = "block"
    arrowL.style.zIndex = "1";
    arrowR.style.display = "block"
    arrowR.style.zIndex = "1";
}

showArrow(currentIdx);

document.querySelector('.blog').addEventListener('click', function(e) {
    
    if (e.target.parentElement.className == 'arrowL') {
        currentIdx--;
        if (currentIdx < 0) currentIdx = blogCard.length-1;
    }
    else if (e.target.parentElement.className == 'arrowR') {
        currentIdx++;
        if (currentIdx >= blogCard.length) currentIdx = 0;
    }

    for(let i=0; i<blogCard.length; i++) {
        if (i != currentIdx) {
            const arrowL = blogCard[i].querySelector('.arrowL');
            const arrowR = blogCard[i].querySelector('.arrowR');
            arrowL.style.display = "none";
            arrowL.style.zIndex = "0";
            arrowR.style.display = "none";
            arrowR.style.zIndex = "0";
        }
        else {
            showArrow(i);
        }
    }

    const offset = -currentIdx * 100;
    carouselArea.style.transform = `translateX(${offset}%)`;
});