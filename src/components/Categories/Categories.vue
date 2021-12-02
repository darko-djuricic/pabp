<template>
<div class="col-6 col-md-3">
  <a class="me-3 mb-3 text-decoration-none" href="#">
      <b class="fs-5 text-decoration-underline"><slot name="header"></slot></b>
      <p class="text-dark">
        <small>
          <slot name="desc" />
        </small>
      </p>
    </a>
</div>
  
</template>

<script>
export default {
}
</script>
