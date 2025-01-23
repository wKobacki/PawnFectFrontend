import { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadUserAvatar, getUserInfo, deleteUser } from "../api/userApi";
import "./ProfilePhotoUpload.css";

const ProfilePhotoUpload = () => {
    const [show, setShow] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const avatarUrl = localStorage.getItem("avatar_url");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem("userId");
            setIsLoading(true);
            try {
                const info = await getUserInfo(userId);
                setUserInfo(info);
            } catch (err) {
                Swal.fire("Błąd!", "Nie udało się pobrać danych użytkownika.", "error");
            } finally {
                setIsLoading(false);
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
            setIsLoading(true);
            try {
                const response = await uploadUserAvatar(userId, photo);
                Swal.fire({
                    icon: "success",
                    title: "Zdjęcie przesłane!",
                    text: "Twoje zdjęcie zostało pomyślnie zapisane.",
                });
                setShow(false);
                localStorage.setItem("avatar_url", URL.createObjectURL(photo));
                setUserInfo((prevState) => ({
                    ...prevState,
                    avatar_filename: response.data.fileName,
                }));
                navigate("/dashboard");
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Błąd!",
                    text: err.message,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDeleteUser = async () => {
        const userId = localStorage.getItem("userId");
        setIsLoading(true);
        try {
            await deleteUser(userId);
            Swal.fire("Sukces!", "Twoje konto zostało usunięte.", "success");
            localStorage.removeItem("userId");
            localStorage.removeItem("avatar_url");
            navigate("/login");
        } catch (err) {
            Swal.fire("Błąd!", "Nie udało się usunąć konta.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setShow(false);
        setPhoto(null);
        setPreview(null);
    };

    return (
        <div className="profile-page-container">
            {isLoading && (
                <div className="loading-overlay">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Ładowanie...</span>
                    </Spinner>
                </div>
            )}

            <div className="profile-buttons">
                <Button variant="primary" onClick={() => navigate("/dashboard")} className="back-to-dashboard-btn">
                    Powrót do dashboardu
                </Button>
                <Button variant="secondary" onClick={() => setShow(true)} className="edit-photo-btn">
                    Zmień zdjęcie profilowe
                </Button>
                <Button variant="secondary" onClick={() => navigate("/update-user-info")} className="edit-info-btn">
                    Zmień informacje o koncie
                </Button>
                <Button variant="danger" onClick={handleDeleteUser} className="delete-user-btn">
                    Usuń konto
                </Button>
            </div>

            <div className="profile-photo">
                <img
                    src={preview || avatarUrl || `https://via.placeholder.com/150`}
                    alt="Zdjęcie profilowe"
                    className="profile-photo-img"
                />
            </div>

            <div className="profile-info">
                <h2>{userInfo.username || "Username"}</h2>
                <p>Email: {userInfo.email || "Email"}</p>
            </div>

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
                    <Button variant="primary" onClick={handleUpload} disabled={!photo || isLoading}>
                        {isLoading ? "Wysyłanie..." : "Wyślij"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfilePhotoUpload;
