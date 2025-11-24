// =========================================================
// Renders the list of books
// =========================================================
import React from 'react';

function BookList({ books, onEdit, onDelete, loading, error }) {
    if (loading) return <p>Loading book...</p>;
    if (error) return <p>Error loading book: {error.message}</p>;
    if (books.length === 0) return <p>No book found.</p>

    return (
        <div>
            <h2>Book List</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Availability</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map( (book) => (
                            <tr key={book.id}>
                                <td className="td-title" title={book.title}>
                                    {book.title}
                                </td>
                                <td title={book.author}>
                                    {book.author}
                                </td>
                                <td className='td-published-year'>
                                    {book.published_year}
                                </td>
                                <td title={book.is_available}>
                                    {book.is_available ? 'Yes' : 'No'}
                                </td>
                                <td title={book.price}>
                                    {book.price}
                                </td>
                                <td>
                                    <button className="edit-button" onClick={() => onEdit(book)}>
                                        Edit
                                    </button>
                                    <button className="delete-button" onClick={() => onDelete(book.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

export default BookList;