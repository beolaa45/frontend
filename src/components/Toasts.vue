<template>
  <div>
        <button type="button" class="btn btn-primary" id="toastbtn">Initialize toast</button>

      <!-- Toast -->
      <div id="toastNotice" class="toast">
        <div class="toast-header">
          <strong class="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">
            <span>&times;</span>
          </button>
        </div>
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
  </div>
</template>

<script>
// var option = {
//     animation: true,
//     delay: 5000,
//     autohide: true
// }

var myToastEl = document.getElementById('myToast')
myToastEl.addEventListener('hidden.bs.toast', function () {
  
})
export default {
 name: "Toasts"
}
</script>