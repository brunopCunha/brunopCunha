// script.js
let currentPage = 1;
const imagesPerPage = 25;
let totalImages = 0;
const galleryGrid = document.getElementById('gallery-grid');
const loadingDiv = document.getElementById('loading');

// Function to fetch the list of images from the GitHub API
async function fetchImages() {
    const repoOwner = 'your-github-username'; // Replace with your GitHub username
    const repoName = 'your-repo-name'; // Replace with your repository name
    const imagesFolderPath = 'images'; // Path to the images folder in your repo

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${imagesFolderPath}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imageFiles = data
            .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file.name)) // Filter image files
            .map(file => file.name); // Extract filenames
        return imageFiles;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

// Function to load images for a specific page
function loadImages(page, images) {
    galleryGrid.innerHTML = ''; // Clear the gallery grid
    const startIndex = (page - 1) * imagesPerPage;
    const endIndex = Math.min(startIndex + imagesPerPage, images.length);

    for (let i = startIndex; i < endIndex; i++) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = `images/${images[i]}`; // Use the image path from the GitHub API
        img.alt = `Project ${i + 1}`;
        img.loading = 'lazy'; // Enable lazy loading

        const description = document.createElement('p');
        description.textContent = `Project ${i + 1} Description`;

        galleryItem.appendChild(img);
        galleryItem.appendChild(description);
        galleryGrid.appendChild(galleryItem);
    }
}

// Function to create pagination buttons
function createPagination(totalPages) {
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            loadImages(currentPage, images);
            updateActiveButton(button);
        });

        if (i === 1) {
            button.classList.add('active'); // Highlight the first button initially
        }

        paginationDiv.appendChild(button);
    }

    // Add pagination buttons below the gallery
    galleryGrid.insertAdjacentElement('afterend', paginationDiv);
}

// Function to update the active pagination button
function updateActiveButton(activeButton) {
    const buttons = document.querySelectorAll('.pagination button');
    buttons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

// Initialize the gallery
async function initGallery() {
    const images = await fetchImages();
    totalImages = images.length;
    const totalPages = Math.ceil(totalImages / imagesPerPage);

    loadImages(currentPage, images);
    createPagination(totalPages);
}

// Start the gallery
initGallery();