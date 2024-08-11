import React, { useState } from 'react';

const YourComponent = () => {
  const [data, setData] = useState([]); // array of your data objects
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleUpdateClick = (id) => {
    setSelectedItemId(id);
  };

  const updateData = async (updatedValue) => {
    try {
      const response = await fetch(`http://localhost:4700/book/updatebooks/${selectedItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValue),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const updatedBook = await response.json();

      setData((prevData) =>
        prevData.map((item) => (item.id === selectedItemId ? updatedBook : item))
      );
      setSelectedItemId(null);
    } catch (error) {
      console.error('Error updating book:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div>
      {/* Display your data and update button */}
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          {/* Display other item details */}
          <button onClick={() => handleUpdateClick(item.id)}>Update</button>
        </div>
      ))}

      {/* Update form for the selected item */}
      {selectedItemId && (
        <div>
          <h2>Update Form</h2>
          {/* Your update form with fields for the selected item */}
          <button onClick={() => updateData(/* pass updated values */)}>Submit Update</button>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
