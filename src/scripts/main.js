//Carrousel
const btnPrevious = document.querySelector('button.carousel__button--previous')
const btnNext = document.querySelector('button.carousel__button--next')
const images = [...document.querySelectorAll('img.carousel__image')]

//Set initial values
let position = 0; //We will be updating this value (it's sort of our state)
const DURATION = 500; //Value set in stone.
let animating = false; //We will be updating this value (controller, sort of our state)

const getPositions = (direction) => {
    const currentPosition = position;
    let newPosition;

    if (direction === 'next') {
        newPosition = position === images.length - 1 ? 0 : position + 1;
    } else if (direction === 'previous') {
        newPosition = position === 0 ? images.length - 1 : position - 1;
    }

    return { currentPosition, newPosition }
};

const getImages = (currentPosition, newPosition) => {
    const currentImage = images[currentPosition]
    const newImage = images[newPosition]
    return { currentImage, newImage };
};

const setAnimatingToTrue = () => (animating = true);

const runAnimations = (currentImage, newImage, direction) => {
    newImage.classList.remove('hidden')
    if (direction === 'next') {
        currentImage.style.animation = `animateToLeft ${DURATION}ms forwards`;
        newImage.style.animation = `animateFromRight ${DURATION}ms forwards`;
    } else {
        currentImage.style.animation = `animateToRight ${DURATION}ms forwards`;
        newImage.style.animation = `animateFromLeft ${DURATION}ms forwards`;
    }
};

const updatePosition = (newPosition) => (position = newPosition);

const resetAnimatingToFalse = () => {
    setTimeout(() => {
        animating = false
    }, DURATION + 1)
}

const transitionImages = (direction) => {
    //Cancel if already animating (no spam)
    if (animating) return;

    //Set up data (positions & images)
    const { currentPosition, newPosition } = getPositions(direction)
    const { currentImage, newImage } = getImages(currentPosition, newPosition);

    //All functionality
    setAnimatingToTrue()
    runAnimations(currentImage, newImage, direction)
    updatePosition(newPosition)
    resetAnimatingToFalse()
};

const handleDirectionButton = (e) => {
    const button = e.target.closest('button');
    const direction = button.dataset.direction;
    transitionImages(direction)
};

const handleKeydown = (e) => {
    const key = e.key
    if(key === 'ArrowRight') btnNext.click()
    if(key === 'ArrowLeft') btnPrevious.click()
};

window.addEventListener('DOMContentLoaded', () => {
    //Add events for direction buttons
    btnPrevious.addEventListener('click', handleDirectionButton)
    btnNext.addEventListener('click', handleDirectionButton)
    window.addEventListener('keydown', handleKeydown)
})

//Get date for footer.
const dateFooter = document.getElementById('dateFooter')

const getDate = () => {
  dateFooter.innerHTML = new Date().getFullYear()
}
console.log(getDate())
getDate();
