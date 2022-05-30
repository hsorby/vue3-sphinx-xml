<script>
  import { createCommentVNode } from 'vue'
  export default {
    props: ['content'],
    setup(props) {
      return () => createCommentVNode(props.content || '')
    }
  }
</script>