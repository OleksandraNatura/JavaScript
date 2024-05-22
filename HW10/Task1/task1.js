const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg'
];

let currentIndex = 0;

const sliderImage = document.getElementById('sliderImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function showImage(index) {
  sliderImage.src = images[index];
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  showImage(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  showImage(currentIndex);
});

showImage(currentIndex);