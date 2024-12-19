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
        animal.date_of_birth = animal.date_of_birth.split('T')[0];
        animal.image = animal.avatar_filename != null ? `${apiClient.defaults.baseURL}/pets/avatars/${animal.avatar_filename}` : null;
        animal.shared.map((u) => {
            u.image = u.avatar_filename != null ? `${apiClient.defaults.baseURL}/users/avatars/${u.avatar_filename}` : null;
            return u;
        })
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
        const formatToPostgresTimestamp = (dateInput) => {
            const date = new Date(dateInput);
            const offset = -date.getTimezoneOffset();  // różnica w minutach od UTC
            const sign = offset >= 0 ? "+" : "-";
            const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(1, "0");
            const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
        
            const formattedDate = date.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"
            return `${formattedDate}${sign}${hours}:${minutes}`.replace('T', ' ');
        }
        const visitDate = formatToPostgresTimestamp(visitData.visitDate);
        console.log(visitDate)
        const requestData = {
            visitDate, // Format: 'YYYY-MM-DD HH:MM:SS'
            visitDescription: visitData.visitDescription, // Opis wizyty
            visitType: visitData.visitType // Typ wizyty (zmiana nazwy z visitReason na visitType)
        };

        console.log("Dane wysyłane do API:", requestData);

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
export const removePetVisit = async (visitId) => {
    if (!visitId) {
        console.error('Brak petId do addPetVisit');
        throw new Error('petId jest wymagany');
    }
    try{
        await apiClient.delete(`/pets/visits/${visitId}`);
    } catch (error){
        console.error(`Blad usuwania wizyty: ${visitId}`, error);
    }
}

export const sharePetAccess = async (petId, username, accessLevel) => {
    if(!petId || !username || !accessLevel){
        console.error('Brak parametrow do sharepetaccess');
        throw new Error('wszystkie parametry sa wymagane');
    }
    try{
        const response = await apiClient.post(`pets/${petId}/access`, {username, accessLevel});
        console.log(response.data);
    } catch(error) {
        console.error(`Blad wspoldzielenia zwierzaak: ${petId}`, error);
    }
}

export const revokePetAccess = async (petId, userid) => {
    if(!petId || !userid){
        console.error('Brak parametrow do revokepetaccess');
        throw new Error('wszystkie parametry sa wymagane');
    }
    
    try{
        const response = await apiClient.delete(`pets/${petId}/access/${userid}`);
        console.log(response);
    } catch (error){
        console.error(`Blad wspoldzielenia zwierzaak: ${petId}`, error);
    }
}

export const updatePet = async (petId, updatedData) => {
    if (!petId) {
        console.error('Brak petId do updatePet');
        throw new Error('petId jest wymagany');
    }

    if (Object.keys(updatedData).length === 0) {
        console.error("Brak danych do zaktualizowania.");
        throw new Error("Brak danych do zaktualizowania.");
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error("Brak tokenu dostępu");
        throw new Error("Brak tokenu dostępu");
    }

    try {
        updatedData.dateOfBirth = updatedData.dateOfBirth.split('T')[0];
        const response = await apiClient.patch(`/pets/${petId}`, updatedData, {
            headers: {
                'Authorization': `Bearer ${accessToken}` 
            }
        });

        if (!response || !response.data) {
            throw new Error("Niepoprawna odpowiedź serwera.");
        }

        console.log("Zaktualizowano dane zwierzaka. Odpowiedź serwera:", response.data);
        return response.data;

    } catch (error) {
        if (error.response) {
            console.error("Błąd w updatePet - odpowiedź serwera:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });

            if (error.response.status === 403) {
                throw new Error("Brak uprawnień do edytowania danych zwierzaka.");
            }

        } else {
            console.error("Błąd w updatePet - klient:", error.message);
        }

        throw new Error(
            error.response
                ? error.response.data.message || "Nieznany błąd serwera."
                : "Błąd podczas aktualizacji danych zwierzaka po stronie klienta."
        );
    }
};