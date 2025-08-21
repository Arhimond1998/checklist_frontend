import { bffPost } from '$lib/utils';

export async function load({ url }) {
  try {
    let resp = await bffPost('api/store_users/get_full');
    console.log({ resp });
    return { data: resp.data };
  } catch (error) {
    console.log({ error });
  }
}
