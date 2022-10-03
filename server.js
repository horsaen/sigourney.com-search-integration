const fs = require('fs')
const axios = require('axios')
const { MeiliSearch } = require('meilisearch')

const links = [
  {id:"abouts",url:"http://127.0.0.1:5000/about"},
  {id:"businesses",url:"http://127.0.0.1:5000/business"},
  {id:"members",url:"http://127.0.0.1:5000/members"}
]

links.map(integration)

function integration(api){
  const getData = () => {
    axios
    .get(api.url)
    .then((res) =>{
      fs.writeFile('./data/' + api.id + '.json', JSON.stringify(res.data), err => {
        if(err) {
          console.log(err)
        } else {
          console.log('Written "' + api.id + '" to ./data/' + api.id + '.json')
        }
      })
    })
  }
  const sendData = () => {
    const data = './data/' + api.id + '.json'
    const files = require(data)
    const client = new MeiliSearch({ host: 'http://localhost:7700', apiKey: 'xxxx' })
    client.index(api.id).addDocuments(files)
    .then((res) => console.log(res))
  }
  getData()
  sendData()
}