<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	import { onMount } from "svelte";
	import "../../app.css";

	export let resources: {
		title: string;
		description: string;
		category: string;
		language: string;
		provider: string;
		role: string;
		file_path: string;
		view_count: number;
	}[] = [];

	export let res = {
		title: "",
		description: "",
		category: "",
		language: "",
		provider: "",
		role: "",
		file_path: "",
		view_count: 0,
	};

	let order = 1;

	const sortResources = () => {
		order = -order;
		resources = resources.sort((a, b) => (a.title > b.title ? order : -order));
	}

	onMount(async () => {
		const res = await fetch("/api");
		resources = await res.json();
	});
</script>

<div class="bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)] my-5 rounded-lg font-sans mx-15">
	<div class="bg-white rounded-lg shadow p-9">
		<div class="flex flex-col md:flex-row justify-between items-center p-4">
			<div class="flex items-center space-x-9 border-b text-base font-medium text-gray-500 border-gray-300 w-210">
				<img src="/3.png" alt="chart" class="h-6 w-6 mb-2" />
				<button
					class="text-gray-800 font-semibold border-b-2 border-blue-500 pb-1"
				>All</button>
				<button class="text-gray-500 hover:text-gray-800">Videos</button>
				<button class="text-gray-500 hover:text-gray-800">Documents</button>
				<button class="text-gray-500 hover:text-gray-800">Lessons</button>
				<button class="text-gray-300 cursor-not-allowed">Archive</button>
			</div>

			<div class="flex mt-4 md:mt-0 items-center space-x-3">
				<div class="flex items-center bg-white border rounded-md text-gray-400">
					<i class="fa fa-magnifying-glass m-3"></i>
					<input type="text" placeholder="Field" class="border-none" />
				</div>
				<button
					on:click={() => dispatch("openUploadModal")}
					class="bg-orange-500 text-white px-4 py-2 text-base rounded-lg"
				>Upload</button>
			</div>
		</div>

		<div class="overflow-y-auto">
			<table class="min-w-full divide-y divide-gray-300 text-sm text-gray-500">
				<thead class="text-gray-900">
					<tr>
						<th class="px-4 py-3 text-left">
							<button class="flex items-center gap-1" on:click={sortResources}>Content Title&nbsp&nbsp<i class="fas fa-arrow-down"></button>
						</th>
						<th class="px-4 py-3 text-left">Path</th>
						<th class="px-4 py-3 text-left">View Count</th>
						<th class="px-4 py-3 text-left">Uploaded By</th>
						<th class="px-4 py-3 text-left">Provider</th>
						<th class="px-4 py-3 text-left">Type</th>
						<th class="px-4 py-3"></th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-300 text-sm text-gray-900">
					{#each resources as resource, index}
						<tr
							class="hover:bg-gray-50"
							on:click={() => {
								res = resources[index];
								dispatch("openViewModal", { res: res });
							}}
						>
							<td class="px-4 py-3 whitespace-nowrap">{resource.title}</td>
							<td class="px-4 py-3 whitespace-nowrap">{resource.file_path}</td>
							<td class="px-4 py-3 whitespace-nowrap">{resource.view_count}</td>
							<td class="px-4 py-3 whitespace-nowrap">aaa@gmail.com</td>
							<td class="px-4 py-3 whitespace-nowrap">
								<span class="inline-block bg-gray-100 px-2 py-1 text-sm rounded-md">
									{resource.provider}
								</span>
							</td>
							<td class="px-4 py-3 whitespace-nowrap">
								<span class="inline-block bg-gray-100 px-2 py-1 text-sm rounded-md">
									{resource.category}
								</span>
							</td>
							<td class="px-4 py-3 text-right relative">
								<button class="text-gray-400 hover:text-gray-600"> ... </button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
