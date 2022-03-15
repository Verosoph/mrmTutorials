import axios from 'axios';

const state = {
    todos: [],
};

const getters = {
    allTodos: state => state.todos,
};

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

/**  same like
    export default {
        state: state,
        getter: getter,
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