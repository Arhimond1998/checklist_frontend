import { bffPost } from '$lib/utils';

export async function load({ url }) {
  try {
    let resp = await bffPost('api/role_components/get_full');
    console.log({ resp });
    return { data: resp.data };
  } catch (error) {
    console.log({ error });
  }
}
