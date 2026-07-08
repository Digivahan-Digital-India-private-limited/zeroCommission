import axios from 'axios';

// ─── Base URL from env variable ────────────────────────────────────────────
const IS_DEV = !import.meta.env.PROD;
const BASE_URL = IS_DEV ? '/api_base' : 'https://zerocommissionloan.com';
const NEXTPAY_API_BASE_URL = IS_DEV ? '/api_nextpay' : 'https://zerocommissionloan.com';
const ZEROCOMMISSION_API_BASE_URL = IS_DEV ? '/api_zerocom' : 'https://zerocommissionloan.com';
const buildNextPayUrl = path => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${NEXTPAY_API_BASE_URL}${normalizedPath}`;
};
const buildZeroCommissionUrl = path => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${ZEROCOMMISSION_API_BASE_URL}${normalizedPath}`;
};
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// ─── Request Interceptor (optional logging) ────────────────────────────────
api.interceptors.request.use(config => config, error => Promise.reject(error));

// Add global interceptor for default axios to handle PHP concatenated JSON like {...}{...}
axios.interceptors.response.use(response => {
  if (typeof response.data === 'string' && response.data.includes('}{')) {
    try {
      const fixedJson = `[${response.data.replace(/\}\{/g, '},{')}]`;
      const parsedArray = JSON.parse(fixedJson);
      response.data = parsedArray[parsedArray.length - 1];
    } catch (e) {
      console.error('Failed to parse concatenated JSON', e);
    }
  }
  return response;
});

// ─── Response Interceptor ──────────────────────────────────────────────────
api.interceptors.response.use(response => response, error => {
  const message = error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
  return Promise.reject(new Error(message));
});

// ──────────────────────────────────────────────────────────────────────────
//  LOAN APPLICATION SERVICES
// ──────────────────────────────────────────────────────────────────────────

/**
 * Submit a new loan application
 * @param {{ name: string, phone: string, email: string, loan: string, message: string }} formData
 * @returns {Promise<{ success: boolean, data: { token: string, name: string, loan: string, status: string, submittedAt: string } }>}
 */
export const submitLoanApplication = async formDataState => {
  try {
    const formData = new FormData();
    Object.keys(formDataState).forEach(key => {
      formData.append(key, formDataState[key]);
    });
    const response = await axios.post(buildZeroCommissionUrl('/api_v1/user/feature/apply_loan.php'), formData, {
      headers: {
        Accept: 'application/json'
      }
    });
    if (response.data.status === true) {
      return {
        success: true,
        data: {
          token: response.data.application_token
        }
      };
    } else {
      throw new Error(response.data.message || 'Failed to submit application');
    }
  } catch (error) {
    console.error("submitLoanApplication Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Get application by token (for user status tracking)
 * @param {string} token
 * @returns {Promise<{ success: boolean, data: object }>}
 */
export const getApplicationByToken = async token => {
  try {
    const response = await api.get(`/applications/${token}`);
    return response.data;
  } catch (error) {
    console.error("getApplicationByToken Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Send OTP to user's email or phone using application_token
 * @param {string} identifier - email or token
 * @param {boolean} isToken
 */
export const sendApplicationOtp = async (identifier, isToken = false) => {
  try {
    const formData = new FormData();
    if (isToken) {
      formData.append('application_token', identifier);
    } else {
      formData.append('email', identifier);
    }
    const response = await axios.post(buildZeroCommissionUrl('/api_v1/user/feature/request_track_application.php'), formData, {
      headers: {
        Accept: 'application/json'
      }
    });
    if (response.data.status === true || response.data.message === 'OTP is already sent') {
      const email = response.data.email || response.data.data && response.data.data.email || identifier;
      return {
        success: true,
        data: {
          email
        }
      };
    } else {
      throw new Error(response.data.message || 'Failed to send OTP');
    }
  } catch (error) {
    console.error("sendApplicationOtp Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Verify User OTP
 * @param {string} email
 * @param {string} otp
 */
export const verifyApplicationOtp = async (email, otp) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('otp', otp);
    const response = await axios.post(buildZeroCommissionUrl('/api_v1/user/feature/track_application.php'), formData, {
      headers: {
        Accept: 'application/json'
      }
    });
    if (response.data.status === true) {
      // ✅ Fix: timeline object se array banana
      const rawTimeline = response.data.timeline || {};
      const timeline = Array.isArray(rawTimeline) ? rawTimeline : [...Object.entries(rawTimeline).filter(([k]) => !isNaN(k)).map(([, v]) => v), ...(Array.isArray(rawTimeline.timeline) ? rawTimeline.timeline : [])];
      const documentStatus = response.data.document_status || 'PENDING';
      const currentStatus = response.data.current_status || '';

      // Ab yeh sahi kaam karega
      const timelineTitles = timeline.map(t => t.title?.toLowerCase() || '');
      const hasSubmitted = timelineTitles.some(t => t.includes('application submitted'));
      const hasDocuments = timelineTitles.some(t => t.includes('documents uploaded')) || documentStatus === 'RECEIVED';
      const hasVerification = timelineTitles.some(t => t.includes('verification'));
      const hasApproval = timelineTitles.some(t => t.includes('approved')) || currentStatus === 'APPROVED';
      const hasDisbursement = timelineTitles.some(t => t.includes('disburs')) || currentStatus === 'DISBURSED';
      const isRejected = currentStatus === 'REJECTED';
      return {
        success: true,
        data: {
          email: email,
          loanApplicationId: response.data.loan_application_id,
          documentIds: response.data.document_ids || [],
          token: response.data.application_token || response.data.loan_application_id?.toString() || email,
          authToken: response.data.token || response.data.access_token || response.data.auth_token || '',
          name: response.data.name || 'User',
          phone: response.data.phone || '',
          loan: response.data.loan_type || '',
          currentStatus: currentStatus,
          documentStatus: documentStatus,
          remarks: response.data.remarks || response.data.summary || '',
          summary: response.data.summary || response.data.remarks || '',
          timeline: timeline,
          // ✅ ab proper array milega
          lastUpdatedAt: response.data.last_updated_at || null,
          createdAt: response.data.created_at || null,
          hasSubmitted: hasSubmitted,
          hasDocuments: hasDocuments,
          hasVerification: hasVerification,
          hasApproval: hasApproval,
          hasDisbursement: hasDisbursement,
          isRejected: isRejected,
          applicationStatus: currentStatus || documentStatus || 'pending'
        }
      };
    } else {
      throw new Error(response.data.message || 'Invalid OTP');
    }
  } catch (error) {
    console.error("verifyApplicationOtp Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Get all applications (Admin)
 * @param {{ status?: string, page?: number, limit?: number }} params
 * @returns {Promise<{ success: boolean, total: number, data: object[] }>}
 */
export const getAllApplications = async (params = {}) => {
  try {
    const response = await api.get('/applications', {
      params: {
        ...params,
        _t: Date.now()
      }
    });
    return response.data;
  } catch (error) {
    console.error("getAllApplications Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Get dashboard statistics (Admin)
 * @returns {Promise<{ success: boolean, data: { total, pending, approved, rejected, disbursed } }>}
 */
export const getApplicationStats = async () => {
  try {
    const response = await api.get(`/applications/stats?_t=${Date.now()}`);
    return response.data;
  } catch (error) {
    console.error("getApplicationStats Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Update application status (Admin)
 * @param {string} token
 * @param {string} status - 'Pending' | 'Approved' | 'Rejected' | 'Disbursed'
 * @returns {Promise<{ success: boolean, data: object }>}
 */
export const updateApplicationStatus = async (token, status) => {
  try {
    const response = await api.patch(`/applications/${token}/status`, {
      status
    });
    return response.data;
  } catch (error) {
    console.error("updateApplicationStatus Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Delete an application (Admin)
 * @param {string} token
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const deleteApplication = async token => {
  try {
    const response = await api.delete(`/applications/${token}`);
    return response.data;
  } catch (error) {
    console.error("deleteApplication Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Upload documents for an application via nextpayindia API
 * @param {string|number} loanApplicationId - loan_application_id from verify_otp response
 * @param {{ [docId: string]: File[] }} uploads - map of docId → File[]
 * @param {string} [remarks] - optional remarks
 * @returns {Promise<{ success: boolean, document_id: number }>}
 */
export const uploadDocuments = async (loanApplicationId, uploads, remarks = '', authToken = '') => {
  try {
    const formData = new FormData();
    formData.append('loan_application_id', loanApplicationId);
    formData.append('document_status', 'UPLOADED');
    formData.append('remarks', remarks || 'Documents uploaded by applicant');
    Object.entries(uploads).forEach(([docId, files]) => {
      if (files && files.length > 0) {
        files.forEach(file => formData.append(docId, file));
      }
    });
    const response = await axios.post(buildZeroCommissionUrl('/api_v1/user/feature/upload_docs.php'), formData, {
      timeout: 60000,
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
        Accept: 'application/json'
      }
    });
    if (response.data.status === true) {
      return {
        success: true,
        document_id: response.data.document_id,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Upload failed');
    }
  } catch (error) {
    console.error("uploadDocuments Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Get all documents for an application (Admin)
 * @param {string} token
 * @returns {Promise<{ success: boolean, data: { documents: object[] } }>}
 */
export const getDocuments = async token => {
  try {
    const response = await api.get(`/applications/${token}/documents?_t=${Date.now()}`);
    return response.data;
  } catch (error) {
    console.error("getDocuments Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Admin Login (Generate OTP)
 * @param {string} email 
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const adminLoginAPI = async email => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    const response = await axios.post(buildNextPayUrl('/zero/admin/auth/send_login_otp.php'), formData);
    if (response.data.status === true || response.data.status === 'true' || response.data.status === 'success') {
      return {
        success: true,
        data: {
          email: email
        },
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Failed to send OTP');
    }
  } catch (error) {
    console.error("adminLoginAPI Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Admin Verify (Verify OTP)
 * @param {string} email 
 * @param {string} otp 
 * @returns {Promise<{ success: boolean, message: string, data: object }>}
 */
export const adminVerifyAPI = async (email, otp) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('otp', otp);
    const response = await axios.post(buildNextPayUrl('/zero/admin/auth/verify_login_otp.php'), formData);
    if (response.data.status === true || response.data.status === 'true' || response.data.status === 'success') {
      const data = response.data.data || {};
      if (data.access_token) {
        localStorage.setItem('adminToken', data.access_token);
        localStorage.setItem('adminRefreshToken', data.refresh_token || '');
        localStorage.setItem('adminName', data.name || '');
        localStorage.setItem('adminEmail', data.email || '');
      }
      return {
        success: true,
        data: data,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Invalid OTP');
    }
  } catch (error) {
    console.error("adminVerifyAPI Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Admin Login with Password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, data: object }>}
 */
export const adminPasswordLoginAPI = async (email, password) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const response = await axios.post(buildNextPayUrl('/zero/admin/auth/login_with_password.php'), formData);
    if (response.data.status === true || response.data.status === 'true') {
      const token = response.data.data?.access_token;
      if (token) {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminRefreshToken', response.data.data?.refresh_token || '');
        localStorage.setItem('adminName', response.data.data?.name || '');
        localStorage.setItem('adminEmail', response.data.data?.email || '');
      }
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error("adminPasswordLoginAPI Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Get All Loan Applications from NextPay API
 * @param {{ page?: number, limit?: number }} params
 * @returns {Promise<{ success: boolean, data: object[], pagination: object }>}
 */
export const getAllLoanApplicationsNextPay = async (params = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const query = new URLSearchParams({
      page: 1,
      limit: 500,
      ...params
    }).toString();
    const response = await axios.get(buildNextPayUrl(`/zero/admin/feature/get_all_loan_applications.php?${query}`), {
      headers: {
        'Authorization': token || ''
      }
    });
    if (response.data.status === true || response.data.status === 'true') {
      return {
        success: true,
        data: response.data.data || [],
        pagination: response.data.pagination || {}
      };
    } else {
      throw new Error(response.data.message || 'Failed to fetch applications');
    }
  } catch (error) {
    console.error("getAllLoanApplicationsNextPay Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Admin Refresh Access Token
 * @returns {Promise<{ success: boolean, data: { access_token, refresh_token, access_token_expires_at, refresh_token_expires_at } }>}
 */
export const adminRefreshTokenAPI = async () => {
  try {
    const refreshToken = localStorage.getItem('adminRefreshToken');
    if (!refreshToken) throw new Error('No refresh token found. Please login again.');
    const formData = new FormData();
    const response = await axios.post(buildNextPayUrl('/zero/admin/auth/admin_refresh_token.php'), formData, {
      headers: {
        'Refresh-Token': refreshToken
      }
    });
    if (response.data.status === true || response.data.status === 'true') {
      const data = response.data.data || {};
      // Save new tokens to localStorage
      if (data.access_token) {
        localStorage.setItem('adminToken', data.access_token);
        localStorage.setItem('adminRefreshToken', data.refresh_token || '');
      }
      return {
        success: true,
        data: data,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Failed to refresh token');
    }
  } catch (error) {
    console.error("adminRefreshTokenAPI Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Admin Logout
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const adminLogoutAPI = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.post(buildNextPayUrl('/zero/admin/admin_logout.php'), {}, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });

    // Clear token locally regardless of backend response to ensure user is logged out locally
    localStorage.removeItem('adminToken');
    if (response.data.status === true || response.data.status === 'true' || response.data.status === 'success') {
      return {
        success: true,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Logout failed');
    }
  } catch (error) {
    console.error("adminLogoutAPI Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Toggle Application Viewed Status (Admin)
 * @param {string} token 
 * @param {boolean} viewed 
 * @returns {Promise<{ success: boolean, message: string, data: object }>}
 */
export const toggleApplicationView = async (token, viewed) => {
  try {
    const response = await api.patch(`/applications/${token}/view`, {
      viewed
    });
    return response.data;
  } catch (error) {
    console.error("toggleApplicationView Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Delete a specific document (Admin)
 * @param {string} token
 * @param {string} docFileId - MongoDB _id of the document
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const deleteDocument = async (token, docFileId) => {
  try {
    const response = await api.delete(`/applications/${token}/documents/${docFileId}`);
    return response.data;
  } catch (error) {
    console.error("deleteDocument Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Update Loan Application Status (NextPay Admin)
 * @param {number|string} loanApplicationId
 * @param {string} status - e.g. 'Approved', 'Rejected', 'Pending', 'Disbursed'
 * @param {string} summary - reason / notes
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const updateLoanStatusNextPay = async (loanApplicationId, status, remarks = '') => {
  try {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('loan_application_id', loanApplicationId);
    formData.append('status', status);
    formData.append('remarks', remarks);
    const response = await axios.post(buildNextPayUrl('/zero/admin/feature/update_laon_status.php'), formData, {
      headers: {
        'Authorization': token || ''
      }
    });
    if (response.data.status === true || response.data.status === 'true') {
      return {
        success: true,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Failed to update status');
    }
  } catch (error) {
    console.error("updateLoanStatusNextPay Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Get Document Details for an Application (NextPay Admin)
 * @param {number|string} loanApplicationId
 * @returns {Promise<{ success: boolean, data: object }>}
 */
export const getDocumentDetailsNextPay = async loanApplicationId => {
  try {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('loan_application_id', loanApplicationId);
    const response = await axios.post(buildNextPayUrl('/zero/admin/feature/get_document_details.php'), formData, {
      headers: {
        'Authorization': token || ''
      }
    });
    if (response.data.status === true || response.data.status === 'true') {
      return {
        success: true,
        data: response.data.data || response.data
      };
    } else {
      throw new Error(response.data.message || 'Failed to fetch document details');
    }
  } catch (error) {
    console.error("getDocumentDetailsNextPay Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Update Document Status (NextPay Admin)
 * @param {number|string} loanApplicationId
 * @param {string} documentStatus - e.g. 'RECEIVED', 'PENDING', 'REJECTED'
 * @param {string} remarks
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const updateDocumentStatusNextPay = async (loanApplicationId, documentStatus, remarks = '') => {
  try {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('loan_application_id', loanApplicationId);
    formData.append('document_status', documentStatus);
    formData.append('remarks', remarks);
    const response = await axios.post(buildNextPayUrl('/zero/admin/feature/update_document_status.php'), formData, {
      headers: {
        'Authorization': token || ''
      }
    });
    if (response.data.status === true || response.data.status === 'true') {
      return {
        success: true,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Failed to update document status');
    }
  } catch (error) {
    console.error("updateDocumentStatusNextPay Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Open Application (Mark as Viewed) (NextPay Admin)
 * @param {number|string} loanApplicationId
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const openApplicationNextPay = async loanApplicationId => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(buildNextPayUrl(`/zero/admin/feature/open_application.php?id=${loanApplicationId}`), {
      headers: {
        'Authorization': token || ''
      }
    });
    if (response.data.status === true || response.data.status === 'true') {
      return {
        success: true,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Failed to open application');
    }
  } catch (error) {
    console.error("openApplicationNextPay Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Delete Loan Application (NextPay Admin)
 * @param {number|string} loanApplicationId
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const deleteLoanApplicationNextPay = async loanApplicationId => {
  try {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('loan_application_id', loanApplicationId);
    const response = await axios.post(buildNextPayUrl('/zero/admin/feature/delete_loan_application.php'), formData, {
      headers: {
        'Authorization': token || ''
      }
    });
    if (response.data.status === true || response.data.status === 'true') {
      return {
        success: true,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Failed to delete application');
    }
  } catch (error) {
    console.error("deleteLoanApplicationNextPay Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Export Loan Applications (NextPay Admin)
 * @param {number[]} ids - array of loan_application_id's to export
 * @returns {Promise<{ success: boolean, data: any }>}
 */
export const exportApplicationsNextPay = async ids => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.post(buildNextPayUrl('/zero/admin/feature/export_application.php'), {
      ids
    }, {
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json'
      }
    });
    if (response.data.status === true || response.data.status === 'true') {
      return {
        success: true,
        data: response.data.data || response.data
      };
    } else {
      throw new Error(response.data.message || 'Failed to export applications');
    }
  } catch (error) {
    console.error("exportApplicationsNextPay Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Get Application Status by Application ID (NextPay Test API)
 * @param {string} applicationId - e.g. 'ZCJSH0990887'
 * @returns {Promise<{ success: boolean, data: object }>}
 */
export const getApplicationStatusById = async applicationId => {
  try {
    const formData = new FormData();
    formData.append('application_id', applicationId);
    const response = await axios.post(buildNextPayUrl('/zero/user/verify_otp_test.php'), formData, {
      headers: {
        'Authorization': 'Authorization'
      }
    });
    if (response.data.status === true) {
      const rawTimeline = response.data.timeline || {};
      const timeline = Array.isArray(rawTimeline) ? rawTimeline : [...Object.entries(rawTimeline).filter(([k]) => !isNaN(k)).map(([, v]) => v), ...(Array.isArray(rawTimeline.timeline) ? rawTimeline.timeline : [])];
      const documentStatus = response.data.document_status || 'PENDING';
      const currentStatus = response.data.current_status || '';
      const remarks = response.data.remarks || response.data.summary || '';
      const timelineTitles = timeline.map(t => t.title?.toLowerCase() || '');
      const hasSubmitted = timelineTitles.some(t => t.includes('application submitted'));
      const hasDocuments = timelineTitles.some(t => t.includes('documents uploaded')) || documentStatus === 'RECEIVED';
      const hasVerification = timelineTitles.some(t => t.includes('verification'));
      const hasApproval = timelineTitles.some(t => t.includes('approved')) || currentStatus === 'APPROVED';
      const hasDisbursement = timelineTitles.some(t => t.includes('disburs')) || currentStatus === 'DISBURSED';
      const isRejected = currentStatus === 'REJECTED';
      return {
        success: true,
        data: {
          loanApplicationId: response.data.loan_application_id,
          applicationId: applicationId,
          documentIds: response.data.document_ids || [],
          token: response.data.application_token || response.data.loan_application_id?.toString() || applicationId,
          name: response.data.name || 'User',
          phone: response.data.phone || '',
          loan: response.data.loan_type || '',
          currentStatus,
          documentStatus,
          remarks,
          summary: remarks,
          timeline,
          lastUpdatedAt: response.data.last_updated_at || null,
          createdAt: response.data.created_at || null,
          hasSubmitted,
          hasDocuments,
          hasVerification,
          hasApproval,
          hasDisbursement,
          isRejected,
          applicationStatus: currentStatus || documentStatus || 'pending'
        }
      };
    } else {
      throw new Error(response.data.message || 'Failed to fetch application status');
    }
  } catch (error) {
    console.error("getApplicationStatusById Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};
/**
 * Refresh Application Status
 * @param {string} authToken
 */
export const refreshApplicationStatus = async authToken => {
  try {
    const response = await axios.post(buildZeroCommissionUrl('/api_v1/user/feature/refresh_application.php'), {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });
    if (response.data.status === true) {
      const rawTimeline = response.data.timeline || {};
      const timeline = Array.isArray(rawTimeline) ? rawTimeline : [...Object.entries(rawTimeline).filter(([k]) => !isNaN(k)).map(([, v]) => v), ...(Array.isArray(rawTimeline.timeline) ? rawTimeline.timeline : [])];
      const documentStatus = response.data.document_status || 'PENDING';
      const currentStatus = response.data.current_status || '';
      const timelineTitles = timeline.map(t => t.title?.toLowerCase() || '');
      const hasSubmitted = timelineTitles.some(t => t.includes('application submitted'));
      const hasDocuments = timelineTitles.some(t => t.includes('documents uploaded')) || documentStatus === 'RECEIVED';
      const hasVerification = timelineTitles.some(t => t.includes('verification'));
      const hasApproval = timelineTitles.some(t => t.includes('approved')) || currentStatus === 'APPROVED';
      const hasDisbursement = timelineTitles.some(t => t.includes('disburs')) || currentStatus === 'DISBURSED';
      const isRejected = currentStatus === 'REJECTED';
      return {
        success: true,
        data: {
          loanApplicationId: response.data.loan_application_id,
          documentIds: response.data.document_ids || [],
          token: response.data.application_token || response.data.loan_application_id?.toString() || '',
          authToken: authToken,
          name: response.data.name || 'User',
          phone: response.data.phone || '',
          loan: response.data.loan_type || '',
          currentStatus: currentStatus,
          documentStatus: documentStatus,
          remarks: response.data.remarks || response.data.summary || '',
          summary: response.data.summary || response.data.remarks || '',
          timeline: timeline,
          lastUpdatedAt: response.data.last_updated_at || null,
          createdAt: response.data.created_at || null,
          hasSubmitted,
          hasDocuments,
          hasVerification,
          hasApproval,
          hasDisbursement,
          isRejected
        }
      };
    } else {
      throw new Error(response.data.message || 'Failed to refresh application');
    }
  } catch (error) {
    console.error("refreshApplicationStatus Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// ──────────────────────────────────────────────────────────────────────────
//  FAQ SERVICE
// ──────────────────────────────────────────────────────────────────────────

/**
 * Get FAQ list grouped by category
 * @returns {Promise<{ success: boolean, data: Array<{ id: number, category: string, question: string, answer: string }> }>}
 */
export const getFaqList = async () => {
  try {
    const response = await axios.get(buildZeroCommissionUrl('/api_v1/user/feature/faq/get_list.php'), {
      headers: {
        Accept: 'application/json'
      }
    });
    const payload = response?.data ?? {};
    const data = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : Array.isArray(payload?.faqs) ? payload.faqs : Array.isArray(payload?.items) ? payload.items : Array.isArray(payload?.result) ? payload.result : [];
    if (payload?.status === true || payload?.status === 'true' || payload?.success === true || payload?.success === 'true' || data.length > 0) {
      return {
        success: true,
        data
      };
    }
    throw new Error(payload?.message || 'Failed to fetch FAQs');
  } catch (error) {
    console.error("getFaqList Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// ──────────────────────────────────────────────────────────────────────────
//  CONTACT SERVICE
// ──────────────────────────────────────────────────────────────────────────

/**
 * Submit contact us form
 * @param {{ full_name: string, mobile: string, email: string, subject: string, message: string }} formDataState
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const submitContactForm = async formDataState => {
  try {
    const fullName = formDataState.full_name || formDataState.name || '';
    const mobile = formDataState.mobile || formDataState.phone || '';
    const subject = formDataState.subject || '';
    const message = formDataState.message || '';
    const email = formDataState.email || '';
    const payload = {
      full_name: fullName,
      mobile,
      email,
      subject,
      message
    };
    const candidateUrls = [buildZeroCommissionUrl('/api_v1/user/feature//contact/contact.php'), buildZeroCommissionUrl('/api_v1/user/feature/contact/contact.php')];
    let lastError = null;
    for (const url of candidateUrls) {
      try {
        const response = await axios.post(url, payload, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        const result = response?.data ?? {};
        if (result?.status === true || result?.status === 'true' || result?.success === true || result?.success === 'true') {
          return {
            success: true,
            message: result?.message || 'Message sent successfully'
          };
        }
        if (result?.message) {
          throw new Error(result.message);
        }
      } catch (error) {
        lastError = error;
      }
    }
    const serverMessage = lastError?.response?.data?.message || lastError?.message || 'Failed to submit contact form';
    throw new Error(serverMessage);
  } catch (error) {
    console.error("submitContactForm Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};
export default api;

// ──────────────────────────────────────────────────────────────────────────
//  consultation SERVICE
// ──────────────────────────────────────────────────────────────────────────

export const createGuestTicket = async formData => {
  try {
    const response = await axios.post(buildZeroCommissionUrl("/api_v1/user/feature/consultation/create_guest_ticket.php"), formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("createGuestTicket Error:", error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};