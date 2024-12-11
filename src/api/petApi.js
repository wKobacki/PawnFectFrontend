import apiClient from "./apiClient";

// Funkcja do tworzenia nowego zwierzęcia z debugowaniem
export const createNewPet = async (petData) => {
    try {
        const response = await apiClient.post('/pets', {
            gender: petData.gender,
            dateOfBirth: petData.dateOfBirth,
            description: petData.description,
            name: petData.name,
            userId: petData.userId,
            feeding: petData.feeding
        });
        console.log("Zwierzę dodane. Odpowiedź serwera:", response?.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Błąd w createNewPet - odpowiedź serwera:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else {
            console.error("Błąd w createNewPet - klient:", error.message);
        }

        throw new Error(
            error.response
                ? error.response.data.message || "Nieznany błąd serwera."
                : "Błąd podczas dodawania zwierzęcia po stronie klienta."
        );
    }
};

// Funkcja do pobierania listy zwierząt 
export const getPets = async (userId) => {
    if (!userId) {
        console.error('Brak userId do getPets');
        throw new Error('userid jest wymagany');
    }
    try {
        const response = await apiClient.get(`/pets?userid=${userId}`);
        const pets = await response.data;
        pets?.map(element => {
            element.image = element.avatar_filename != null ? `${apiClient.defaults.baseURL}/pets/avatars/${element.avatar_filename}` : null;
            return element;
        });
        return pets;
    } catch (error) {
        console.error("Błąd podczas pobierania zwierząt: ", error.message);
        throw new Error('Blad podczas pobierania zwierzat.');
    }
};

// fun pobierajaca dane konkretnego zwierzaka
export const getAnimalDetails = async (animalId) => {
    if (!animalId) {
        console.error('Brak petid do getanimaldetails');
        throw new Error('animalid jest wymagany');
    }
    try {
        const response = await apiClient.get(`/pets/${animalId}`);
        const animal = response.data;
        animal.image = animal.avatar_filename != null ? `${apiClient.defaults.baseURL}/pets/avatars/${animal.avatar_filename}` : null;
        return animal;
    } catch (error) {
        console.error("Błąd podczas pobierania szczegółów zwierzęcia:", error.message);
        throw new Error('blad podczas pobierania szczegolow zwierzaka');
    }
};


//usuwanie zwierzaka
export const deleteAnimal = async (animalId) => {
    try {
        if (!animalId) {
            console.error('Brak petid do getanimaldetails');
            throw new Error('animalid jest wymagany');
        }
        await apiClient.delete(`pets/${animalId}`);
    } catch (error) {
        console.error('Blad podczas usuwania zwierzaka', error.message);
        throw new Error('blad poczas usuwania zwierzaka');
    }
};

//dod zdjecia
export const uploadPetAvatar = async (petId, photo) => {
    if (!petId) {
        console.error('Brak petid do getanimaldetails');
        throw new Error('animalid jest wymagany');
    }
    try {
        const formData = new FormData();
        formData.append('image', photo);
        const response = await apiClient.post(`/pets/${petId}/avatar`, formData);
        // const avatarUrl = `${apiClient.defaults.baseURL}/pets/avatars/${response.data.fileName}`;
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Błąd przesyłania zdjęcia.');
    }
};

// Funkcja do dodawania wizyty dla zwierzaka
export const addPetVisit = async (petId, visitData) => {
    if (!petId) {
        console.error('Brak petId do addPetVisit');
        throw new Error('petId jest wymagany');
    }
    try {
        // Konwertowanie daty na format 'YYYY-MM-DD HH:MM:SS'
        const visitDate = new Date(visitData.visitDate).toISOString().slice(0, 19).replace('T', ' ');

        // Przygotowanie danych do wysłania
        const requestData = {
            visitDate, // Format: 'YYYY-MM-DD HH:MM:SS'
            visitDescription: visitData.visitDescription, // Opis wizyty
            visitType: visitData.visitType || null // Typ wizyty (zmiana nazwy z visitReason na visitType)
        };

        console.log("Dane wysyłane do API:", requestData);

        // Wysyłanie danych do API
        const response = await apiClient.post(`/pets/${petId}/visits`, requestData);

        if (!response || !response.data) {
            console.error("Pusta odpowiedź z serwera");
            throw new Error("Nie otrzymano danych z serwera.");
        }

        console.log("Wizyta dodana. Odpowiedź serwera:", response.data);
        return response.data;
    } catch (error) {
        // Obsługa błędów
        if (error.response) {
            console.error("Błąd:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else {
            console.error("Błąd:", error.message);
        }

        throw new Error(
            error.response
                ? error.response.data.message || "Nieznany błąd serwera."
                : "Błąd podczas dodawania wizyty po stronie klienta."
        );
    }
};
