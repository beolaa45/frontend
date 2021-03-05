import { login } from '../../utility'
 const defaultState = {
  isLogIn: false,
  loadingLogIn: false,
  auth: null,
  errorLogIn: null,
  showModalLogIn: false,

  showModalRegister: false,
  errorRegister: null,
  
}
export const state = defaultState

export const getters = {
  isLogIn: state => {
    return state.isLogIn
  },
  user: state => {
    return state
  },
  showModalRegister: state => {
    return state.showModalRegister
  },
  showModalLogIn: state => {
    return state.showModalLogIn
  }
};

export const actions = {
    async logIn({commit},  data = {}){
      commit("clearDataLogIn")
      commit("logInStart")
      try {
        const respone = await login("https://training-1.chondi.net/api/auth/login", data);
        console.log({respone, commit})
        commit("logInSucces", respone)
        this.$router.push({path: "/"})
      } catch (error) {
        console.log(error)
        commit("logInError")
      }
  
    }
};

export const mutations = {
  clearDataLogIn(){
    state.isLogIn = false
    state.loadingLogIn = false
    state.auth = null
    state.errorLogIn = false
    state.showModalLogIn = false
  },
  logInSucces(state, data){
      state.isLogIn = true;
      state.auth = data;
      state.loadingLogIn = false;
      state.showModalLogIn = true
  },
  logInError(error){
      state.errorLogIn = error;
      state.isLogIn = false;
      state.showModalLogIn = true
      state.loadingLogIn = false;
  },
  logInStart(){
      state.loadingLogIn = true
  },
  handleLogIn(state, value){
    state.isLogIn = value
  },
  handleLogout(state){
    state.isLogIn = null,
    state.showModalRegister =false,
    state.showModalLogIn= false,
    state.errorRegister = null,
    state.errorLogIn  =null
  },
  handleShowModalRegister(state, value){
    state.showModalRegister = value
  },
  handleShowModalLogIn(state, value){
    state.showModalLogIn = value
  },
  defaultState(state){
      state = {...defaultState}
      console.log(state)
  }
};
