const fs = require('fs')
const axios = require('axios')
const { MeiliSearch } = require('meilisearch')

const links = [
    {id:"name", url:"http://api.github.com"},
    {id:"name2", url:"http://api.github.com"}
]

const key = 'xxxx'

links.map(integration)

function integration(api){
    axios
    .get(api.url)
    .then((res) => {
        fs.writeFile('./data/' + api.id + '.json', JSON.stringify(res.data), err => {
            if(err) {
                console.log(err)
            } else {
                console.log('Successfully written "' + api.id + '" to /data/' + api.id + '.json')
            }
        })
    })
    .then(() => {
        const client = new MeiliSearch({ host: 'http://127.0.0.1:7700', apiKey: key,})
        client.index(api.id).deleteAllDocuments()
        client.index(api.id).addDocuments('./data/' + api.id + '.json')
    })
}