<script lang="ts">
  import { onMount } from "svelte";
  import "../app.css";

  let modal_flag: boolean = false;
  let toast_flag: boolean = false;
  

  

  let resources: {
    title: String;
    description: String;
    category: String;
    language: String;
    provider: String;
    role: String;
    file_path: String;
  }[] = [];

  onMount(async () => {
    modal_flag = false;
    const res = await fetch("/api");
    resources = await res.json();
  });

  setTimeout(() => {
    toast_flag = false;
  }, 2000);

 

</script>


{#if modal_flag}
  

  {#if toast_flag}
    <div
      class="animate-fade-in-up fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-100 animate-fade-in-up transition-opacity duration-500"
    >
      <div
        class="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <p class="text-gray-800 font-medium text-sm leading-snug">
        {file ? "Upload failed." : "Please select a file!"}
      </p>
    </div>
  {/if}
{/if}

{#if toast_flag}
  <div
    class="animate-fade-in-up fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-100 animate-fade-in-up transition-opacity duration-500"
  >
    <div
      class="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <p class="text-gray-800 font-medium text-sm leading-snug">
      {modal_flag ? "Resource Uploaded Successfully!" : "Upload failed."}
    </p>
  </div>
{/if}

<style>
  .input {
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .btn {
    width: 100%;
    padding: 8px;
    text-align: center;
    border-radius: 4px;
  }

  .rgba1 {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    100% {
      opacity: 1;
      transform: translateY(12px);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.7s ease-out forwards;
  }
</style>
