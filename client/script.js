function getSamplesFromServer() {
    return fetch('./db.json').then(response => {
        if (response.ok) return response.json()
        else throw new Error('Resource missing!')
    }).then(db => {
        return db
    }).catch(err => {
        console.error(err)
    })
}

async function start() {
    const samples = document.querySelector('.samples')
    const regexp = document.getElementById('regexp')

    function compare(input) {
        const regexpValue = regexp.value
        const regex = new RegExp('^' + regexpValue + '$')
        const answer = input.nextElementSibling;
        if (regex.test(input.value)) {
            answer.classList.add('match')
            answer.classList.remove('no-match')
            answer.textContent = 'Match'
        } else {
            answer.classList.add('no-match')
            answer.classList.remove('match')
            answer.textContent = 'No match'
        }
    }

    function startCompare() {
        const inputList = document.querySelectorAll('.sample-input');
        inputList.forEach(input => {
            compare(input)
        })
    }

    regexp.oninput = startCompare

    samples.addEventListener('input', event => {
        compare(event.target)
    })

    const db = await getSamplesFromServer()
    regexp.value = db[0].regexp
    const resultHTML = db[0].samples.reduce((html, inputValue) => {
        return html + `<div class="sample">
            <input type="text" class="input sample-input" value="${inputValue}">
            <div class="answer no-match">No match</div>
        </div>`
    }, '')
    samples.innerHTML = resultHTML
    startCompare()
}

document.addEventListener('DOMContentLoaded', start)