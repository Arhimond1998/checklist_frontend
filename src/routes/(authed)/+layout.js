import { goto, invalidate } from '$app/navigation'

export function load({ url }) {
    const userDataRaw = localStorage.getItem('userData');
    if (!userDataRaw) {
        goto('/login');
        return;
    }
    try {
        const userData = JSON.parse(userDataRaw);
    } catch (error) {
        console.log({error});
        goto('/login');
        return;
    }   
}