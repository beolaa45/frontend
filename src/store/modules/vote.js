import { post, get, deleted, put } from '../../utility';
import route from '../../router';
import { ENTRY_URL } from '../../configureUrl'

const defaultState = {
  title: '',
  options: [],
  addOptions: [],
  error: null,
  loading: false,
  successVote: null,
  showModalVote: false,
  
  successListVote: null,
  loadingListVote: false,
  errorListVote: null,
  showModalListVote: false,

  successDeleted: null,
  loadingDelete: false,
  errorDelete: false,
  showModalDelete: false,

  successEdit: null,
  errorEdit: null,
  loadingEdit: false,
  showModalEdit: false,

  successAddOptions: null,
  loadingAddOptions: false,
  errorAddOptions: null,
  showModalAddOptions: false,

  successLike: null,
  errorLike: null,

}

export const state = defaultState;

export const getters = {
  sateVote: state => {
    return state
  },
  stateListVote: state => {
    return state.successListVote
  },
  totalPage: state => {
    if (state.successListVote) {
      return state.successListVote.data.votes.total
    }

  }
}

export const actions = {
  handleAddOptions: ({ state }, value) => {
    state.options.push(value)
  },
  async handleFinish({ state, commit }, auth) {

    try {
      commit("clearDateVote")
      commit("start")
      let respone = await post(ENTRY_URL + "/users/create-vote",
        { title: state.title, options: state.options },
        { "Authorization": auth?.token_type + auth.access_token }
      );

      commit("successVote", respone)
      commit("showModalVotee", true)
      route.push("/")
      commit("clearVoteTitleOptions")
      setTimeout(() => {
        commit("showModalVotee", false)
      }, 3000)

    } catch (error) {

      commit("errorVote", error)
      commit("showModalVotee", true)
      setTimeout(() => {
        commit("showModalVotee", false)
      }, 3000)
    }

  },
  async getVote({ commit }, data) {
    console.log("query", data.query)
    // convert objec to a query string
    const qs = Object.keys(data.query)
      .map(key => `${key}=${data.query[key]}`)
      .join('&');
    commit("clearListVote");
    commit("startListVote")
    try {
      let respone = await get(ENTRY_URL + "/users/list-votes?" + qs, {
        "Authorization": data.auth.auth.token_type + ' ' + data.auth.auth.access_token,
      })

      commit("successListVote", respone)

    } catch (error) {
      commit("errorListVote", error)
    }
  },
  async deleteVote({ state, commit }, auth) {
    try {
      commit("clearDelete")
      commit("startDelete")
      let respone = await deleted(ENTRY_URL + "/users/delete-vote/" + auth.id, {
        "Authorization": auth.user.auth.token_type + ' ' + auth.user.auth.access_token,
      })
      commit("successDeleted", respone)
      let newItem = state.successListVote.data.votes.data.filter((el) => el.id !== auth.id)
      state.successListVote.data.votes.data = newItem
    } catch (error) {
      commit("errorDelete", error)
    }

  },
  async editTitle({ commit }, data) {
    try {
      commit("clearEdit")
      commit("startEdit")
      let payload = {
        title: data.title
      }

      let respone = await put(ENTRY_URL + `/votes/${data.id}/update-title`, payload, {
        "Authorization": data.user.auth.token_type + ' ' + data.user.auth.access_token,
      })
      commit("successEdited", respone)
    } catch (error) {
      commit("errorEdit", error)
    }

  },
  async addOptionsVote({ rootState, commit }, data) {
    let payload = {
      options: data.options
    }
    if (data?.isUser) {
      payload = {
        voteId: data.voteId,
        options: data.options
      }
    }
    try {
      commit("clearAddOptions")
      commit("startAddOptions")
      let respone;
      if (data?.isUser) {
        respone = await post(ENTRY_URL + '/users/offer-vote', payload,
          { "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token });
        route.push('/list-vote-other-user')
      } else {
        respone = await put(ENTRY_URL + `/votes/${data.id}/add-options`, payload,
          { "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token });
        route.push('/')
      }

      commit("successAddOptions", respone)
      commit("clearVoteTitleOptions")
    } catch (error) {
      commit("errorAddOptions", error)
    }
  },
  async addLike({ commit, rootState }, data) {
    commit("changeLike", data)
    try {
      let respone = await post(ENTRY_URL + "/users/up-vote", data, {
        "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token
      })
      console.log(respone, commit)
    } catch (error) {
      commit("disLike", data)
      console.log(error)
    }
  },
  async disLike({ commit, rootState }, data) {
    commit("disLike", data)
    try {
      let respone = await post(ENTRY_URL + "/users/cancel-up-vote", data, {
        "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token
      })
      console.log(respone, commit)
    } catch (error) {
      commit("changeLike", data)
    }
  },
  async addOptionsUser() {

  }
}

export const mutations = {
  handleAddTitle(state, value) {
    state.title = value;
    if (state.title) {
      route.push("/createvote/options")
    }
  },
  changeLike(state, data) {
    let newState = JSON.parse(JSON.stringify(state))
    let newListVote = [...newState.successListVote.data.votes.data];
    let indexVote = newListVote.findIndex(el => el.id === data.voteId);
    let newArrOptionsVote = [...newListVote[indexVote].options];
    let indexOptionVote = newArrOptionsVote.findIndex(el => el.id === data.optionId);
    let newOptionVote = { ...newArrOptionsVote[indexOptionVote], isLike: true, totalLike: newArrOptionsVote[indexOptionVote].totalLike + 1 }

    newState.successListVote.data.votes.data[indexVote].options[indexOptionVote] = newOptionVote
    state.successListVote = newState.successListVote;
  },
  disLike(state, data) {
    let newState = JSON.parse(JSON.stringify(state))

    let newListVote = [...newState.successListVote.data.votes.data];

    let indexVote = newListVote.findIndex(el => el.id === data.voteId);
    let newArrOptionsVote = [...newListVote[indexVote].options];
    let indexOptionVote = newArrOptionsVote.findIndex(el => el.id === data.optionId);
    let newOptionVote
    if (newArrOptionsVote[indexOptionVote].totalLike === 0) {
      newOptionVote = { ...newArrOptionsVote[indexOptionVote], isLike: false, totalLike: 0 }
    } else {
      newOptionVote = { ...newArrOptionsVote[indexOptionVote], isLike: false, totalLike: newArrOptionsVote[indexOptionVote].totalLike - 1 }
    }

    newState.successListVote.data.votes.data[indexVote].options[indexOptionVote] = newOptionVote
    state.successListVote = newState.successListVote;
  },
  clearVoteTitleOptions(state) {
    state.title = null;
    state.options = [];
    state.addOptions = []
  },
  clearOptions(state) {
    state.options = [];
    state.addOptions = []

  },
  addTitleParams(state, value) {
    state.title = value
  },
  addOptionParams(state, value) {
    state.options = value
  },
  addMoreOptionsParam(state, value) {
    state.addOptions.push(value)
  },
  start(state) {
    state.loading = true
  },

  clearVote(state) {
    state = { ...defaultState }
    console.log(state)
  },
  clearDateVote() {
    state.loading = false;
    state.successVote = null;
    state.error = null;
    state.showModalVote = false
  },
  showModalVotee(state, value) {
    state.showModalVote = value
  },
  successVote(state, value) {
    state.successVote = value
    state.loading = false
    state.title = ''
    state.options = []

  },
  errorVote(state, error) {
    state.error = error
    state.loading = false
  },
  clearStateVote(state) {
    state.title = '';
    state.options = []
  },
  startListVote(state) {
    state.loadingListVote = true
  },
  successListVote(state, value) {
    let newValue = { ...value };
    let idUser = newValue?.data?.owner?.id;
    let newLisVote = newValue?.data.votes.data
    console.log("newLisVotedfsdafdsf", idUser)
    for (let i = 0; i < newLisVote.length; i++) {
      for (let y = 0; y < newLisVote[i].options.length; y++) {
        let newOption
        let index = newLisVote[i].options[y].list_up_vote.findIndex(el => el.id === idUser)
        console.log("index", index)
        if (index !== -1) {
          newOption = { ...newLisVote[i].options[y], isLike: true, totalLike: newLisVote[i].options[y].list_up_vote.length }
        } else {
          newOption = { ...newLisVote[i].options[y], isLike: false, totalLike: newLisVote[i].options[y].list_up_vote.length }
        }
        newLisVote[i].options[y] = newOption
      }
    }
    console.log("listvote", newLisVote);

    state.successListVote = value
    state.loadingListVote = false
    state.showModalListVote = true
  },
  errorListVote(state, error) {
    state.loadingListVote = false
    state.showModalListVote = true
    state.errorListVote = error
  },
  clearListVote(state) {
    state.successListVote = null
    state.loadingListVote = false
    state.errorListVote = null
    state.showModalListVote = false
  },
  startDelete(state) {
    state.loadingDelete = true
  },
  successDeleted(state, value) {
    state.loadingDelete = false
    state.successDeleted = value
    state.showModalDelete = true
  },
  errorDelete(state, value) {
    state.loadingDelete = false
    state.errorDelete = value
    state.showModalDelete = true
  },
  clearDelete(state) {
    state.loadingDelete = false
    state.errorDelete = null
    state.successDeleted = null
    state.showModalDelete = false
  },
  showModalDelete(state, value = false) {
    state.showModalDelete = value
  },
  startEdit(state) {
    state.loadingEdit = true;
  },
  successEdited(state, value) {
    console.log("editsucces", value)
    state.successEdited = true
    state.showModalEdit = true
    state.loadingEdit = false
  },
  errorEdit(state, error) {
    state.errorEdit = error
    state.loadingEdit = false
    state.showModalEdit = true
  },
  clearEdit(state) {
    state.showModalEdit = false
    state.loadingEdit = false
    state.errorEdit = null
    state.successEdit = null
  },
  showModalEdit(state, value = false) {
    state.showModalEdit = value
  },
  ////Add Options
  successAddOptions(state, value) {
    state.successAddOptions = value
    state.loadingAddOptions = false
    state.showModalAddOptions = true
  },
  errorAddOptions(state, value) {
    state.errorAddOptions = value
    state.loadingAddOptions = false
    state.showModalAddOptions = true
  },
  startAddOptions(state) {
    state.loadingAddOptions = true
  },
  clearAddOptions(state) {
    state.successAddOptions = null,
      state.loadingAddOptions = false,
      state.errorAddOptions = null,
      state.showModalAddOptions = false
  },
  handleShowModalAddOptions(state, value = false) {
    state.showModalAddOptions = value
  },
  ///like
  successLiked(state, value) {
    state.successLike = value
  },
  errorLiked(state, value) {
    state.errorLike = value
  }

}

