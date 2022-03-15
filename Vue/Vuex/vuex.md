# Vuex Tutorial

## Install and Setup

- install vue cli
```
npm i -g @vue/cli
```

- setup new project
```
vue create
```

- install dependencies
```
npm install vuex axios
```

- to run the dev server
```
npm run serve
```

## Create first components

src/components/Todos.vue
```js
<template>
    <div>
        <h3>ToDos</h3>
    </div>    
</template>

<script>
export default {
    name: "Todos"
}
</script>

<style>
</style>
```

- setup the src/App.vue
```js
<template>
  <div id="app">
    <div class="container">
      <Todos />
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'

export default {
  name: 'App',
  components: {
    Todos
  }
}
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>
```

## Setting up Vuex

- create a folder called store for a collection point for all data
- and inside of the folder create a file called index.js
src/store/index.js
```js
import Vuex from 'vuex';
import Vue from 'vue';
import todos from './modules/todos';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        todos
    }
});
```

- then we have to setup the store into to vue application exactly in main.js
main.js
```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store, 
  render: h => h(App),
}).$mount('#app')
```

- create a folder called modules inside the store folder
src/store/modules/todos.js
```js
import axios from 'axios';

const state = {};

const getters = {};

const actions = {};

const mutations = {};

/**  same like
    export default {
        state: state,
        getters: getters,
        actions: actions,
        mutations: mutations
    }
*/

export default {
    state,
    getters,
    actions,
    mutations,
}
```
#### Problems
- the is a error "1:8 error 'axios' is defined but never used no-unused-vars"
- to solve this i add a rule into package.json "no-unused-vars":"off"
```
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {
      "no-unused-vars":"off"
    }
  },
```

- now we create static data in the store/modules/todos.js
```js
const state = {
    todos: [
        {
            id: 1,
            title: "todo 1"
        },
        {
            id: 2,
            title: "todo 2"
        }
    ],
};
```

- and we return this data in the getter section in a variable called allTodos und we return the state.todos
rsc/store/modules/todos.js
```js
const getters = {
    allTodos: state => state.todos
};
```

- now we can use this data in the src/components/Todos.vue
- first we have to import the getterstuff
```js
import { mapGetters } from 'vuex';
```

- and we defined the mapGetters in the computed section in src/components/Todos.vue
```js
<script>
import { mapGetters } from 'vuex';

export default {
    name: "Todos",
    computed: mapGetters(['allTodos'])
}
</script>
```
- and the we can use it in the template section
```js
<template>
    <div>
        <h3>ToDos</h3>
        <div class="todos">
            <!-- v-bind:key="todo.id" is the same like  :key="todo.id" -->
            <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo">
                {{ todo.title }}
            </div>
        </div>
    </div>    
</template>
```
- v-for="todo in allTodos" is a eachfor loop
- :key is  the shortform of v-bind:key and it is a databinding
- {{ todo.title}} displays the data


## Using Json Placeholder

- Json Placeholder is a fake api
- we used it her to fetch some data
- first wie get rid of the static data in src/store/modules/todos.js
```js
const state = {
    todos: [
        {
            id: 1,
            title: "todo 1"
        },
        {
            id: 2,
            title: "todo 2"
        }
    ],
};
```
- and keep an empty array like this:
```js
const state = {
    todos: [],
};
```

- now we create a action called ftechTodos to make a request, get a response and make a mutation, a mutation mutates the state
```js
const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    
    console.log(response.data)
    }    
};
```

- now we have to call the action "fetchTodos()"
- as a simple example we can do 
```js
<script>
// import map Actions
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Todos",
    //create a methods for mapping the action
    methods:{ ...mapActions(["fetchTodos"])},
    computed: mapGetters(["allTodos"]),
    // if the app is created the fetchTools function is called
    created() {
        this.fetchTodos();
    }
}
</script>
```

- now we add this to our state
- create a mutation
```js
const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    
    // commit calls the mutation, first is which one, second the data we passed in    
    commit ('setTodos', response.data)
    }    
};

const mutations = {
    // is a function get a state param and the state we want change(todos) as second param this is (response.data) from the commit above in the actions section
    // and then set the state "todos" to the param todos
    setTodos: (state, todos) => (state.todos = todos)
};
```


## Add a new Todo




## Style
- styles for this example is copy&paste from https://github.com/bradtraversy/vuex_todo_manager




## Sources

- Tutorial
  - https://www.youtube.com/watch?v=5lVQgZzLMHc&t=253s&ab_channel=TraversyMedia
  - https://github.com/bradtraversy/vuex_todo_manager