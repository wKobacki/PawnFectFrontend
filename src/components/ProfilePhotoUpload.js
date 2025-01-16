import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadUserAvatar, getUserInfo } from "../api/userApi";
import "../components/ProfilePhotoUpload.css";

const ProfilePhotoUpload = () => {
    const [show, setShow] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    // Pobierz URL avatara z localStorage
    const avatarUrl = localStorage.getItem("avatar_url");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem("userId");
            console.log("UserID from localStorage:", userId);
            try {
                const info = await getUserInfo(userId);
                setUserInfo(info);
            } catch (err) {
                Swal.fire("Błąd!", "Nie udało się pobrać danych użytkownika.", "error");
            }
        };
        fetchUserInfo();
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire("Błąd!", "Maksymalny rozmiar pliku to 5 MB.", "error");
                return;
            }
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        const userId = localStorage.getItem("userId");
        if (photo) {
            try {
                const response = await uploadUserAvatar(userId, photo);
                Swal.fire({
                    icon: "success",
                    title: "Zdjęcie przesłane!",
                    text: "Twoje zdjęcie zostało pomyślnie zapisane.",
                });
                setShow(false);
                localStorage.setItem("avatar_url", URL.createObjectURL(photo)); // Zaktualizuj avatar w localStorage
                setUserInfo((prevState) => ({
                    ...prevState,
                    avatar_filename: response.data.fileName, // Aktualizuj dane avatara
                }));
                navigate("/dashboard");
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Błąd!",
                    text: err.message,
                });
            }
        }
    };

    const handleClose = () => {
        setShow(false);
        setPhoto(null);
        setPreview(null);
    };

    return (
        <div className="profile-page-container">
            {/* Zdjęcie profilowe */}
            <div className="profile-photo">
                <img
                    src={preview || avatarUrl || `https://via.placeholder.com/150`}
                    alt="Zdjęcie profilowe"
                    className="profile-photo-img"
                />
            </div>

            {/* Informacje o użytkowniku */}
            <div className="profile-info">
                <h2>{userInfo.username || "Username"}</h2> {/* Zaktualizuj na userInfo.username, jeśli odpowiedni klucz */}
                <p>Email: {userInfo.email || "Email"}</p>
            </div>

            {/* Przycisk edycji zdjęcia */}
            <Button variant="primary" onClick={() => setShow(true)} className="edit-photo-btn">
                Zmień zdjęcie profilowe
            </Button>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj zdjęcie profilowe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="upload-container">
                        <input type="file" accept="image/*" onChange={handlePhotoChange} />
                        {photo && <p>Wybrany plik: {photo.name}</p>}
                    </div>
                    {preview && (
                        <div className="preview-container">
                            <img src={preview} alt="Podgląd zdjęcia" className="preview-image" />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zamknij
                    </Button>
                    <Button variant="primary" onClick={handleUpload} disabled={!photo}>
                        Wyślij
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Powrót do dashboardu */}
            <Button variant="secondary" className="back-to-dashboard-btn" onClick={() => navigate("/dashboard")}>
                Powrót do Dashboardu
            </Button>
        </div>
    );
};

export default ProfilePhotoUpload;
