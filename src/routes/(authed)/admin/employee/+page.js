import { bffPost } from '$lib/utils';

export async function load({ url }) {
  try {
    let resp = await bffPost('api/employees/get_all', { filters: [] });
    console.log({ resp });
    return { data: resp.data };
  } catch (error) {
    console.log({ error });
  }
}
