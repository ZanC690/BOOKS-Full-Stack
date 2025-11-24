// =========================================================
// Renders the form for adding/editing a book
// =========================================================
import React from 'react';

function BookForm({ formData, handleChange, handleSubmit, isEditing, onCancelEdit, loading }) {
    return (
        <form className="submit-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
            <div>
                <label className="form-label">Title</label>
                <input className="form-input" type="text" name="title" value={formData.title} onChange={handleChange} required/>
            </div>
            
            <div>
                <label className="form-label">Author</label>
                <input className="form-input" type="text" name="author" value={formData.author} onChange={handleChange} required/>
            </div>

            <div>
                <label className="form-label">Published Year</label>
                <input className="form-input" type="number" name="published_year" value={formData.published_year} onChange={handleChange} required/>
            </div>

            <div>
                <label className="form-label">Available</label>
                <input className="form-input" type="checkbox" name="is_available" value={formData.is_available} onChange={handleChange} required/>
            </div>

            <div>
                <label className="form-label">Price</label>
                <input className="form-input" type="number" name="price" value={formData.price} onChange={handleChange} required/>
            </div>

            <div className="form-add-edit>">
                <button className="button" type="submit" disabled={loading}>
                    {isEditing ? 'Update Book' : 'Add Book'}
                </button>

                {isEditing && (
                    <button className="button" type="button" onClick={onCancelEdit} disabled={loading}>
                        Cancel Edit
                    </button>
                )}
            </div>
        </form>
    );
}

export default BookForm;