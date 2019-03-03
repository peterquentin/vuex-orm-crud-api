import VuexOrmCrudApi from './vuex-orm-crud-api';

export default class VuexOrmCrudApiPlugin {
  /**
   * This is called, when VuexORM.install(VuexOrmAxios, options) is called.
   *
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {VuexOrmCrudApi}
   */
  static install(components, options) {
    return new VuexOrmCrudApi(components, options);
  }
}
