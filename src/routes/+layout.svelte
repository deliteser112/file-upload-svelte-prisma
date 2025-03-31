<script lang="ts">
    let menuItems = ["Dashboard", "Users", "Feedbacks", "Programs", "Resources", "Counterparties", "Events"];
    let { children } = $props();
  </script>
  
  <nav class="bg-white shadow-md font-sans">
    <div class="mx-auto px-2 sm:px-6 lg:px-8 xl:px-15">
      <div class="flex flex-wrap justify-between h-16 items-center">
        <div class="flex items-center">
          <img src="/1.png" alt="Pack" class="h-10 w-18"/>
        </div>
        <div class="hidden h-full lg:flex">
          {#each menuItems as item}
            {#if item==="Resources"}
              <a href="/" class="text-gray-500 inline-flex items-center lg:px-3 xl:px-6 pt-1 border-b-3 text-xl font-medium leading-5 border-orange-500 text-orange-500">
                {item}
              </a>
            {/if}
            {#if item!=="Resources"}
              <a href="/" class="text-gray-500 inline-flex items-center lg:px-3 xl:px-6 pt-1 text-xl font-medium leading-5">
                {item}
              </a>
            {/if}
          {/each}
        </div>
        <div class="sm:items-center">
          <img src="/2.png" alt="Country Flag" class="h-8 w-25 rounded-full px-3"/>
        </div>
      </div>
    </div>
  </nav>

{@render children()}
