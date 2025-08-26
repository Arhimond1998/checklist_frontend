import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
const AUTH_TOKEN_NAME = 'authToken';
const USER_DATA_NAME = 'userData';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function setAuthToken(token) {
  if (token) localStorage.setItem(AUTH_TOKEN_NAME, token);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_NAME);
}

export function removeAuthToken() {
  return localStorage.removeItem(AUTH_TOKEN_NAME);
}

export function getUserData() {
  const userData = localStorage.getItem(USER_DATA_NAME);
  if (!userData) return {};
  return JSON.parse(userData);
}

export function setUserData(data) {
  return localStorage.setItem(USER_DATA_NAME, JSON.stringify(data));
}
export function getUserComponents() {
  return getUserData().components;
}
export function formatDateTime(dtString) {
  const date = new Date(dtString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export function getUserRoles() {
  return getUserData().roles;
}

export function getAuthHeaders() {
  const token = getAuthToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`
  };
}

export const api = axios.create({ baseURL: '/' });

export async function bffDelete(url) {
  const token = getAuthToken();

  return await api.delete(url, { headers: { ...getAuthHeaders() } });
}

export async function bffPatch(url, data) {
  const token = getAuthToken();
  return await api.patch(url, data, { headers: { ...getAuthHeaders() } });
}

export async function bffPut(url, data) {
  const token = getAuthToken();
  return await api.put(url, data, { headers: { ...getAuthHeaders() } });
}

export async function bffPost(url, data) {
  const token = getAuthToken();
  return await api.post(url, data, {
    headers: { ...getAuthHeaders() }
  });
}

export async function bffUploadFiles(url, data) {
  const token = getAuthToken();
  return await api.post(url, data, {
    headers: { 'Content-Type': 'multipart/form-data', ...getAuthHeaders() }
  });
}

export async function bffGet(url) {
  return await api.get(url, { headers: { ...getAuthHeaders() } });
}

export async function isAuthorized() {
  try {
    const resp = await bffGet('api/auth/is_authorized');
  } catch (error) {
    return false;
  }
  return true;
}
