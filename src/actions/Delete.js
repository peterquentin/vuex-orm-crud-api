import Action from './Action'
import Context from '../common/context'

export default class Delete extends Action {
  /**
   * Call $delete method
   * @param {object} store
   * @param {object} params
   */
  static async call ({ state, commit }, params = {}) {
    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const request = model.request(params).delete();

    this.onRequest(model, params);
    request
      .then(data => this.onSuccess(model, params, data))
      .catch(error => this.onError(model, params, error))

    return request;
  }

  /**
   * On Request Method
   * @param {object} model
   * @param {object} params
   */
  static onRequest(model, params) {
    model.update({
      where: params.query.id,
      data: {
        $isDeleting: true,
        $deleteErrors: []
      }
    })
  }

  /**
   * On Successful Request Method
   * @param {object} model
   * @param {object} params
   * @param {object} data
   */
  static onSuccess(model, params, data) {
    model.delete({
      where: params.query.id || data.id,
    })
  }

  /**
   * On Failed Request Method
   * @param {object} model
   * @param {object} params
   * @param {object} error
   */
  static onError(model, params, error) {
    model.update({
      where: params.query.id,
      data: {
        $isDeleting: false,
        $deleteErrors: error
      }
    })
  }
}
