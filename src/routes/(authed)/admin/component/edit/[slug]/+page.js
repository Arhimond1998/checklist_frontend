import { bffGet } from '$lib/utils.js';

export async function load(params) {
  let id_component = params.params.slug;
  const resp = await bffGet(`api/components/${id_component}`);
  console.log({resp})
  return {data: resp.data}
}
