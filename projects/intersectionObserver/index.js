const cards = document.querySelectorAll(".card")
console.log(cards);

const observer = new IntersectionObserver(entries =>{
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        // if (entry.isIntersecting) observer.unobserve(entry.target)   //  dont call function on element leaving the viewport
    })
},{
    threshold: 1,   // how much of the element must be seen so that the function gets called range 0-1
    // rootMargin: "-100px",  // shrinks and enlarges the observer container  compared to the viewport
    // root: window,        // sets a parent element as the observer container
});

const lastCardObserver = new IntersectionObserver(entries => {
    const lastCard = entries[0];
    if(!lastCard.isIntersecting) return
    loadNewCards()
    lastCardObserver.unobserve(lastCard.target)
    lastCardObserver.observe(document.querySelector(".card:last-child"))
}, {
    rootMargin:"100px"
});

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach(card => observer.observe(card));

const cardContainer = document.querySelector(".card-container");
function loadNewCards(){
    for(let i = 0; i< 10; i++){
        const card = document .createElement("div");
        card.textContent = "New Card";
        card.classList.add("card");
        observer.observe(card);
        cardContainer.append(card);
    }
}