import { get, post, setItemLocalStorage, removeItemLocalStorage, getItemLocalStorage } from '../../utility';
import route from '../../router';
import { ENTRY_URL } from "../../configureUrl"
var inforUser = getItemLocalStorage("user")

if (!inforUser) {
  inforUser = null;
  removeItemLocalStorage("user")
}
console.log(inforUser)
const defaultState = {
  islogIn: false,
  loadingLogIn: false,
  auth: inforUser,
  errorLogIn: null,
  showModalLogIn: false,

  loadingRegister: false,
  showModalRegister: false,
  successRegister: null,
  errorRegister: null,

  successChangePassword: null,
  loadingChangePassword: false,
  errorChangePassword: null,
  showModalChangePassword: false,

  succesLoginFacebook: null,
  loadingLoginFacebook: false,
  showModalLoginFacebook: false,
  errorLoginFacebook: null,
  codeLoginFacebook: null,

  successFacebook: null,
  loadingFacebook: false,
  showModalFacebook: false,
  errorFacebook: null

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
  },
  getUrlLoginFacebook: (state) => {
    return state.succesLoginFacebook
  }
};

export const actions = {
  async getPathLoginFacebook({ commit }) {
    try {
      commit("clearLoginFacebook")
      commit("startLoginFacebook")
      let respone = await get(ENTRY_URL + "/auth/facebook/login")
      console.log(respone)
      commit("successLoginFacebook", respone)
    } catch (error) {
      console.log(error)
      commit("errorLoginFacebook")
      removeItemLocalStorage("urlLoginFacebook")
    }
  },
  async loginFacebook({ commit }, data) {

    try {
      const qs = Object.keys(data.query)
        .map(key => `${key}=${data.query[key]}`)
        .join('&');
      console.log("okkk", qs)
      commit("clearFacebook")
      commit("startFacebook")

      let respone = await get(ENTRY_URL + "/auth/facebook/callback?" + qs)
      console.log("loginFacebook", respone)
      commit('successFacebook', respone)
      const user = await get(ENTRY_URL + "/users/account", {
        "Authorization": respone.data.token_type + respone.data.access_token
      });
      setItemLocalStorage("user", { ...respone.data, ...user.data })
      commit("logInSucces", { ...respone.data, ...user.data })
      if (getItemLocalStorage("user")) {
        route.push("/")
      }
    } catch (error) {
      commit('errorFacebook', error)
      route.push("/login")
    }
  },
  async logIn({ commit }, data = {}) {
    commit("clearDataLogIn")
    commit("logInStart")
    try {
      const respone = await post(ENTRY_URL + "/auth/login", data);

      if (respone.error) {
        console.log("erro usth", respone)
        console.log("loignerror", respone)
        commit("logInError", respone)
        commit("handleLogout")
        await setTimeout(() => {
          commit("handleShowModalLogIn", false)
        }, 3000)
      } else {
        const user = await get(ENTRY_URL + "/users/account", {
          "Authorization": respone.token_type + respone.access_token
        })
        setItemLocalStorage("user", { ...respone, ...user.data })
        commit("logInSucces", { ...respone, ...user.data })
        route.push({ path: "/" })
        await setTimeout(() => {
          commit("handleShowModalLogIn", false)
        }, 3000)
      }
    } catch (error) {
      commit("logInError", error)
      commit("handleLogout")
      await setTimeout(() => {

        commit("handleShowModalLogIn", false)
      }, 3000)

    }
  },
  async register({ commit }, data = {}) {

    commit("clearDataRegister");
    commit("startRegister");
    try {
      const respone = await post(ENTRY_URL + "/auth/register", data);
      if (respone.code === '4220') {
        commit("errorRegister", respone)
        await setTimeout(() => {
          commit("handleShowModalRegister", false)
        }, 3000)
      } else {
        commit("successRegister", respone)
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

  },
  async changePassword({ commit, rootState }, payload) {
    try {
      commit("clearChangePassword")
      commit("startChangePassword")
      let respone = await post(ENTRY_URL + "/users/change-password", payload, {
        "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token
      })
      console.log("respone", respone)
      if (respone?.error?.code) {
        commit("errorChangePassword", respone)

      } else {
        commit("successChangePassword", respone)
        route.push("/")
      }

      console.log(commit, rootState, respone)
    } catch (error) {
      commit("errorChangePassword", error)
      console.log(error)
    }
  }
};

export const mutations = {
  clearDataLogIn() {
    state.isLogIn = false
    state.loadingLogIn = false
    state.auth = null
    state.errorLogIn = false
    state.showModalLogIn = false
  },
  logInSucces(state, data) {
    state.isLogIn = true;
    state.auth = data;
    state.loadingLogIn = false;
    state.showModalLogIn = true
  },
  logInError(state,error) {
    
    state.errorLogIn = error;
    state.isLogIn = false;
    state.showModalLogIn = true
    state.loadingLogIn = false;
    console.log("Commiterror", state.showModalLogIn)
  },
  logInStart() {
    state.loadingLogIn = true
  },

  handleLogIn(state, value) {
    state.isLogIn = value
  },
  clearDataRegister(state) {
    state.errorRegister = false;
    state.loadingRegister = false;
    state.successRegister = null;
    state.errorRegister = null;
    state.showModalRegister = false
  },
  startRegister(state) {
    state.loadingRegister = true
  },
  successRegister(state, data) {
    state.loadingRegister = false;
    state.successRegister = data;
    state.showModalRegister = true

  },
  errorRegister(state, error) {
    state.loadingRegister = false;
    state.showModalRegister = true;
    state.errorRegister = error
  },
  handleLogout(state) {
    console.log("remove")
    removeItemLocalStorage("user")
    state.isLogIn = false
    state.auth = null
    state.showModalRegister = false
    state.showModalLogIn = false
    state.errorRegister = null
    state.errorLogIn = null
  },
  handleShowModalRegister(state, value = false) {
    state.showModalRegister = value
  },
  handleShowModalLogIn(state, value) {
    state.showModalLogIn = value
    state.errorLogIn = null
  },
  defaultState(state) {
    state = { ...defaultState }
    console.log(state)
  },
  startChangePassword(state) {
    state.loadingChangePassword = true
  },
  clearChangePassword(state) {
    state.loadingChangePassword = false
    state.showModalChangePassword = false
    state.successChangePassword = null
    state.errorChangePassword = null
  },
  successChangePassword(state, value) {
    state.successChangePassword = value
    state.loadingChangePassword = false
    state.showModalChangePassword = true
  },
  errorChangePassword(state, error) {
    state.loadingChangePassword = false
    state.errorChangePassword = error
    state.showModalChangePassword = true
  },
  handleShowModalChangePassword(state, value = false) {
    state.showModalChangePassword = value
  },
  ///login Facebook
  clearLoginFacebook(state) {
    state.loadingLoginFacebook = false
    state.showModalLoginFacebook = false
    state.succesLoginFacebook = null
    state.errorLoginFacebook = null
  },
  startLoginFacebook(state) {
    state.loadingLoginFacebook = true
  },
  successLoginFacebook(state, value) {
    state.loadingLoginFacebook = false
    state.succesLoginFacebook = value
    state.showModalLoginFacebook = true
  },
  errorLoginFacebook(state, value) {
    state.loadingLoginFacebook = false
    state.errorLoginFacebook = value
    state.showModalLoginFacebook = true
  },
  handleShowModalLoginFacebook(state, value = false) {
    state.showModalLoginFacebook = value
  },
  getCodeLoginFacebook(state, value) {
    state.codeLoginFacebook = value
  },

  ///facebook
  clearFacebook(state) {
    state.successFacebook = null
    state.errorFacebook = null
    state.showModalFacebook
  },
  startFacebook(state) {
    state.loadingFacebook = true
  },
  errorFacebook(state, value) {
    state.errorFacebook = value
    state.loadingFacebook = false
    state.showModalFacebook = true
  },
  successFacebook(state, value) {
    state.successFacebook = value
    state.loadingFacebook = false
  }

};
