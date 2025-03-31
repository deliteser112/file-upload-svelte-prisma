<script lang="ts">
  import { messageStatus, visibleToast } from "$lib/stores";
  const messageContent = [
    "File is uploaded successfully",
    "Uploading is failed",
    "Error uploading file",
    "File is required",
    "Input required field",
  ];
</script>

{#if $visibleToast}
  <div class="toast flex">
    {#if $messageStatus === 0}
      <div class="checkmark-circle-success">
        <div class="checkmark">✓</div>
      </div>
    {:else}
      <div class="checkmark-circle-fail">
        <div class="checkmark">x</div>
      </div>
    {/if}
    &nbsp&nbsp&nbsp{messageContent[$messageStatus]}
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    top: 50px;
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
  .checkmark-circle-success {
    width: 20px;
    height: 20px;
    background-color: #4caf50;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .checkmark-circle-fail {
    width: 20px;
    height: 20px;
    background-color: #f50c0c;
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
