<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import UploadModal from "../lib/components/UploadModal.svelte";
  import ResourceTable from "../lib/components/ResourceTable.svelte";
  import ViewModal from "../lib/components/ViewModal.svelte";

  let resources: {
    title: string;
    description: string;
    category: string;
    language: string;
    provider: string;
    role: string;
    file_path: string;
    view_count: number;
  }[] = [];

  let res = {
    title: "",
    description: "",
    category: "",
    language: "",
    provider: "",
    role: "",
    file_path: "",
    view_count: 0,
  };

  const showUploadModal = writable(false);
  const showViewModal = writable(false);

  async function fetchFiles() {
    const res = await fetch("/api");
    resources = await res.json();
    resources = resources.sort((a, b) => (a.title > b.title ? 1 : -1));
    showUploadModal.set(false);
    showViewModal.set(false);
  }

  const viewContent = (event: object) => {
    res = event.detail.res;
    showViewModal.set(true);
  };

  const viewFile = async () => {
    window.open(`${res.file_path}`, "_blank");
    const view_number = res.view_count + 1;
    const title_string = res.title;

    await fetch(`/api`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title_string, view_number }),
    });
    
    showViewModal.set(false);
    fetchFiles();
  };

  onMount(fetchFiles);  
</script>

<div class="mx-auto sm:px-6 lg:px-8 xl:px-15">
  {#if $showUploadModal}
    <UploadModal on:close={fetchFiles} />
  {/if}

  {#if $showViewModal}
    <ViewModal {res} on:close={fetchFiles} on:viewFile={viewFile} />
  {/if}

  <ResourceTable
    {resources}
    on:openUploadModal={() => showUploadModal.set(true)}
    on:openViewModal={viewContent}
  />
</div>
