import { goto } from '$app/navigation';
import { isAuthorized } from '$lib/utils.js';
export async function load({ url }) {
  if (!(await isAuthorized())) {
    goto('/login')
  }
}
 