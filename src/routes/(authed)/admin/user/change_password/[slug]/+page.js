import { bffGet } from '$lib/utils.js';

export async function load(params) {
  let id_user = params.params.slug;
  const resp = await bffGet(`api/users/${id_user}`);
  console.log({resp})
  return {data: resp.data}
}
