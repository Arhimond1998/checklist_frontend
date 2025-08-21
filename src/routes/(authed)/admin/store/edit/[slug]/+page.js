import { bffGet } from '$lib/utils.js';

export async function load(params) {
  let id_store = params.params.slug;
  const resp = await bffGet(`api/stores/${id_store}`);
  console.log({resp})
  return {data: resp.data}
}
