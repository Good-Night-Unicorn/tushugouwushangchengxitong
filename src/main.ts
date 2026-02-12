import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faShoppingCart, 
  faUser, 
  faSearch, 
  faHeart, 
  faTrash,
  faPlus,
  faMinus,
  faChevronLeft,
  faChevronRight,
  faStar,
  faHome,
  faList,
  faTrophy,
  faBook,
  faTag,
  faSignInAlt,
  faUserPlus,
  faCog,
  faSignOutAlt,
  faEdit,
  faCheck,
  faTimes,
  faEye,
  faEyeSlash,
  faPhone,
  faEnvelope,
  faLock,
  faBolt
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faShoppingCart,
  faUser,
  faSearch,
  faHeart,
  faTrash,
  faPlus,
  faMinus,
  faChevronLeft,
  faChevronRight,
  faStar,
  faHome,
  faList,
  faTrophy,
  faBook,
  faTag,
  faSignInAlt,
  faUserPlus,
  faCog,
  faSignOutAlt,
  faEdit,
  faCheck,
  faTimes,
  faEye,
  faEyeSlash,
  faPhone,
  faEnvelope,
  faLock,
  faBolt
)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

