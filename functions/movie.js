const axios = require('axios')
const { OMDB_API_KEY } = process.env

//store의 movie.js에서 보내온 payload 객체를 evnet 객체로 받아서 문자데이터로 변환해서 사용
exports.handler = async function (event) {
  // console.log(event)
  const payload = JSON.parse(event.body)  //JSON.parse로 다시 payload 객체데이터로 변환해서 사용
  const { title, type, year, page, id } = payload
  const url = id   //삼항연산자 조건 참 : 거짓
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.message
      }
  }
}