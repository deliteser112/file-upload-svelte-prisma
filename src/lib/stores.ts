import { writable } from 'svelte/store';

export const messageStatus = writable(0);
export const visibleToast = writable(false);
