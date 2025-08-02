import type { Commit } from 'vuex'

interface Snack {
  delay: number
  autohide: boolean
  animation: boolean
  variant: string
  message: string
}

export default {
  namespaced: true,

  state: {
    delay: 3000,
    autohide: true,
    animation: true,
    variant: '',
    message: '',
  },

  mutations: {
    SHOW_MESSAGE(state: Snack, payload: Partial<Snack>) {
      state.message = payload.message || ''
      state.autohide = payload.autohide ?? true
      state.animation = payload.animation ?? true
      state.variant = payload.variant || 'success'
      state.delay = payload.delay ?? 3000
    },
    HIDE_MESSAGE(state: Snack) {
      state.message = ''
    },
  },

  actions: {
    /**
     * Commits a message to the store.
     * @param {*} commit
     * @param {*} toastOptions - Object containing the message and the toast options
     */
    showSnackbar({ commit, state }: { commit: Commit; state: Snack }, { message = '', variant = 'error', delay = 3000 }) {
      commit('SHOW_MESSAGE', {
        message,
        variant,
        delay,
      })

      // If autohide is true, hide after delay
      if (state.autohide) {
        setTimeout(() => {
          commit('HIDE_MESSAGE')
        }, delay)
      }
    },

    /**
     * Commits an error message to the store.
     * @param {*} commit
     * @param {string} message The message
     */
    showError({ dispatch }, message: string) {
      dispatch('showSnackbar', { message, variant: 'error' })
    },
  },
}
