import { bffPost } from '$lib/utils.js';

export async function load() {
  const resp = await bffPost('api/role_components/get_full');
  return {data: resp.data}
}
