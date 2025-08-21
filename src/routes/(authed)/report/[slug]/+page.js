import { bffGet } from '$lib/utils.js';

export async function load(params) {
  let id_checklist_user_report = params.params.slug;
  const resp = await bffGet(`api/checklist_user_reports/${id_checklist_user_report}`);
  const data = resp.data;
  data.data = data.data.data;
  return data;
}
