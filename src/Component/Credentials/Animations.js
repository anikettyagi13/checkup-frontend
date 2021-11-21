import { play } from 'playyjs/useable/play'
export function animateImage() {
  play({
    targets: '.animateImage',
    opacity: [0, 1],
    translateY: ['-100px', '0px'],
    animationFunction: 'ease-linear',
    duration: 500,
    whenVisible: true,
    // late: 0,
  })
}
export function animateBlock() {
  play({
    targets: '.animateBlock',
    opacity: [0, 1],
    translateY: ['200px', '0px'],
    animationFunction: 'ease-linear',
    duration: 500,
    whenVisible: true,
    // late: 0,
  })
}
