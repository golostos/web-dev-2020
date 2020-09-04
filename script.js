function start() {
    const inputList = document.querySelectorAll('.sample-input');
    // inputList.forEach(input => {
    //     input.addEventListener('input', (event) => {
    //         console.log(event.target.value)
    //     })
    // })

    document.querySelector('.samples').addEventListener('input', event => {
        console.log(event.target.value)
    })

    button.addEventListener('click', () => {
        document.querySelector('.menu').classList.toggle('menu-show')
        // document.querySelector('.menu').classList.add('menu-show')
        // document.querySelector('.menu').classList.remove('menu-show')
        // transitionend
        // setTimeout(() => console.log('Tick'), 1000)
    })
}

document.addEventListener('DOMContentLoaded', start)