import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom'; // Importujemy hook useNavigate
import Swal from 'sweetalert2';
import { uploadUserAvatar } from '../api/userApi'; 
import '../styles/ProfilePhotoUpload.css'; 

const ProfilePhotoUpload = () => {
    const [show, setShow] = useState(false);  // Stan modalu
    const [photo, setPhoto] = useState(null);  // Stan wybranego zdjęcia

    const navigate = useNavigate(); // Hook do nawigacji

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
        const userId = localStorage.getItem('userId'); // Pobieramy ID użytkownika z localStorage
        if (photo) {
            try {
                await uploadUserAvatar(userId, photo); // Funkcja do wysłania zdjęcia
                Swal.fire({
                    icon: 'success',
                    title: 'Zdjęcie przesłane!',
                    text: 'Twoje zdjęcie zostało pomyślnie zapisane.',
                });
                setShow(false); // Zamykamy modal po udanym przesłaniu
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd!',
                    text: err.message,
                });
            }
        }
    };

    // Funkcja do przekierowania do dashboardu
    const handleGoToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="profile-photo-container">
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

            {/* Nowy przycisk do powrotu do dashboardu */}
            <Button variant="secondary" className="back-to-dashboard-btn" onClick={handleGoToDashboard}>
                Powrót do Dashboardu
            </Button>
        </div>
    );
};

export default ProfilePhotoUpload;
