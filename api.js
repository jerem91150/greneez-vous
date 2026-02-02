/**
 * API Client pour Greenez Vous
 * Ce fichier contient toutes les fonctions pour communiquer avec le backend PHP
 */

const API_BASE = '/api';

// Token storage
let adminToken = localStorage.getItem('greenez_admin_token');
let customerToken = localStorage.getItem('greenez_customer_token');

// Helper pour les requetes
async function apiRequest(endpoint, options = {}) {
    const url = API_BASE + endpoint;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Ajouter le token si disponible
    if (adminToken) {
        headers['Authorization'] = 'Bearer ' + adminToken;
    } else if (customerToken) {
        headers['Authorization'] = 'Bearer ' + customerToken;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur API');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// =====================================================
// AUTH
// =====================================================

const API = {
    auth: {
        async loginAdmin(email, password) {
            const data = await apiRequest('/auth/login.php', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            if (data.token) {
                adminToken = data.token;
                localStorage.setItem('greenez_admin_token', data.token);
            }
            return data;
        },

        logoutAdmin() {
            adminToken = null;
            localStorage.removeItem('greenez_admin_token');
        },

        async loginCustomer(email, password) {
            const data = await apiRequest('/users/index.php?action=login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            if (data.token) {
                customerToken = data.token;
                localStorage.setItem('greenez_customer_token', data.token);
            }
            return data;
        },

        async registerCustomer(userData) {
            const data = await apiRequest('/users/index.php?action=register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            if (data.token) {
                customerToken = data.token;
                localStorage.setItem('greenez_customer_token', data.token);
            }
            return data;
        },

        logoutCustomer() {
            customerToken = null;
            localStorage.removeItem('greenez_customer_token');
        }
    },

    // =====================================================
    // PRODUCTS
    // =====================================================
    products: {
        async getAll(activeOnly = true) {
            return apiRequest('/products/index.php?active=' + activeOnly);
        },

        async getById(id) {
            return apiRequest('/products/index.php?id=' + id);
        },

        async create(product) {
            return apiRequest('/products/index.php', {
                method: 'POST',
                body: JSON.stringify(product)
            });
        },

        async update(id, updates) {
            return apiRequest('/products/index.php', {
                method: 'PUT',
                body: JSON.stringify({ id, ...updates })
            });
        },

        async delete(id) {
            return apiRequest('/products/index.php?id=' + id, {
                method: 'DELETE'
            });
        }
    },

    // =====================================================
    // CATEGORIES
    // =====================================================
    categories: {
        async getAll() {
            return apiRequest('/categories/index.php');
        }
    },

    // =====================================================
    // ORDERS
    // =====================================================
    orders: {
        async getAll() {
            return apiRequest('/orders/index.php');
        },

        async getById(id) {
            return apiRequest('/orders/index.php?id=' + id);
        },

        async getByTracking(trackingCode, email) {
            return apiRequest('/orders/index.php?tracking=' + trackingCode + '&email=' + encodeURIComponent(email));
        },

        async create(orderData) {
            return apiRequest('/orders/index.php', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
        },

        async updateStatus(id, status, note = '') {
            return apiRequest('/orders/index.php', {
                method: 'PUT',
                body: JSON.stringify({ id, status, note })
            });
        }
    },

    // =====================================================
    // PROMOS
    // =====================================================
    promos: {
        async getAll() {
            return apiRequest('/promos/index.php');
        },

        async validate(code, cartTotal) {
            return apiRequest('/promos/index.php?validate=1', {
                method: 'POST',
                body: JSON.stringify({ code, cartTotal })
            });
        },

        async create(promo) {
            return apiRequest('/promos/index.php', {
                method: 'POST',
                body: JSON.stringify(promo)
            });
        },

        async update(id, updates) {
            return apiRequest('/promos/index.php', {
                method: 'PUT',
                body: JSON.stringify({ id, ...updates })
            });
        },

        async delete(id) {
            return apiRequest('/promos/index.php?id=' + id, {
                method: 'DELETE'
            });
        }
    },

    // =====================================================
    // EVENTS
    // =====================================================
    events: {
        async getAll(activeOnly = true) {
            return apiRequest('/events/index.php?active=' + activeOnly);
        },

        async create(event) {
            return apiRequest('/events/index.php', {
                method: 'POST',
                body: JSON.stringify(event)
            });
        },

        async update(id, updates) {
            return apiRequest('/events/index.php', {
                method: 'PUT',
                body: JSON.stringify({ id, ...updates })
            });
        },

        async delete(id) {
            return apiRequest('/events/index.php?id=' + id, {
                method: 'DELETE'
            });
        }
    },

    // =====================================================
    // REVIEWS
    // =====================================================
    reviews: {
        async getAll() {
            return apiRequest('/reviews/index.php');
        },

        async getByProduct(productId) {
            return apiRequest('/reviews/index.php?product_id=' + productId);
        },

        async create(review) {
            return apiRequest('/reviews/index.php', {
                method: 'POST',
                body: JSON.stringify(review)
            });
        },

        async approve(id) {
            return apiRequest('/reviews/index.php', {
                method: 'PUT',
                body: JSON.stringify({ id, approved: true })
            });
        },

        async delete(id) {
            return apiRequest('/reviews/index.php?id=' + id, {
                method: 'DELETE'
            });
        }
    },

    // =====================================================
    // NEWSLETTER
    // =====================================================
    newsletter: {
        async getSubscribers() {
            return apiRequest('/newsletter/index.php');
        },

        async subscribe(email, firstName = '') {
            return apiRequest('/newsletter/index.php', {
                method: 'POST',
                body: JSON.stringify({ email, firstName })
            });
        },

        async unsubscribe(id) {
            return apiRequest('/newsletter/index.php?id=' + id, {
                method: 'DELETE'
            });
        }
    },

    // =====================================================
    // ACTUALITES
    // =====================================================
    actualites: {
        async getAll(activeOnly = true) {
            return apiRequest('/actualites/index.php?active=' + activeOnly);
        },

        async create(actualite) {
            return apiRequest('/actualites/index.php', {
                method: 'POST',
                body: JSON.stringify(actualite)
            });
        },

        async update(id, updates) {
            return apiRequest('/actualites/index.php', {
                method: 'PUT',
                body: JSON.stringify({ id, ...updates })
            });
        },

        async delete(id) {
            return apiRequest('/actualites/index.php?id=' + id, {
                method: 'DELETE'
            });
        }
    },

    // =====================================================
    // SHIPPING
    // =====================================================
    shipping: {
        async getAll(cartTotal = 0) {
            return apiRequest('/shipping/index.php?cartTotal=' + cartTotal);
        },

        async create(option) {
            return apiRequest('/shipping/index.php', {
                method: 'POST',
                body: JSON.stringify(option)
            });
        },

        async update(id, updates) {
            return apiRequest('/shipping/index.php', {
                method: 'PUT',
                body: JSON.stringify({ id, ...updates })
            });
        },

        async delete(id) {
            return apiRequest('/shipping/index.php?id=' + id, {
                method: 'DELETE'
            });
        }
    },

    // =====================================================
    // SETTINGS
    // =====================================================
    settings: {
        async getAll() {
            return apiRequest('/settings/index.php');
        },

        async update(settings) {
            return apiRequest('/settings/index.php', {
                method: 'PUT',
                body: JSON.stringify(settings)
            });
        }
    },

    // =====================================================
    // CUSTOMERS
    // =====================================================
    customers: {
        async getProfile() {
            return apiRequest('/users/index.php?action=profile');
        },

        async updateProfile(updates) {
            return apiRequest('/users/index.php', {
                method: 'PUT',
                body: JSON.stringify(updates)
            });
        },

        async getOrders() {
            return apiRequest('/users/index.php?action=orders');
        }
    }
};

// Export pour utilisation
window.GreenezAPI = API;
