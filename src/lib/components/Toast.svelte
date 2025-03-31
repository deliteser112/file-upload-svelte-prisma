<script lang="ts">
  export let message;
  export let visibleToast;
</script>

{#if $visibleToast}
  <div class="toast flex">
    {#if message === "Resource is uploaded successfully"}
      <div class="checkmark-circle">
        <div class="checkmark">✓</div>
      </div>
    {/if}
    &nbsp&nbsp&nbsp{message}
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(255, 255, 255);
    color: black;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  .checkmark-circle {
    width: 20px;
    height: 20px;
    background-color: #4CAF50;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .checkmark {
    color: white;
    font-size: 14px;
  }
</style>
