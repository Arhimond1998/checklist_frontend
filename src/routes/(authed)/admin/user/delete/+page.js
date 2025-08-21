import { bffGet } from '$lib/utils.js';

export async function load() {
  const resp = await bffGet('api/users');
  return {data: resp.data}
}
