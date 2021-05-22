import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'  //_ 언더바는 이 파일에서만 사용한다는 의미임

export default {
  //module!
  namespaced: true,
  //data!
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  getters: {},
  mutations: {   //변이 methods!
    updateState(state, payload) {
      //['movies','message'.'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {  //메임페이지 초기화  routㄷ/Home.vue에 등록해서 실행시킨다
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // actions는 async, await 안붙여도 기본적으로 비동기로 처리됨
  actions: {
    async searchMovies( {state, commit}, payload) {
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })
     try {
      const res = await _fetchMovie({
        ...payload,
        page: 1
      })
      const { Search, totalResults} = res.data
      commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })
      console.log(totalResults) //검색 영화갯수 
      console.log(typeof totalResults) //string

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)  //올림처리

      // 추가 요청
      if (pageLength > 1) {
        for (let page=2; page <= pageLength; page +=1) {
          if (page > (payload.number / 10)) break
          const res = await _fetchMovie({
            ...payload,
            page: page
          })
          const { Search } = res.data
          commit('updateState', {
            //... 전개연산자로 배열을 합쳐서 movies에 할당
            movies: [
              ...state.movies, 
              ..._uniqBy(Search, 'imdbID')
            ] 
          })
        }
      }
     } catch ({ message }) {  //에러 객체를 반환 받아서 안에 들어있는 데이터를 사용
       commit('updateState', {
         movies: [],
         message: message
       })
     } finally {
       commit('updateState', {
         loading: false
       })
     }
    },
    async searchMovieWithId( { state, commit}, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true,
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}
// 실제 영화에 관련된 데이터 가져오는 함수 _fetchMovie
//netlify 서버리스 서버에 요청할 payload 데이터 같이 보낸다
//payload에는 여러가지 영화정보들 속성을 가지고 있는 객체데이터이다. 
//요청형태로 payload를 보내면 functions의 movie.js에서 event 객체로 받아서 사용
//get은 url상에 query string(?title=value&page=value)으로 데이터 전송
//post는 데이터를 body에 담아서 전송
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload) 
}