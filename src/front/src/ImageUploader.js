import React, { useState, useEffect } from 'react';

function ImageUploader() {
    const [image, setImage] = useState(localStorage.getItem('recent-image') || null);

    useEffect(() => {
        return () => {
            localStorage.removeItem('recent-image');
        };
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            localStorage.setItem('recent-image', reader.result);
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <label htmlFor="file-upload" style={{cursor: "pointer", backgroundColor: "blue", color: "white", padding: "10px"}}>
                변경하기
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{display: "none"}} />
            {image && (
                <div>
                    <h3>Preview:</h3>
                    <img src={image} alt="Preview" />
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
