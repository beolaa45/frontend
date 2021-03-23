import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index"
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrashAlt, faEdit,
  faTimes, faPlusSquare, 
  faHeart as faHeartSolid, 
  faAngleLeft, faAngleRight, 
  faAngleDoubleRight, 
  faAngleDoubleLeft, faBars

} from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare} from '@fortawesome/free-brands-svg-icons'
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faTrashAlt, faFacebookSquare, faBars, faEdit, faTimes, faPlusSquare, faHeart, faHeartSolid, faAngleLeft, faAngleRight, faAngleDoubleRight, faAngleDoubleLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
