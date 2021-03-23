import { get, post, deleted } from "../../utility";
import { ENTRY_URL } from '../../configureUrl';
export const defaultState = {
    successVotes: null,
    errorVotes: null,
    loadingVotes: false,
    showModalVotes: false
}

export const state = defaultState;

export const getters = {
    stateUsers: (state) => {
        return state
    }
}

export const actions = {
    async getListVotes({ commit, rootState }, data) {
        console.log("User", commit, data)
        try {
            commit("clearVotes")
            commit("startVotes")
            const qs = Object.keys(data.query)
                .map(key => `${key}=${data.query[key]}`)
                .join('&');
            let respone = await get(ENTRY_URL + `/votes/?${qs}`,
                { "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token }
            )
            commit("successVotes", { respone, rootState })
            console.log(respone)
        } catch (error) {
            console.log(error)
            commit("errorVotes", error)

        }
    },
    async addLike({ rootState, commit }, data) {
        try {

            commit("changeLike", data)
            let respone = await post(ENTRY_URL + "/users/up-vote", data, {
                "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token
            })
            console.log(respone)
        } catch (error) {
            commit("disLike", data)
        }
    },
    async disLike({ rootState, commit }, data) {
        try {
            commit("disLike", data)
            let respone = await post(ENTRY_URL + "/users/cancel-up-vote", data, {
                "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token
            })
            console.log(respone)
        } catch (error) {
            console.log(error)
            commit("changeLike", data)
        }
    },
    async deleteVote({ state, commit, rootState }, auth) {
        try {
            //   commit("clearDelete")
            //   commit("startDelete")

            let respone = await deleted(ENTRY_URL + "/users/delete-vote/" + auth.id, {
                "Authorization": rootState.auth.auth.token_type + ' ' + rootState.auth.auth.access_token,
            })
            console.log(state, commit, respone)
            //   commit("successDeleted", respone)
            let newItem = state.successVotes.data.listVotes.filter((el) => el.id !== auth.id)
            state.successVotes.data.listVotes = newItem
            console.log("fasdfdsf okkk", newItem)
        } catch (error) {
            //   commit("errorDelete", error)
        }

    },
}

export const mutations = {
    successVotes(state, payload) {
        let idUser = payload?.rootState?.auth?.auth?.id
        let newData = JSON.parse(JSON.stringify(payload.respone));
        let newListVote = [...newData.data.listVotes]
        for (let i = 0; i < newListVote.length; i++) {
            console.log("item", newListVote[i])
            for (let y = 0; y < newListVote[i].options.length; y++) {
                let newOption
                let index = newListVote[i].options[y].list_up_vote.findIndex(el => el.id === idUser)

                if (index !== -1) {
                    newOption = { ...newListVote[i].options[y], isLike: true, totalLike: newListVote[i].options[y].list_up_vote.length }
                } else {
                    newOption = { ...newListVote[i].options[y], isLike: false, totalLike: newListVote[i].options[y].list_up_vote.length }
                }
                newListVote[i].options[y] = newOption
            }
        }
        newData.data.listVotes = newListVote
        state.successVotes = newData
        state.loadingVotes = false
        state.showModalVotes = true
    },
    changeLike(state, data) {
        console.log("ok")
        let newState = JSON.parse(JSON.stringify(state))
        let newListVote = [...newState.successVotes.data.listVotes];
        let indexVote = newListVote.findIndex(el => el.id === data.voteId);
        let newArrOptionsVote = [...newListVote[indexVote].options];
        let indexOptionVote = newArrOptionsVote.findIndex(el => el.id === data.optionId);
        let newOptionVote = { ...newArrOptionsVote[indexOptionVote], isLike: true, totalLike: newArrOptionsVote[indexOptionVote].totalLike + 1 }

        newState.successVotes.data.listVotes[indexVote].options[indexOptionVote] = newOptionVote
        state.successVotes = newState.successVotes;
    },
    disLike(state, data) {
        let newState = JSON.parse(JSON.stringify(state))
        let newListVote = [...newState.successVotes.data.listVotes];
        let indexVote = newListVote.findIndex(el => el.id === data.voteId);
        let newArrOptionsVote = [...newListVote[indexVote].options];
        let indexOptionVote = newArrOptionsVote.findIndex(el => el.id === data.optionId);
        let newOptionVote
        if (newArrOptionsVote[indexOptionVote].totalLike === 0) {
            newOptionVote = { ...newArrOptionsVote[indexOptionVote], isLike: false, totalLike: 0 }
        } else {
            newOptionVote = { ...newArrOptionsVote[indexOptionVote], isLike: false, totalLike: newArrOptionsVote[indexOptionVote].totalLike - 1 }
        }


        newState.successVotes.data.listVotes[indexVote].options[indexOptionVote] = newOptionVote
        state.successVotes = newState.successVotes;
    },
    errorVotes(state, error) {
        state.errorVotes = error
        state.loadingVotes = false
        state.showModalVotes = true
    },
    clearVotes(state) {
        state.showModalVotes = false
        state.loadingVotes = false
        state.successVotes = null
        state.errorVotes = null
    },
    startVotes(state) {
        state.loadingVotes = true
    },
    toggleShowModalVotes(state, value = false) {
        state.showModalVotes = value
    }
}