import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { uploadUserAvatar } from '../api/userApi';
import Swal from 'sweetalert2';
import "../styles/Dashboard.css";

function Dashboard() {
    const [photo, setPhoto] = useState(null); // Zdjęcie do przesłania
    const [show, setShow] = useState(false); // Kontrola widoczności modalu

    // Hook Dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*', // Akceptujemy tylko obrazy
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0]; // Wybieramy pierwszy plik
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // Sprawdzamy rozmiar pliku
                    Swal.fire('Błąd!', 'Maksymalny rozmiar pliku to 5 MB.', 'error');
                    return;
                }
                setPhoto(file); // Ustawiamy wybrane zdjęcie
            }
        }
    });

    const handleUpload = async () => {
        const userId = localStorage.getItem('userId'); 
        if (photo) {
            try {
                await uploadUserAvatar(userId, photo);
                Swal.fire({
                    icon: 'success',
                    title: 'Zdjęcie przesłane!',
                    text: 'Twoje zdjęcie zostało pomyślnie zapisane.',
                });
                setShow(false); 
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd!',
                    text: err.message,
                });
            }
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Panel główny</h2>
            <p>Witaj w aplikacji</p>

            {/* Przycisk do otwierania modalu */}
            <Button variant="primary" onClick={() => setShow(true)}>
                Dodaj zdjęcie profilowe
            </Button>

            {/* Modal z formularzem przesyłania zdjęcia */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj zdjęcie profilowe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* React Dropzone */}
                    <div {...getRootProps()} className="dropzone-container">
                        <input {...getInputProps()} />
                        <p>Przeciągnij i upuść plik, lub kliknij, aby wybrać zdjęcie.</p>
                        {photo && <p>Wybrany plik: {photo.name}</p>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Zamknij
                    </Button>
                    <Button variant="primary" onClick={handleUpload} disabled={!photo}>
                        Wyślij
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Dashboard;
