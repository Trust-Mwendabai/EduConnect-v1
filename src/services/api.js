const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Users
    async getUsers(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/users${queryString ? '?' + queryString : ''}`);
    }

    async getUser(id) {
        return this.request(`/users?id=${id}`);
    }

    async createUser(userData) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async updateUser(id, userData) {
        return this.request(`/users?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async deleteUser(id) {
        return this.request(`/users?id=${id}`, {
            method: 'DELETE',
        });
    }

    // Courses
    async getCourses(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/courses${queryString ? '?' + queryString : ''}`);
    }

    async getCourse(id) {
        return this.request(`/courses?id=${id}`);
    }

    async createCourse(courseData) {
        return this.request('/courses', {
            method: 'POST',
            body: JSON.stringify(courseData),
        });
    }

    async updateCourse(id, courseData) {
        return this.request(`/courses?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(courseData),
        });
    }

    async deleteCourse(id) {
        return this.request(`/courses?id=${id}`, {
            method: 'DELETE',
        });
    }

    // Payments
    async getPayments(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/payments${queryString ? '?' + queryString : ''}`);
    }

    async getPayment(id) {
        return this.request(`/payments?id=${id}`);
    }

    async createPayment(paymentData) {
        return this.request('/payments', {
            method: 'POST',
            body: JSON.stringify(paymentData),
        });
    }

    async updatePayment(id, paymentData) {
        return this.request(`/payments?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(paymentData),
        });
    }

    // Messages
    async getMessages(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/messages${queryString ? '?' + queryString : ''}`);
    }

    async getMessage(id) {
        return this.request(`/messages?id=${id}`);
    }

    async createMessage(messageData) {
        return this.request('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData),
        });
    }

    async updateMessage(id, messageData) {
        return this.request(`/messages?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(messageData),
        });
    }

    async deleteMessage(id) {
        return this.request(`/messages?id=${id}`, {
            method: 'DELETE',
        });
    }

    // Vendors
    async getVendors(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/vendors${queryString ? '?' + queryString : ''}`);
    }

    async getVendor(id) {
        return this.request(`/vendors?id=${id}`);
    }

    async createVendor(vendorData) {
        return this.request('/vendors', {
            method: 'POST',
            body: JSON.stringify(vendorData),
        });
    }

    async updateVendor(id, vendorData) {
        return this.request(`/vendors?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(vendorData),
        });
    }

    async deleteVendor(id) {
        return this.request(`/vendors?id=${id}`, {
            method: 'DELETE',
        });
    }
}

export default new ApiService();
