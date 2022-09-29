const fs = require('fs')
const axios = require('axios')
const MeiliSearch = require('meilisearch')

const links = [
    { id: 'members', url: 'https://api.github.com/' },
    { id: 'businesses', url: 'https://api.github.com/'}
]

links.map(getData, meiliSend)

function getData(item){
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

function meiliSend(item){
    const documents = require('./data/' + item.name + '.json')
    const client = new MeiliSearch({ host: 'http://127.0.0.1:7700', apiKey:  'xxxx'})
    client.index(item.name).deleteAllDocuments()
    client.index(item.name).addDocuments(documents)
}
fetchData()
setInterval(fetchData,  60000)