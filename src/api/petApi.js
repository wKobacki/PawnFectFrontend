import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3300/api/v1";

// Funkcja do tworzenia nowego zwierzęcia
export const createNewPet = async (petData, token) => {
    if (!token) {
        throw new Error("Brak tokena uwierzytelniającego!");
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/pets`, 
            {
                gender: petData.gender,
                dateOfBirth: petData.dateOfBirth,
                description: petData.description,
                name: petData.name,
                userId: petData.userId 
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                withCredentials: true, 
            }
        );
        console.log("Zwierzę dodane:", response.data);
        return response.data;
    } catch (error) {
        console.error("Błąd w createNewPet:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : "Błąd podczas dodawania zwierzęcia.");
    }
};

// Funkcja do pobierania listy zwierząt 
export const getPets = async (userId, token) => {
    try {
        const response = await fetch(`${BASE_URL}/pets?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();  
            throw new Error(`Błąd: ${response.status} - ${errorDetails}`);
        }

        const pets = await response.json();
        return pets;
    } catch (error) {
        console.error("Błąd podczas pobierania zwierząt: ", error.message);
        throw error;
    }
};

export const getAnimalDetails = async (animalId) => {
    try {
        const response = await fetch(`${BASE_URL}/pets/${animalId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        console.log("Odpowiedź serwera:", response);

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error("Błąd odpowiedzi:", errorDetails);
            throw new Error(`Błąd: ${response.status} - ${errorDetails}`);
        }

        // Sprawdzamy, czy odpowiedź jest w formacie JSON
        if (response.headers.get("content-type")?.includes("application/json")) {
            const animal = await response.json();
            return animal;
        } else {
            throw new Error("Odpowiedź serwera nie jest w formacie JSON.");
        }

    } catch (error) {
        console.error("Błąd podczas pobierania szczegółów zwierzęcia:", error.message);
        throw error;
    }
};