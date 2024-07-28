// TransactionModal.js
import React, { useState } from 'react';
import './TransactionModal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const TransactionModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        type: 'Credit',
        amount: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault()
        if (!formData.amount || !formData.description) {
            // If required fields are missing, show an error message or alert
            alert("Please fill out all required fields.");
            return;
        }
        // Trigger the save callback
        onSave(formData);
        onClose(); // Close modal after saving
    };

    const handleCancel = () => {
        onClose(); // Close modal without saving
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={handleCancel}>&times;</span>
                <h2>New Transaction</h2>
                <form className='form'>
                    <label htmlFor="type">Transaction Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>

                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder='Enter Amount'
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Enter Transaction Description'
                        required
                    />

                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="btn save-btn"
                            onClick={handleSave}
                        >
                            <i className="fa fa-save"></i> Save
                        </button>
                        <button
                            type="button"
                            className="btn cancel-btn"
                            onClick={handleCancel}
                        >
                            <i className="fa fa-times"></i> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
