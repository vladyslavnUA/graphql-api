const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
global.fetch = require("node-fetch");
require('dotenv').config()

const schema = buildSchema(`
enum Units {
	standard
	metric
	imperial
}

type Weather {
	temperature: Float!
	description: String!
    feels_like: String!
    temp_min: String!
    temp_max: String!
    pressure: String!
    humidity: String!
}

type Query {
	getWeather(zip: Int!, units: Units): Weather!
    getWeatherById(id: Int!, units: Units): Weather!
    getWeatherByName(name: String!, units: Units): Weather!
}
`)

const root = { 
    getWeather: async ({ zip, units='imperial' }) => {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${units}`
        const res = await fetch(url)
        const json = await res.json()
        const temperature = json.main.temp
        const description = json.weather[0].description
        const feels_like = json.main.feels_like
        const temp_min = json.main.temp_min
        const temp_max = json.main.temp_max
        const pressure = json.main.pressure
        const humidity = json.main.humidity
        return { temperature, description, feels_like, temp_min, temp_max, pressure, humidity }
    },

    async getWeatherById(id, units='imperial') {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apikey}&units=${units}`
        const res = await fetch(url)
        const json = await res.json()
        const temperature = json.main.temp
        const description = json.weather[0].description
        const feels_like = json.main.feels_like
        const temp_min = json.main.temp_min
        const temp_max = json.main.temp_max
        const pressure = json.main.pressure
        const humidity = json.main.humidity
        return { temperature, description, feels_like, temp_min, temp_max, pressure, humidity }
    },

    async getWeatherByName(name, units='imperial') {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apikey}&units=${units}`
        const res = await fetch(url)
        const json = await res.json()
        const temperature = json.main.temp
        const description = json.weather[0].description
        const feels_like = json.main.feels_like
        const temp_min = json.main.temp_min
        const temp_max = json.main.temp_max
        const pressure = json.main.pressure
        const humidity = json.main.humidity
        return { temperature, description, feels_like, temp_min, temp_max, pressure, humidity }
    }
}

const app = express()

app.use('/graphql', graphqlHTTP({ 
    schema,
    rootValue: root,
    graphiql: true
}))

const port = 4000
app.listen(port, () => {
  console.log('Running on port: ' + port)
})