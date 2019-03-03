import merge from 'lodash/merge';
import Action from './Action'
import Context from '../common/context'

export default class Update extends Action {
  /**
   * Call $update method
   * @param {object} store
   * @param {object} params
   */
  static async call ({ state, commit }, params = {}) {
    if(!params.data || typeof params !== 'object') {
      throw new TypeError("You must include a data object in the params to send a POST request", params)
    }

    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const request = model.request(params).save();

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
        $isUpdating: true,
        $updateErrors: []
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
    model.update({
      where: params.query.id || data.id,
      data: merge({}, data, {
        $isUpdating: false,
        $updateErrors: []
      })
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
        $isUpdating: false,
        $updateErrors: error
      }
    })
  }
}
