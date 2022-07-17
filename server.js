// require 메서드로 'express' 모듈 가져오기
// app을 함수 핸들러로써 초기화
// https://developer.mozilla.org/ko/docs/Learn/Server-side/Express_Nodejs/Introduction#helloworld_express
const express = require('express')
const app = express()

// client가 최초 접속 시 보여지는 화면 => 홈페이지
// django에서 views 함수 같이, request를 받으면 response를 보낸다는 의미이다.
// '/' 를 루트 핸들러라고 부른다.
// 확인했으면, sendfile

app.get('/', function (req, res) {
  // res.sendFile(__dirname + '/home.html')

  res.sendFile(__dirname + '/index.html')
  // res.send('<h1> Hello world </h1>')
})

// express로 만든 서버를 http모듈의 createServer를 사용해 생성
// http.Server === http.createServer
// 참고: https://stackoverflow.com/questions/26921117/http-createserverapp-v-http-serverapp
const { createServer } = require('http')
const server = createServer(app)

// socket.io를 불러온 후 생성된 서버를 io에 할당
const { Server } = require('socket.io')
const io = new Server(server)

// 서버 실행 및 작동 확인
// 얘 없으면 동작을 안 한다.
server.listen(3000, () => {
  console.log('listening on * 3000')
})

// 서버와 실시간 연결
io.on('connection', (socket) => {
  console.log('user connected')

  // 서버와 연결 끊어짐
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  // 서버가 보낸 메시지 수신 후 모두에게 전송
  socket.on('chatMessage', (message) => {
    console.log(message)
    io.emit('chatMessage', message)
  })
})
