const fs = require('fs')
const axios = require('axios')

const links = [
    { id: 'members', url: 'https://api.github.com/' },
    { id: 'businesses', url: 'https://api.github.com/'}
]

links.map(test)

function test(item){
    axios
    .get(item.url)
    .then((res) => {
        fs.writeFile('./data/' + item.url, JSON.stringify(res.data), err => {
            if(err) {
                console.log(err)
            } else {
                console.log('success')
            }
        })
        meiliSend()
    })
    .catch((err) => {
        console.log(err)
    })
}

function meiliSend(){
    // finish later
}