import { bffPost } from '$lib/utils.js';

export async function load() {
  const resp = await bffPost('api/store_employees/get_full');
  return {data: resp.data}
}
