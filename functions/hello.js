exports.handler = async function (event) {
  return {
    statusCode: 200,
    // body: 'Hello World!'  //문자데이터만 할당가능
    body: JSON.stringify({
      name: 'YMBAIK',
      age: 55,
      email: 'ymb5890@gmail.com'
    })
  }
}