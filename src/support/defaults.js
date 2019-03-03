
export const ModuleConfig = {
  /**
   * Vuex Default Getters
   */
  getters: {
    loading: state => state.loading,
    errors: state => state.errors,
  },

  /**
   * Vuex Default Mutations
   */
  mutations: {
    /**
     * On Default Request
     * @param {object} state
     */
    onRequest(state) {
      state.loading = true;
      state.errors = [];
    },

    /**
     * On Error Request
     * @param {object} state
     * @param {object} response
     */
    onError(state, response) {
      state.loading = false;
      state.errors = response.data;
    },

    /**
     * On Success Request
     * @param {object} state
     * @param {object} response
     */
    onSuccess(state) {
      state.loading = false;
      state.errors = [];
    },
  },

  /**
   * Vuex Defualt State
   */
  state: {
    loading: false,
    errors: [],
  },
};