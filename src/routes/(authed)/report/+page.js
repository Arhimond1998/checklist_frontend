import { bffPost } from '$lib/utils';

export async function load({ url }) {
  function formatDateTime(dtString) {
    const date = new Date(dtString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

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
