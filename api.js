/**
 * API Client pour Greenez Vous
 * Ce fichier contient toutes les fonctions pour communiquer avec le backend PHP
 */

const API_BASE = '/api';

// Token storage
let adminToken = localStorage.getItem('greenez_admin_token');
let customerToken = localStorage.getItem('greenez_customer_token');

// Heuristique de choix du token :
// - les routes clairement "clientes" (login/register client, profil, commandes
//   client, suivi invite, inscription newsletter) utilisent le token client si
//   present, meme quand une session admin est ouverte en parallele ;
// - toutes les autres routes (ecritures admin, listes admin) utilisent le
//   token admin en priorite.
// options.tokenType ('customer' | 'admin') permet de forcer le choix.
function isCustomerRoute(endpoint, options) {
    const method = (options.method || 'GET').toUpperCase();
    if (endpoint.indexOf('/auth/reset-password.php') === 0) return true;
    if (endpoint.indexOf('/users/index.php?action=login') === 0) return true;
    if (endpoint.indexOf('/users/index.php?action=register') === 0) return true;
    if (endpoint.indexOf('/users/index.php?action=profile') === 0) return true;
    if (endpoint.indexOf('/users/index.php?action=orders') === 0) return true;
    // Inscription newsletter (POST) = action publique ; GET liste = admin
    if (endpoint.indexOf('/newsletter/index.php') === 0) return method === 'POST';
    if (endpoint.indexOf('/orders/index.php') === 0) {
        // Suivi invite et creation de commande (le POST admin n'existe pas)
        if (endpoint.indexOf('tracking=') !== -1) return true;
        if (method === 'POST') return true;
    }
    return false;
}

// Helper pour les requetes
async function apiRequest(endpoint, options = {}) {
    const url = API_BASE + endpoint;

    // tokenType est interne au client, ne pas le transmettre a fetch
    const { tokenType, ...fetchOptions } = options;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Lire les tokens depuis localStorage a chaque requete
    // (le LoginPage stocke directement dans localStorage sans passer par API.auth)
    const currentAdminToken = adminToken || localStorage.getItem('greenez_admin_token');
    const currentCustomerToken = customerToken || localStorage.getItem('greenez_customer_token');

    let tokenToUse = null;
    if (tokenType === 'customer') {
        tokenToUse = currentCustomerToken;
    } else if (tokenType === 'admin') {
        // Pas de repli sur le token client : le serveur verifie le type du
        // token, un repli ne peut donc jamais aboutir et produit une 401
        // impossible a diagnostiquer cote interface
        tokenToUse = currentAdminToken;
    } else if (isCustomerRoute(endpoint, options)) {
        tokenToUse = currentCustomerToken || currentAdminToken;
    } else {
        tokenToUse = currentAdminToken || currentCustomerToken;
    }
    if (tokenToUse) {
        headers['Authorization'] = 'Bearer ' + tokenToUse;
    }

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers
        });

        // Session admin expiree : nettoyer le stockage pour que l'interface
        // admin ne reste pas visible avec une session invalide
        if (response.status === 401 && tokenToUse && tokenToUse === currentAdminToken) {
            adminToken = null;
            localStorage.removeItem('greenez_admin_token');
            localStorage.removeItem('greenez_admin');
            // greenez_admin_user contient l'identite admin affichee dans le
            // tableau de bord : la laisser en place apres expiration de la
            // session ferait persister un admin connecte en apparence
            localStorage.removeItem('greenez_admin_user');
        }

        // Le backend peut renvoyer du HTML en cas d'erreur fatale PHP :
        // produire une erreur lisible avec le statut HTTP dans ce cas
        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            throw new Error('Reponse serveur invalide (HTTP ' + response.status + ')');
        }

        if (!response.ok) {
            throw new Error(data.error || 'Erreur API (HTTP ' + response.status + ')');
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
        },

        async requestPasswordReset(email) {
            return apiRequest('/auth/reset-password.php?action=request', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
        },

        async resetPassword(token, password) {
            return apiRequest('/auth/reset-password.php?action=reset', {
                method: 'POST',
                body: JSON.stringify({ token, password })
            });
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
        },

        // Encaissement enregistre a la main tant qu'aucun prestataire de
        // paiement n'est branche (admin uniquement)
        async updatePaymentStatus(id, paymentStatus) {
            return apiRequest('/orders/index.php', {
                method: 'PUT',
                body: JSON.stringify({ id, payment_status: paymentStatus })
            });
        },

        // trackingCode : optionnel, permet d'identifier une commande invitee cote client
        async addMessage(orderId, content, trackingCode = null) {
            const body = { order_id: orderId, content };
            if (trackingCode) body.tracking_code = trackingCode;
            return apiRequest('/orders/index.php?action=message', {
                method: 'POST',
                body: JSON.stringify(body),
                tokenType: trackingCode ? 'customer' : 'admin'
            });
        },

        async markMessagesRead(orderId, trackingCode = null) {
            const body = { order_id: orderId };
            if (trackingCode) body.tracking_code = trackingCode;
            return apiRequest('/orders/index.php?action=read-messages', {
                method: 'PUT',
                body: JSON.stringify(body),
                tokenType: trackingCode ? 'customer' : 'admin'
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
    },

    // =====================================================
    // INSTAGRAM
    // =====================================================
    instagram: {
        async fetchPost(url) {
            return apiRequest('/instagram/index.php?url=' + encodeURIComponent(url));
        }
    }
};

// Export pour utilisation
window.GreenezAPI = API;
