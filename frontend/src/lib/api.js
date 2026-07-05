import axios from 'axios';
import { getAuthToken, clearAuthToken } from './authStorage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API_BASE, timeout: 20000 });

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      clearAuthToken();
    }
    return Promise.reject(err);
  }
);

export const resolveMedia = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/api/uploads/')) return `${BACKEND_URL}${url}`;
  return url;
};

// Public content
export const getSite = () => api.get('/site').then(r => r.data);
export const getBrand = () => api.get('/brand').then(r => r.data);
export const getSeo = () => api.get('/seo').then(r => r.data);
export const getFounder = () => api.get('/founder').then(r => r.data);
export const getHeroMetrics = () => api.get('/hero-metrics').then(r => r.data);
export const getVerticals = () => api.get('/business-verticals').then(r => r.data);
export const getVentures = () => api.get('/ventures').then(r => r.data);
export const getVenture = (slug) => api.get(`/ventures/${slug}`).then(r => r.data);
export const getServices = () => api.get('/services').then(r => r.data);
export const getMetrics = () => api.get('/impact/metrics').then(r => r.data);
export const getStories = () => api.get('/impact/stories').then(r => r.data);
export const getJourney = () => api.get('/journey').then(r => r.data);
export const getTestimonials = () => api.get('/testimonials').then(r => r.data);
export const getGallery = () => api.get('/gallery').then(r => r.data);
export const getDocuments = () => api.get('/documents').then(r => r.data);
export const getPartners = () => api.get('/partners').then(r => r.data);
export const getBrandValues = () => api.get('/brand-values').then(r => r.data);

// Public submissions
export const submitContact = (body) => api.post('/contact', body).then(r => r.data);
export const submitProposal = (body) => api.post('/proposal', body).then(r => r.data);

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password }).then(r => r.data);
export const me = () => api.get('/auth/me').then(r => r.data);

// Admin
export const putSingleton = (key, data) => api.put(`/admin/${key}`, data).then(r => r.data);
export const listAdmin = (name) => api.get(`/admin/${name}`).then(r => r.data);
export const createItem = (name, data) => api.post(`/admin/${name}`, data).then(r => r.data);
export const updateItem = (name, id, data) => api.put(`/admin/${name}/${id}`, data).then(r => r.data);
export const deleteItem = (name, id) => api.delete(`/admin/${name}/${id}`).then(r => r.data);

export const uploadFile = (file, onProgress) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/admin/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => onProgress && onProgress(Math.round((e.loaded / (e.total || e.loaded)) * 100)),
  }).then(r => r.data);
};

export const listProposals = () => api.get('/admin/proposals').then(r => r.data);
export const listContacts = () => api.get('/admin/contacts').then(r => r.data);
export const setProposalStatus = (id, status) => api.patch(`/admin/proposals/${id}`, { status }).then(r => r.data);
export const setContactStatus = (id, status) => api.patch(`/admin/contacts/${id}`, { status }).then(r => r.data);
export const deleteProposal = (id) => api.delete(`/admin/proposals/${id}`).then(r => r.data);
export const deleteContact = (id) => api.delete(`/admin/contacts/${id}`).then(r => r.data);
