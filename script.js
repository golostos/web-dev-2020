function getSamplesFromServer() {
    return ['aaaa', 'bbbb', 'cccccc', 'ddddd']
}

function start() {
    const inputList = document.querySelectorAll('.sample-input');
    // inputList.forEach(input => {
    //     input.addEventListener('input', (event) => {
    //         console.log(event.target.value)
    //     })
    // })
    const samples = document.querySelector('.samples')
    const regexp = document.getElementById('regexp')

    samples.addEventListener('input', event => {
        // console.log(event.target.value)
        const input = event.target
        const regexpValue = regexp.value
        const regex = new RegExp('^' + regexpValue + '$')
        if (regex.test(input.value)) console.log(regex.test(input.value))
    })

    const resultHTML = getSamplesFromServer().reduce((html, inputValue) => {
        return html + `<div class="sample">
            <input type="text" class="input sample-input" value="${inputValue}">
            <div class="answer no-match">No match</div>
        </div>`
    }, '')
    samples.innerHTML = resultHTML
}

document.addEventListener('DOMContentLoaded', start)