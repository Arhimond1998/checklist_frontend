import { bffGet } from '$lib/utils.js';

export async function load(params) {
  let id_checklist = params.params.slug;
  const resp = await bffGet(`api/checklists/${id_checklist}`);
  return {data: Object.values(resp.data.data), id_checklist: Number(id_checklist)}
}
