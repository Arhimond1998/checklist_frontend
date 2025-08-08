import { bffGet } from '$lib/utils.js';
import axios from 'axios';

export async function load(params) {
  let id_checklist = params.params.slug;
  const resp = await bffGet(`api/checklists/${id_checklist}`);
  console.log({
    data: resp.data.data
  })
  return {data: Object.values(resp.data.data)}
}
