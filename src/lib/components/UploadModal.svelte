<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Toast from "./Toast.svelte";
  import { messageStatus, visibleToast } from '$lib/stores';
  import "../../app.css";

  const dispatch = createEventDispatcher();

  const fileInfo: { [key: string]: string } = {
    title: "",
    description: "",
    category: "",
    language: "",
    provider: "",
    role: "",
    view_count: "",
    file_name: "",
  };

  let file: File | null = null;

  function handleFileChange(event: Event) {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        file = target.files[0];
        fileInfo.file_name = file.name;
      }
    };
    input.click();
  }

  const handleUpload = async () => {
    try {
      setTimeout(() => {
        visibleToast.set(false);
      }, 2000);

      const formData = new FormData();
      if (!file) {
        messageStatus.set(3);
        visibleToast.set(true);
        return;
      } else if (
        fileInfo.title === "" ||
        fileInfo.title.length >= 100 ||
        fileInfo.description === "" ||
        fileInfo.description.length >= 1000 ||
        fileInfo.category === "" ||
        fileInfo.language === "" ||
        fileInfo.provider === ""
      ) {
        messageStatus.set(4);
        visibleToast.set(true);
        return;
      }
      
      for (const [key, value] of Object.entries(fileInfo)) {
        formData.append(key, value);
      }
      formData.append("file", file);
      formData.append("view_count", "0");

      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        messageStatus.set(1);
        dispatch("close");
      } else {
        messageStatus.set(1);
        visibleToast.set(true);
      }
    } catch (error) {
      messageStatus.set(2);
      visibleToast.set(true);
    }
  };
</script>


<div class="fixed inset-0 flex items-center justify-center bg-opacity p-4">
  <Toast />
  <div class="bg-white p-6 rounded-sm shadow-lg w-full max-w-170">
    <div class="flex justify-end">
      <button on:click={() => dispatch("close")} class="flex justify-end cursor-pointer">x</button>
    </div>
    <h2 class="text-xl font-semibold mb-4">Upload Resource</h2>
    <input
      bind:value={fileInfo.title}
      placeholder="Title*"
      class="w-full border border-gray-300 rounded p-2 mb-2"
    />

    <input
      bind:value={fileInfo.description}
      placeholder="Description*"
      class="w-full border border-gray-300 rounded p-2 mb-2"
    />

    <select
      bind:value={fileInfo.category}
      class="w-full border border-gray-300 rounded p-2 mb-2"
    >
      <option value="" disabled hidden>Category*</option>
      <option value="Leadership">Leadership</option>
      <option value="Managing Complexity">Managing Complexity</option>
    </select>

    <select
      bind:value={fileInfo.language}
      class="w-full border border-gray-300 rounded p-2 mb-2"
    >
      <option value="" disabled hidden>Language*</option>
      <option value="English">en</option>
      <option value="Spanish">it</option>
      <option value="Chinese">ch</option>
    </select>

    <select
      bind:value={fileInfo.provider}
      class="w-full border border-gray-300 rounded p-2 mb-2"
    >
      <option value="" disabled hidden>Provider*</option>
      <option value="Skilla">Skilla</option>
      <option value="Linkedin">Linkedin</option>
      <option value="Pack">Pack</option>
      <option value="Mentor">Mentor</option>
    </select>

    <select
      bind:value={fileInfo.role}
      class="w-full border border-gray-300 rounded p-2 mb-2"
    >
      <option value="" disabled hidden>Role</option>
      <option value="">None</option>
      <option value="Mentor/Coach">Mentor/Coach</option>
      <option value="Mentee/Coachee">Mentee/Coachee</option>
    </select>

    <div class="flex rounded mb-2">
      <input
        type="text"
        bind:value={fileInfo.file_name}
        class="border rounded border-gray-300 w-500 p-2"
        readonly
      />
      <button
        on:click={handleFileChange}
        class="border border-gray-300 text-black px-4 py-1 rounded ml-2 w-80 cursor-pointer">Select File</button>
    </div>

    <div class="flex justify-end">
      <button
        on:click={handleUpload}
        type="button"
        class="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer"
      >Upload</button>
    </div>
  </div>
</div>
