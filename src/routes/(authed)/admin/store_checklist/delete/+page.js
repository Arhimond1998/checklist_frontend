import { bffPost } from '$lib/utils.js';

export async function load() {
  const resp = await bffPost('api/store_checklists/get_full');
  return {data: resp.data}
}
