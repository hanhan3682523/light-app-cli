import Vue from 'vue'
import App from './indexVue/App'

Vue.config.productionTip = false;
new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>'
})