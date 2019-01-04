
import Adaptive from './adaptive/index';
import Container from './container/index.vue'
import IconTxt from './iconTxt/index'
import Title from './title/index'
import TitleArrow from './title/indexArrow.vue'
import TitleArrowTxt from './title/indexArrowTxt.vue'
import TitleHeader from './titleHeader/index.vue'
import FoldToggle from './foldToggle/index.vue'
import FoldToggleSolid from './foldToggle/solid.vue'
import Condition from './condition/index'
import Calendar from './calendar/index'
import Page from './page/index'

import {component as VueContextMenu} from '@xunlei/vue-context-menu'

const components = { Adaptive,Container,IconTxt,Title,TitleArrow,TitleArrowTxt,TitleHeader,FoldToggle,FoldToggleSolid,Condition, Calendar, VueContextMenu, Page};

components.install = (Vue) => {
  for (let name in components) {
  	if(name!='install'){
  	   Vue.component(components[name].name, components[name]);
  	}
  }
};

export default components;
