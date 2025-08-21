import { bffGet } from '$lib/utils.js';

export async function load(params) {
  let id_employee = params.params.slug;
  const resp = await bffGet(`api/employees/${id_employee}`);
  console.log({resp})
  return {data: resp.data}
}
