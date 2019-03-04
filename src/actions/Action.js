import merge from 'lodash/merge';
import { ModuleConfig } from '../support/defaults';

export default class Action {
  /**
   * Transform Module to include ModuleConfig
   * @param {object} model
   */
  static transformModule(module) {
    return merge({}, ModuleConfig, module);
  }

  /**
   * Transform Model to include ModelConfig
   * @param {object} model
   */
  static transformModel(model) {
    /**
     * Add Model Interface to each model
     */

    model.getCrudConfig = () => {
      if (!model.crudConf) {
        model.crudConf = merge({}, {
          $fetch: '$get',
          $get: '$get',
          $create: '$put',
          $update: '$get',
          $delete: model.attr([]),
        }, model.crudConf());
      }

      return model.crudConf;
    }

    model.getFields = () => {
      if (!model.cachedFields) {
        model.cachedFields = merge({}, {
          $id: model.attr(undefined),
          $isUpdating: model.boolean(false),
          $updateErrors: model.attr([]),
          $isDeleting: model.boolean(false),
          $deleteErrors: model.attr([]),
        }, model.fields());
      }

      return model.cachedFields;
    };

    return model;
  }
}
