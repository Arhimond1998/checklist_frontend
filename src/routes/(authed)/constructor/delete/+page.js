import { bffGet } from '$lib/utils';

export async function load({ url }) {
  try {
    let resp = await bffGet('api/checklists/titles');
    console.log({ resp });
    return {data: resp.data};
  } catch (error) {
    console.log({ error });
  }
}
