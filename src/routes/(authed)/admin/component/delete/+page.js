import { bffGet } from '$lib/utils.js';

export async function load() {
  const resp = await bffGet('api/components');
  return {data: resp.data}
}
