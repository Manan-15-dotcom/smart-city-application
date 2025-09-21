// CitizenConnect - Shared JavaScript Functions

// Global variables
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
let services = JSON.parse(localStorage.getItem('services')) || [
    {
        id: 1,
        name: 'City General Hospital',
        category: 'healthcare',
        address: '123 Medical District, Downtown',
        phone: '+1-555-0101',
        hours: '24/7 Emergency Services',
        description: 'Full-service hospital with emergency care, surgery, and specialized medical departments. State-of-the-art facilities with experienced medical staff.',
        status: 'operational',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Central Police Station',
        category: 'safety',
        address: '456 Safety Boulevard, City Center',
        phone: '+1-555-0102',
        hours: '24/7',
        description: 'Main police headquarters providing law enforcement, emergency response, and community safety services.',
        status: 'operational',
        rating: 4.2
    },
    {
        id: 3,
        name: 'Downtown Public Library',
        category: 'education',
        address: '789 Knowledge Street, Downtown',
        phone: '+1-555-0103',
        hours: '8:00 AM - 8:00 PM',
        description: 'Modern library with extensive book collection, digital resources, study spaces, and community programs.',
        status: 'operational',
        rating: 4.7
    },
    {
        id: 4,
        name: 'Water Treatment Facility',
        category: 'utilities',
        address: '321 Infrastructure Way, Industrial Zone',
        phone: '+1-555-0104',
        hours: '24/7 Operations',
        description: 'Primary water processing and distribution facility serving the entire metropolitan area.',
        status: 'maintenance',
        rating: 4.0
    },
    {
        id: 5,
        name: 'Metro Bus Terminal',
        category: 'transportation',
        address: '555 Transit Avenue, Transport Hub',
        phone: '+1-555-0105',
        hours: '5:00 AM - 12:00 AM',
        description: 'Central bus terminal connecting all major routes throughout the city and surrounding areas.',
        status: 'operational',
        rating: 3.8
    },
    {
        id: 6,
        name: 'Fire Department Station 1',
        category: 'safety',
        address: '444 Rescue Road, North District',
        phone: '+1-555-0106',
        hours: '24/7 Emergency Response',
        description: 'Primary fire station with emergency medical services, fire suppression, and rescue operations.',
        status: 'operational',
        rating: 4.8
    },
    {
        id: 7,
        name: 'City Elementary School',
        category: 'education',
        address: '777 Learning Lane, Education District',
        phone: '+1-555-0107',
        hours: '7:30 AM - 3:30 PM',
        description: 'Public elementary school providing quality education with modern facilities and qualified teachers.',
        status: 'operational',
        rating: 4.3
    },
    {
        id: 8,
        name: 'Electric Power Substation',
        category: 'utilities',
        address: '999 Power Grid Road, Industrial Zone',
        phone: '+1-555-0108',
        hours: '24/7 Monitoring',
        description: 'Main electrical distribution center ensuring reliable power supply to residential and commercial areas.',
        status: 'operational',
        rating: 4.1
    }
];

// Utility functions
function saveToLocalStorage() {
    localStorage.setItem('services', JSON.stringify(services));
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
}

function getServiceIcon(category) {
    const icons = {
        healthcare: 'hospital',
        safety: 'shield-alt',
        education: 'graduation-cap',
        utilities: 'tools',
        transportation: 'bus'
    };
    return icons[category] || 'building';
}

// Authentication functions
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        isLoggedIn = true;
        saveToLocalStorage();
        alert('Login successful! Welcome, Admin.');
        window.location.href = 'index.html';
    } else {
        alert('Invalid credentials. Please use: admin / admin123');
    }
}

function logout() {
    isLoggedIn = false;
    saveToLocalStorage();
    window.location.href = 'index.html';
}

function checkLoginStatus() {
    const userInfo = document.getElementById('userInfo');
    const loginNav = document.getElementById('loginNav');
    const addServiceNav = document.getElementById('addServiceNav');

    if (isLoggedIn) {
        if (userInfo) userInfo.style.display = 'flex';
        if (loginNav) loginNav.style.display = 'none';
        if (addServiceNav) addServiceNav.style.display = 'block';
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (loginNav) loginNav.style.display = 'block';
        if (addServiceNav) addServiceNav.style.display = 'none';
    }
}

// Service management functions
function renderServices(servicesToRender = services) {
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (!servicesGrid) return;
    
    if (servicesToRender.length === 0) {
        servicesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No services found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        return;
    }

    servicesGrid.innerHTML = servicesToRender.map(service => `
        <div class="service-card">
            <div class="status-badge status-${service.status}">${service.status.replace('-', ' ')}</div>
            <div class="service-header">
                <div class="service-icon ${service.category}">
                    <i class="fas fa-${getServiceIcon(service.category)}"></i>
                </div>
                <div>
                    <div class="service-title">${service.name}</div>
                    <div class="service-category">${service.category.replace('-', ' & ')}</div>
                </div>
            </div>
            <div class="service-description">${service.description}</div>
            <div class="service-details">
                <div class="service-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${service.address}</span>
                </div>
                ${service.phone ? `
                    <div class="service-detail">
                        <i class="fas fa-phone"></i>
                        <span>${service.phone}</span>
                    </div>
                ` : ''}
                <div class="service-detail">
                    <i class="fas fa-clock"></i>
                    <span>${service.hours}</span>
                </div>
            </div>
            ${service.rating ? `
                <div class="rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(service.rating))}${'☆'.repeat(5 - Math.floor(service.rating))}
                    </div>
                    <span>${service.rating.toFixed(1)} rating</span>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function filterServices() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (!searchInput || !categoryFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    let filteredServices = services;

    // Filter by category
    if (category !== 'all') {
        filteredServices = filteredServices.filter(service => service.category === category);
    }

    // Filter by search term
    if (searchTerm) {
        filteredServices = filteredServices.filter(service => 
            service.name.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm) ||
            service.address.toLowerCase().includes(searchTerm)
        );
    }

    renderServices(filteredServices);
}

function addService() {
    if (!isLoggedIn) {
        alert('Please login first to add services.');
        return;
    }

    const name = document.getElementById('serviceName').value;
    const category = document.getElementById('serviceCategory').value;
    const status = document.getElementById('serviceStatus').value;
    const address = document.getElementById('serviceAddress').value;
    const phone = document.getElementById('servicePhone').value;
    const hours = document.getElementById('serviceHours').value;
    const description = document.getElementById('serviceDescription').value;

    // Validation
    if (!name || !category || !address || !description) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create new service
    const newService = {
        id: services.length + 1,
        name: name,
        category: category,
        address: address,
        phone: phone,
        hours: hours || 'Contact for hours',
        description: description,
        status: status,
        rating: 0
    };

    // Add to services array
    services.push(newService);
    saveToLocalStorage();

    // Show success message
    const successAlert = document.getElementById('successAlert');
    if (successAlert) {
        successAlert.style.display = 'block';
        
        // Clear form
        clearAddServiceForm();

        // Hide success message after 3 seconds
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 3000);
    }
}

function clearAddServiceForm() {
    const fields = ['serviceName', 'serviceCategory', 'serviceAddress', 'servicePhone', 'serviceHours', 'serviceDescription'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) field.value = '';
    });
    
    const statusField = document.getElementById('serviceStatus');
    if (statusField) statusField.value = 'operational';
}

// Initialize functions
function initializePage() {
    checkLoginStatus();
    
    // Add event listeners
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterServices);
    }

    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterServices);
    }

    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    }

    // Render services if on services page
    if (document.getElementById('servicesGrid')) {
        renderServices();
    }
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', initializePage);