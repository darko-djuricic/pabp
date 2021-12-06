<template>
<div class="modal fade" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><slot name="title"/></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-start">
        <slot name="body" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="Operation(args)">Yes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    inheritAttrs: true,
    props:{
      args: undefined,
      Operation: Function,  
    },
}
</script>
