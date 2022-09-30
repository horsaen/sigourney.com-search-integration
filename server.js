const fs = require('fs')
const axios = require('axios')

const links = [
    {id:"name", url:"http://api.github.com"},
    {id:"name2", url:"http://api.github.com"}
]

links.map(integration)

function integration(item){
    axios
    .get(item.url)
    .then((res) => {
        fs.writeFile('./data/' + item.id + '.json', JSON.stringify(res.data), err => {
            if(err) {
                console.log(err)
            } else {
                console.log('Successfully written "' + item.id + '" to /data/' + item.id + '.json')
            }
        })
    })
    .then(() => {
        console.log(item.id)
    })
}