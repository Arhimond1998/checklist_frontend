import { bffGet } from '$lib/utils.js';

export async function load() {
  const resp = await bffGet('api/roles');
  return {data: resp.data}
}
