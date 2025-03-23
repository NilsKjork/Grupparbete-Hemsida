import lottie from 'lottie-web';
import path from 'path';

lottie.loadAnimation({
  container: document.getElementById('animationContainer'),
  path: "../jsonAnimations/space.json",
  renderer: 'svg',
  loop: true,
  autoplay: true,
});
