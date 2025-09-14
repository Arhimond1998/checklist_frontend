import { bffGet, getUserData } from '$lib/utils.js';

export async function load(params) {
  let id_checklist = Number(params.params.slug);
  let userData = getUserData();
  let promises = [
    getChecklistStores(id_checklist),
    getUserStores(userData.id_user),
    getChecklistData(id_checklist)
  ];
  const [checklistStores, userStores, checklistData] = await Promise.all(promises);
  return {
    data: Object.values(checklistData.data),
    id_checklist: Number(id_checklist),
    id_store: checklistStores.filter((r) => userStores.includes(r))
  };
}

async function getChecklistData(id_checklist) {
  let resp = await bffGet(`api/checklists/${id_checklist}`);
  return {
    data: Object.values(resp.data.data),
    id_checklist: Number(id_checklist),
    id_store: []
  };
}

async function getChecklistStores(id_checklist) {
  const resp = await bffGet('api/store_checklists');
  let result = [];
  if (resp.data) {
    result = resp.data.filter((r) => r.id_checklist === id_checklist).map((r) => r.id_store);
  }
  return result;
}

async function getUserStores(id_user) {
  const resp = await bffGet('api/store_users');
  let result = [];
  if (resp.data) {
    result = resp.data.filter((r) => r.id_user === id_user || id_user === 1).map((r) => r.id_store);
  }
  return result;
}
