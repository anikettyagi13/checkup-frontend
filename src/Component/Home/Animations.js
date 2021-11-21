import anime from 'animejs/lib/anime.es.js'
import { play } from 'playyjs/useable/play.js'
export function animateBlock() {
  play({
    targets: '.animateImage',
    opacity: [0, 1],
    translateY: ['-100px', '0px'],
    animationFunction: 'ease-linear',
    duration: 1000,
    whenVisible: true,
    threshold: 0.1,
    // late: 0,
  })
  play({
    targets: '.animateBlock',
    opacity: [0, 1],
    translateX: ['-200px', '0px'],
    animationFunction: 'ease-linear',
    duration: 1000,
    whenVisible: true,
    threshold: 0.1,
    // late: 0,
  })
  play({
    targets: '.animateBlock3',
    opacity: [0, 1],
    translateX: ['-100px', '0px'],
    animationFunction: 'ease-linear',
    duration: 500,
    whenVisible: true,
    threshold: 0.1,
    // late: 0,
  })
  play({
    targets: '.animateImage3',
    opacity: [0, 1],
    translateY: ['50px', '0px'],
    animationFunction: 'ease-linear',
    duration: 500,
    whenVisible: true,
    threshold: 0.1,
    // late: 0,
  })
}
export function animateBlock2() {
  play({
    targets: '.animateBlock2',
    opacity: [0, 1],
    translateX: ['-200px', '0px'],
    animationFunction: 'ease-linear',
    duration: 700,
    autoplay: false,
    whenVisible: true,
    threshold: 0.2,
    // late: 0,
  })
  play({
    targets: '.animateImage2',
    opacity: [0, 1],
    translateY: ['-100px', '0px'],
    animationFunction: 'ease-linear',
    duration: 700,
    whenVisible: true,
    threshold: 0.2,
    // late: 0,
  })
}
