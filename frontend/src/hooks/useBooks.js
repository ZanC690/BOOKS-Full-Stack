// =========================================================
// Manages book data, loading, errors, and editing state
// =========================================================
import { useState, useEffect } from 'react';
import bookService from '../api/bookService';

const initialFormData = {
    title: '',
    author: '',
    published_year: '',
    is_available: false,
    price: '',
};

// ================================================================================
//                                     REUSABLE
// ================================================================================
const useBooks = () => {
    const[books, setBooks] = useState([]);  // Stores the list of books fetched from the server or updated by user actions (e.g. add/edit/delete)
    const[formData, setFormData] = useState(initialFormData);   // Holds current form input values for creating or editing a book
    const[editingId, setEditingId] = useState(null);    // Tracks which book is being edited (null means not editing)
    const[loading, setLoading] = useState(true);    // Indicates whether data is still loading (to show or hide loading spinner)
    const[error, setError] = useState(null);    // Captures any error messages from fetch or form submissions (to display error UI)
    useEffect( () => {   // Fetch book data once, when the component mounts
        fetchBooks();
    }, [] )

    // ================================================================================
    //                                     REUSABLE
    // ================================================================================ 
    const fetchBooks = async () => {    // Fetches book data from the service and update state accordingly
        setLoading(true);   // Start the loading spinner
        setError(null); // Clear previous errors 
        try {
            const data = await bookService.getBook();   // Fetch books from bookService
            setBooks(data); // Update books state with fetched data
        } catch (error) {
            setError(error);    // Capture and store any error that occurs 
        } finally {
            setLoading(false);  // Stop loading spinner regardless of success / failure
        }
    };

    const handleFormChange = (e) => {       // Function to handle changes in form input fields, also a generic form input handler
        const { name, value, type, checked } = e.target;    // Destructure relevant properties from the event target (the input element)
        setFormData( (prev) => ({   // Update the form data state based on input type
            ...prev,    // Preserve exis ting form data
            [name]: type === 'checkbox' ? checked : value,  // Use 'checked' for checkboxes, 'value' for other inputs
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default action (e.g. page reload)
        setLoading(true);   // Start loading spinner
        setError(null); // Reset previous errors
        try { 
            const bookDataToSend = {    // Prepare bookData by copying formData, and converting year & price into integer
                ...formData,    // Spread operator copies all key-value pairs from formData
                published_year: parseInt(formData.published_year),  // Convert string into integer, since form field returns string
                price: parseFloat(formData.price),  // Convert string into float, since form field returns string
            };

            if (editingId) {    // If editingId exist, update the book. Else create a new book.
                await bookService.updateBook(editingId, bookDataToSend); 
            } else {
                await bookService.createBook(bookDataToSend);
            }
            resetForm();    // Clears form after submission
            await fetchBooks(); //Refreshes the book list
        } catch (error) {
            console.error('Submission error: ', error); // Logs the error
            setError(error);    // Stores error in a state
            alert(`Error ${editingId ? 'updating' : 'adding'} book`);   // Alerts user. If editingId exist, it'll be "Error updating book", else "Error adding book"
        } finally {
            setLoading(false);  // Stops loading spinner regardless of success / failure
        }
    };

    const startEdit = (book) => {
        setEditingId(book.id)   // Set the ID of the book being edited
        setFormData({   // Populate the form fields with the selected book's current data
            title: book.title,  // Set form title field
            author: book.author,    // Set form author field
            published_year: book.published_year,    // Set form published year field
            is_available: book.is_available,    // Set form availability field
            price: book.price,  // Set form price field
        });
    };

    const cancelEdit = () => {  
        setEditingId(null); // Exit edit mode by clearing the current editing ID
        resetForm();    // Clears the form fields
    };

    const deleteBook = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) { // Confirmation before deleting
            setLoading(true);   // Show loading spinner
            setError(null); // Clear previous errors
            try {
                await bookService.deleteBook(id);   // Call API to delete book by ID
                await fetchBooks(); // Refresh book list after deletion
            } catch (error) {
                console.error('Deletion error: ', error);   // Logs the error
                setError(error);    // Stores error in a state
                alert('Error deleting book');   // Alert the user
            } finally {
                setLoading(false);  // Stop loading spinner regardless of success / failure
            }
        }
    };

    const resetForm = () => {
        setFormData(initialFormData); // Reset from field
        setEditingId(null); // Exit edit mode by clearing the current editing ID
    };

    return {
        books,
        formData,
        editingId,
        loading,
        error,
        handleFormChange,
        handleSubmit,
        startEdit,
        cancelEdit,
        deleteBook,
        resetForm,
    };
};

export default useBooks