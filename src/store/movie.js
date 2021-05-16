import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  //module!
  namespaced: true,
  //data!
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
    loading: false
  }),
  //computed
  getters: {},
  //변이 methods!
  mutations: {
    updateState(state, payload) {
      //['movies','message'.'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
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
      const res = await _fetchMovies({
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
          const res = await _fetchMovies({
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
    }
  }
}

function _fetchMovies(payload) {
  const { title, type, year, page } = payload
  const OMDB_API_KRY = '7035c60c'
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KRY}&s=${title}&type=${type}&y=${year}&page=${page}`

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