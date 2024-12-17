import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { uploadPetAvatar } from '../api/petApi'; 
import '../styles/ProfilePhotoUpload.css'; 
import { useAnimal } from '../context/AnimalContext';

const AnimalPhotoUpload = () => {
    const { selectedAnimal, triggerRefresh, animals } = useAnimal();
    const [photo, setPhoto] = useState(null);  // Stan wybranego zdjęcia
    const [preview, setPreview] = useState(null);
    const containerRef = useRef();
    // Hook Dropzone

    useEffect(() => {
        handleClose();
    }, [selectedAnimal])

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
        if (photo) {
            try {
                await uploadPetAvatar(selectedAnimal, photo); // Funkcja do wysłania zdjęcia
                Swal.fire({
                    icon: 'success',
                    title: 'Zdjęcie przesłane!',
                    text: 'Twoje zdjęcie zostało pomyślnie zapisane.',
                });
                handleClose();
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
        setPhoto(null);
        setPreview(null); 
        triggerRefresh();
    };
    
    const animal = animals.find((a) => a.id === selectedAnimal);
    const animalImg = animal.image ? animal.image : "https://placehold.co/200"

    return (
        <div ref={containerRef} className="profile-photo-container">
            <Modal 
                show={true} 
                container={containerRef.current}
                scrollable
                enforceFocus={false}
            >
                <Modal.Header>
                    <Modal.Title>Dodaj zdjęcie profilowe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div {...getRootProps()} className="dropzone-container">
                        <input {...getInputProps()} />
                        <p>Przeciągnij i upuść plik, lub kliknij, aby wybrać zdjęcie.</p>
                        {photo && <p>Wybrany plik: {photo.name}</p>}
                    </div>
                    {preview && (
                        <div className="preview-container">
                        <img src={animalImg} alt="Stare zdjecie" className='preview-image old-img'/>
                        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
                        </svg>
                        <img src={preview} alt="Podgląd zdjęcia" className="preview-image new-img"/>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpload} disabled={!photo}>
                        Wyślij
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AnimalPhotoUpload;
