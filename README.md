# Vuex ORM Plugin: CRUD API

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/@peterquentin/vuex-orm-crud-api.svg)](https://github.com/peterquentin/vuex-orm-crud-api/blob/master/LICENSE.md)

# Notes
Currently in progress, please use at your own risk.

# Credits
This package is based upon [Vuex ORM Plugin: Axios](https://github.com/vuex-orm/plugin-axios)
I mainly removed code and rewrote the basic request flow to support a more dynamic approach, HTTP Client independent.
Be sure to check them out if you like this package.

# Installation
``` js
import VuexORM from '@vuex-orm/core'
import VuexOrmCrudApi from '@peterquentin/vuex-orm-crud-api'
import database from './database'
..

VuexORM.use(VuexOrmCrudApi, {
  database
})
..

export default () => new Vuex.Store({
  namespaced: true,
  plugins: [VuexORM.install(database)]
})

```

# Model Methods
``` js
import User from '../models/User';

/**
 * @uri `/users`
 */
User.$fetch({
  query: {
    id: 1
  }
});

or 

/** 
  * The request entity object is exposed when we pass a closure so you can do some manipulation
  * Let's say we've injected a vue-api-query Model we can do the following: 
  */
User.$fetch({
  query: function(request) {
    // It's important we return the request object without calling the API (so no get(), set() etc..)
    return request.where('group_id', '1')->orderBy('created_at')
  }
});

/** 
  * If you have a method on your request entity that does all the have lifting
  * You can call that function and that function should return the 
  * request entity without calling the API
  */
User.$fetch({
  query: 'function'
});

/**
 * @uri `/users/:id`
 */
User.$get({
  query: {
    id: 1
  }
}); 

/**
 * @uri `/users`
 */
User.$create({
  data: {}
});

/**
 * @uri `/users/:id`
 */
User.$update({
  query: {
    id: 1
  },
  data: {}
});

/**
 * @uri `/users/:id`
 */
User.$delete({
  query: {
    id: 1
  }
});
```

# Model Config

> Default Model

``` js
import { Model } from '@vuex-orm/core'

export default class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.increment(),
      title: this.string('')
    }
  }
}
```

> Edited Model

``` js
import { Model } from '@vuex-orm/core'
import PostModel from '~/models/api/Post'

export default class Post extends Model {
  static entity = 'posts'
  /**
   * Here you set your request entity, this should be a model which utilizes 
   * a Promise based HTTP client, Axios for instance or see vue-api-query 
   * which uses Axios under the hood
   */ 
  static requestEntity = PostModel

  static fields () {
    return {
      id: this.increment(),
      title: this.string('')
    }
  }
  
}
```
