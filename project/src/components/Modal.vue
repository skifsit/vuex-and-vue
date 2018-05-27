<template>
  <transition name="modal-transition"
              @before-enter="beforeEnter"
              @enter="enter"
              @before-leave="beforeLeave"
              @leave="leave"
              :css="false">
    <div class="modal" v-if="modalOpened">
      <div @click="emitClose" class="modal-background"></div>
      <div class="modal-content">
        <slot>CONTENT</slot>
      </div>
    </div>
  </transition>
</template>

<script>
  function prepareModalOpened (e) {
    const targetRect = e.currentTarget.getBoundingClientRect()
    const targetCenterTop = targetRect.top + targetRect.height / 2
    const targetCenterLeft = targetRect.left + targetRect.width / 2
    const screenCenterTop = window.innerHeight / 2
    const screenCenterLeft = window.innerWidth / 2
    // css translate scale
    const translateX = targetCenterLeft - screenCenterLeft
    const translateY = targetCenterTop - screenCenterTop
    const scaleX = targetRect.width / window.innerWidth
    const scaleY = targetRect.height / window.innerHeight
    return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
  }

  const Modal = {
    name: 'Modal',
    props: {
      modalOpened: {
        type: Boolean,
      },
      modalTransform: {
        type: String,
      }
    },
    methods: {
      emitClose () {
        this.$emit('close')
      },
      beforeEnter (el) {
        el.style.transform = this.modalTransform
        el.style.opacity = '0.5'
      },
      enter (el, done) {
        setTimeout(() => {
          el.style.transform = 'translate(0px, 0px) scale(1, 1)'
          el.style.opacity = '1'
        }, 100)
        setTimeout(() => {
          done()
        }, 1000)
      },
      beforeLeave (el) {
        el.style.transform = this.modalTransform
        el.style.opacity = '0'
      },
      leave (el, done) {
        setTimeout(() => {
          el.style.transform = 'translate(0px, 0px) scale(1, 1)'
          done()
        }, 1000)
      },
    }
  }
  export default Modal
  export {prepareModalOpened, Modal}
</script>

<style scoped>
  .modal, .modal-background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
  }

  .modal-background {
    background-color: rgba(10, 10, 10, 0.8);
    z-index: 40;
  }

  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 1s ease, transform 1s ease;
  }

  .modal-content {
    background-color: white;
    z-index: 50;
    padding: 2em;
  }

  /*.modal-transition-enter-active {*/
    /*opacity: 1;*/
  /*}*/
  /*.modal-transition-enter {*/
    /*opacity: 0;*/
    /*transform: scale(1.5, 1.5);*/
  /*}*/
  /*.modal-transition-leave-active {*/
    /*opacity: 0;*/
    /*transform: scale(1.5, 1.5);*/
  /*}*/
  /*.modal-transition-leave {*/
    /*opacity: 1;*/
  /*}*/
</style>