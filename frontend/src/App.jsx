import bookService from './api/bookService';
import useBooks from './hooks/useBooks';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css'

function App() {
  {/* Call custom hook to get all states and functions */}
  const {
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
  } = useBooks();

  return (
    <>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        marginTop: '10px',
        }}
      >
          Book Management System
      </h2>
      <div className="book-management-system">

        <div>

        </div>
        {/* Use BookForm component here */}
        <div className='card'>
          {/* BookForm component handles its own title based on isEditing prop */}
          <BookForm 
            formData={formData}
            handleChange={handleFormChange} // Pass generic handler from useBooks
            handleSubmit={handleSubmit}
            isEditing={!!editingId} // Convert editingID (null or ID) to boolean
            onCancelEdit={cancelEdit}
            loading={loading}
          />
        </div>

        {/* Use BookList component here */}
        <div className="table-card">
          {/* BookList component handles its own title and loading/error/empty states */}
          <BookList 
            books={books}
            onEdit={startEdit} // Pass the startEdit function from useBooks
            onDelete={deleteBook} // Pass the deleteBook function from useBooks
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </>
  );
}

export default App;