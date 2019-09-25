<template>
  <button :class="[
   prefixCls,
   {'v-button--primary': type === 'primary'},
   {'v-button--error': type === 'error'},
   {'v-button--success': type === 'success'},
   {'v-button--disabled': disabled },
   {'v-button--block': block },
  ]" :disabled="disabled" @click="handleClick">按钮</button>
</template>
<script>
const prefixCls = 'v-button';
export default {
  props: {
    type: {
      type: String,
      default: 'default',
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      prefixCls,
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleClick(event) {
      this.$emit('click', event);
      this.$emit('test', 1, 2, 3);
    },
  },
  created() {
  },
  mounted() {
    this.$on('test', (v1, v2, v3) => {
      console.log('test', v1, v2, v3);
    })
  }
}
</script>
