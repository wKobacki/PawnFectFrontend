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
    const [preview, setPreview] = useState(null);
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
                setPreview(URL.createObjectURL(file));
            }
        }
    });

    const handleUpload = async () => {
        const userId = localStorage.getItem('userId'); // Pobieramy ID użytkownika z localStorage
        if (photo) {
            try {
                const response = await uploadUserAvatar(userId, photo); // Funkcja do wysłania zdjęcia
                Swal.fire({
                    icon: 'success',
                    title: 'Zdjęcie przesłane!',
                    text: 'Twoje zdjęcie zostało pomyślnie zapisane.',
                });
                setShow(false); // Zamykamy modal po udanym przesłaniu
                navigate('/dashboard');
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd!',
                    text: err.message,
                });
            }
        }
    };

    const handleClose = () => {
        setShow(false);
        setPhoto(null);
        setPreview(null); // Czyścimy podgląd
        navigate('/dashboard');
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
            <Modal show={show} onHide={() => handleClose} centered>
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
                    {preview && (
                        <div className="preview-container">
                        <img src={preview} alt="Podgląd zdjęcia" className="preview-image" />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
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
