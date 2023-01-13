
import { defineComponent,ref,reactive } from 'vue';
import styles from "./objectManage.module.scss"
export default defineComponent({
  name:'objectManage',
  setup(props,{expose }) {
    return () => (
      <div class={`${styles.content}`}>
        这是项目管理
      </div>
    )
  }
})
