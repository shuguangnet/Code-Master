// apiClient.js

import { showLoading, hideLoading } from './loadingControl';

const originalFetch = window.fetch;

window.fetch = async (input, init) => {
  showLoading();
  try {
    const response = await originalFetch(input, init);
    return response;
  } catch (error) {
    throw error;
  } finally {
    hideLoading();
  }
};
