<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import "../../app.css";
    const dispatch = createEventDispatcher();

    export let res;
</script>

  <div class="fixed inset-0 flex items-center justify-center bg-opacity p-4">
    <div class="bg-white p-6 rounded-sm shadow-lg w-full max-w-170">
      <div class="flex justify-end">
        <button on:click={() => dispatch('close')} class="cursor-pointer">x</button>
      </div>
      <h2 class="text-xl font-semibold mb-4 border-b border-gray-300">Content</h2>
      <p class="w-full p-2 mb-2 border-b border-gray-300"><b>Title</b>: {res.title}</p>
      <p class="w-full p-2 mb-2 border-b border-gray-300"><b>Description</b>: {res.description}</p>
      <p class="w-full p-2 mb-2 border-b border-gray-300"><b>Category</b>: {res.category}</p>
      <p class="w-full p-2 mb-2 border-b border-gray-300"><b>Language</b>: {res.language}</p>
      <p class="w-full p-2 mb-2 border-b border-gray-300"><b>Provider</b>: {res.provider}</p>
      <p class="w-full p-2 mb-2 border-b border-gray-300"><b>Role</b>: {res.role}</p>
      
      <div class="flex justify-end">
        <button
          on:click={() => dispatch("viewFile")}
          type="button"
          class="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          View
        </button>
      </div>
    </div>
  </div>
  