import { bffPost, formatDateTime } from '$lib/utils';

export async function load({ url }) {
  try {
    let resp = await bffPost('api/checklist_user_reports/titles', { filters: [] });
    console.log({ resp });
    for (const rec of resp.data) {
      rec.dt = formatDateTime(rec.dt);
    }
    return { data: resp.data };
  } catch (error) {
    console.log({ error });
  }
}
