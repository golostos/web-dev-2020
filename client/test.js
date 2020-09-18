// function test() {
//     setTimeout(() => {
//         console.log('hello1')
//         setTimeout(() => {
//             console.log('hello2')
//             setTimeout(() => {
//                 console.log('hello3')
//             }, 800)
//         }, 500)
//     }, 0)
//     console.log('test')
// }

// test()

// function testPromise() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Finished successful')
//         }, 500)
//         setTimeout(() => {
//             reject('Rejected')
//         }, 1000)
//     })
// }

// testPromise()
//     .then(response => console.log(response))
//     .catch(err => console.log(err))

function delay(time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

delay().then(() => {
    console.log('step1')
    return delay(2000)
}).then(() => {
    console.log('step2')
    return delay(1500)
}).then(() => {
    console.log('step3')
    return 'stop'
}).then(message => {
    console.log(message)
})

(async function () {
    // try {
        await delay()
        console.log('step1')
        await delay(2000)
        console.log('step2')
        await delay(6000)
        console.log('step3')
        console.log('stop')
    // } catch (error) {
    //     console.error(error)
    // }
})().catch(error => {
    console.error(error)
})