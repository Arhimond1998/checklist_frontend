import { bffGet } from '$lib/utils.js';

export async function load(params) {
  let id_role = params.params.slug;
  const resp = await bffGet(`api/roles/${id_role}`);
  console.log({resp})
  return {data: resp.data}
}
