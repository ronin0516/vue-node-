


export default {
    state: {
        foods: [],
    },

    mutations:{
        updateCartData(state, payload) {
            state.foods = payload
        }    
    },

    actions:{
        updateCartData({commit, state}, payload) {
            commit('updateCartData', payload);
        }
    },
    getters:{
        getCartData(state){
            return state.foods
        }
    }
}