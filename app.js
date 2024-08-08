document.addEventListener("DOMContentLoaded", function(){
    const numberValues = document.querySelectorAll('.number-value');
    const navAnchors = document.querySelectorAll('.navbar a');
    const stickyNavAnchors = document.querySelectorAll('.sticky-nav a');
    const stickyNav = document.querySelector('.sticky-nav');

    let tempNo = [0,0,0,0];
    let interval = [null, null, null, null];

    navAnchors.forEach( function(el,i){
        el.addEventListener('click' , function(e){
            //remove active from previous menu item
            document.querySelectorAll('.navbar a.active').forEach((a) => a.classList.remove('active'));
            document.querySelectorAll('.sticky-nav a.active').forEach((a) => a.classList.remove('active'));
            stickyNavAnchors[i].classList.add('active');
            el.classList.add('active');
        });
    })
    stickyNavAnchors.forEach( function(el,i){
        el.addEventListener('click' , function(e){
            //remove active from previous menu item
            document.querySelectorAll('.navbar a.active').forEach((a) => a.classList.remove('active'));
            document.querySelectorAll('.sticky-nav a.active').forEach((a) => a.classList.remove('active'));
            navAnchors[i].classList.add('active');
            el.classList.add('active');
        });
    })
    //add event listener when user started to scroll the page
    document.addEventListener('scroll' , function(){
        if(document.documentElement.scrollTop < 70){
            stickyNav.setAttribute('hidden' ,'');
            return;
        }
        stickyNav.removeAttribute('hidden');
    });


    //add animation for features section
    const featuresCard = document.querySelectorAll('.feature');
    const observer1 = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.intersectionRatio > 0){
                featuresCard.forEach((c ,i)=>{
                    c.style.animationDelay = `${++i * 0.2}s`;
                    c.classList.add('entry-animation');
                })
            }
        });

    });
    observer1.observe(document.querySelector('#feature-section'));

    //for price section
    const pricesCard = document.querySelectorAll('.price-card');
    const observer2 = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.intersectionRatio > 0){
                pricesCard.forEach((c ,i)=>{
                    c.style.animationDelay = `${++i * 0.2}s`;
                    c.classList.add('entry-animation');
                })
            }
        });

    });
    observer2.observe(document.querySelector('#pricing-section'));

    //for overview section
    const observer3 = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.intersectionRatio > 0){
                numberValues.forEach((n , i)=>{
                    if(interval[i] === null){
                        interval[i] = setInterval(()=>{
                            if(tempNo[i] >= parseInt( n.getAttribute('data-number'))){
                                n.innerHTML = `${parseInt( n.getAttribute('data-number'))}`;
                                clearInterval( interval[i] );
                                return;
                            }

                            if( i === 0){
                                tempNo[i] += 10;
                            }else if( i === 1){
                                tempNo[i] += 2000;
                            }else{
                                tempNo[i] += 1;
                            }
                            n.innerHTML = `${tempNo[i]}`;
                        },1);
                    }

                });
            }
        });

    });
    observer3.observe(document.querySelector('#overview-section'));

    //for testimonial section
    const observer4 = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.intersectionRatio > 0){
                const testimonialCards = document.querySelectorAll('.testimonial');
                testimonialCards.forEach((c,i)=>{
                    c.style.animationDelay = `${++i * 0.25}s`;
                    c.classList.add('entry-animation');
                });
            }
        });

    });
    observer4.observe(document.querySelector('#testimonials-wrapper'));

    //redirect to booking page
    document.querySelectorAll('.btn-book').forEach((el, i)=>{
        el.addEventListener('click' , function() {
            window.location = 'book.html';
        });
    });
});