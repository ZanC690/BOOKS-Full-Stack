// =========================================================
// Handles all direct API calls for books
// =========================================================
import axios from 'axios';

const API_URL = "http://localhost:8000"

// =========================================================
// GET Request
// =========================================================
const bookService = {
    getBook: async () => {
        try {
            const response = await axios.get(`${API_URL}/books`);
            return response.data;
        } catch (error) {
            console.error('Error fetching books.', error)
            throw error;
        }
    },

// =========================================================
// POST Request
// =========================================================
    createBook: async (bookData) => {
        try {
            const response = await axios.post(`${API_URL}/books`, bookData);
            return response.data;
        } catch (error) {
            console.error(`Error creating book.`, error)
            throw error;
        }
    },

// =========================================================
// PUT Request
// =========================================================
    updateBook: async (id, bookData) => {
        try {
            const response = await axios.put(`${API_URL}/books/${id}`, bookData);
            return response.data
        } catch (error) {
            console.error('Error updating book.', error)
            throw error;
        }
    },

// =========================================================
// DELETE Request
// =========================================================
    deleteBook: async (id) => {
        try {
            await axios.delete(`${API_URL}/books/${id}`);
        } catch (error) {
            console.error('Error deleting book.', error)
            throw error;
        }
    },
};

export default bookService;
