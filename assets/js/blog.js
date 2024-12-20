const blogArea = document.querySelector('.blog');
const blogCard = document.getElementsByClassName('blogCard');

let i=0;

blogArea.addEventListener('click', function(e) {
    blogCard[i].style.opacity = 0.1;
    setTimeout(() => {
        blogCard[i].style.opacity = 1;
    }, 200);

    if (e.target.parentElement.className == 'arrowL') {
        i = i-1;
        if (i<0) i=2;
    }
    else if (e.target.parentElement.className == 'arrowR') {
        i = i+1;
        if (i >blogCard.length-1) i=0;
    }

    setTimeout(() => {
        blogCard[i].classList.remove('blogCardOff');
        for (let j=0; j<3; j++) {
            if (j != i) {
                blogCard[j].classList.add('blogCardOff');
            }
        }
    }, 400);
});