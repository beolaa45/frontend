import { post } from '../../utility';
import route from '../../router';

 const defaultState = {
  isLogIn: false,
  loadingLogIn: false,
  auth: null,
  errorLogIn: null,
  showModalLogIn: false,

  loadingRegister: false,
  showModalRegister: false,
  successRegister: null,
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
        const respone = await post("https://training-1.chondi.net/api/auth/login", data);
        console.log({respone, commit})
        if(respone.error){
          commit("logInError")
         await setTimeout(() => {
            console.log("fail")
            commit("handleShowModalLogIn", false)
          }, 3000)
        }else{
          commit("logInSucces", respone)
          route.push({path: "/"})
         await setTimeout(() => {
            commit("handleShowModalLogIn", false)
          }, 3000)
        }
      } catch (error) {
        console.log(error)
        commit("logInError")
        await setTimeout(() => {
            
          commit("handleShowModalLogIn", false)
        }, 3000)
       
      }
    },
    async register({commit}, data = {}){
      
        commit("clearDataRegister");
        commit("startRegister");
        try {
            const respone = await post("https://training-1.chondi.net/api/auth/register", data);
            console.log({respone, commit});
            if(respone.code === '4220'){
              commit("errorRegister", respone)
              await setTimeout(() => {
                commit("handleShowModalRegister", false)
              }, 3000)
            }else{
              console.log('successRegister',respone)
              commit("successRegister", respone)
              console.log("ok")
              route.push("/login")
              await setTimeout(() => {
                commit("handleShowModalRegister", false)
              }, 3000)
            }
        } catch (error) {
          commit("errorRegister", error)
          await setTimeout(() => {
            commit("handleShowModalRegister", false)
          }, 3000)
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
  clearDataRegister(state){
    state.errorRegister = false;
    state.loadingRegister = false;
    state.successRegister = null;
    state.errorRegister = null;
    state.showModalRegister = false
  },
  startRegister(state){
    state.loadingRegister = true
  },
  successRegister(state, data){
    state.loadingRegister = false;
    state.successRegister = data;
    state.showModalRegister = true

  },
  errorRegister(state, error){
    state.loadingRegister = false;
    state.showModalRegister = true;
    state.errorRegister = error
  },
  handleLogout(state){
    state.isLogIn = null,
    state.showModalRegister =false,
    state.showModalLogIn= false,
    state.errorRegister = null,
    state.errorLogIn  =null
  },
  handleShowModalRegister(state, value = false){
    state.showModalRegister = value
  },
  handleShowModalLogIn(state, value){
    state.showModalLogIn = value
    state.errorLogIn = null
  },
  defaultState(state){
      state = {...defaultState}
      console.log(state)
  }
};
