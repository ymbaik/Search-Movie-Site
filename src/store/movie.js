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
     } catch (message) {
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
function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id   //삼항연산자 조건 참 : 거짓
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise( (resolve, reject) => {
    axios.get(url)
      .then( (res) => {
        if (res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch( (err) => {
        reject(err.message)
      }) 
  })
}