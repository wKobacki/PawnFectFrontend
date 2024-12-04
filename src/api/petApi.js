import apiClient from "./apiClient";

// Funkcja do tworzenia nowego zwierzęcia
export const createNewPet = async (petData) => {
    try {
        const response = await apiClient.post('/pets', {
            gender: petData.gender,
            dateOfBirth: petData.dateOfBirth,
            description: petData.description,
            name: petData.name,
            userId: petData.userId 
        });
        console.log("Zwierzę dodane:", response?.data);
        return response.data;
    } catch (error) {
        console.error("Błąd w createNewPet:", error);
        throw new Error(error.response ? error.response.data.message : "Błąd podczas dodawania zwierzęcia.");
    }
};

// Funkcja do pobierania listy zwierząt 
export const getPets = async (userId) => {
    if(!userId){
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

export const getAnimalDetails = async (animalId) => {
    try {
        const response = await apiClient.get(`/pets/${animalId}`);

        console.log("Odpowiedź serwera:", response);
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania szczegółów zwierzęcia:", error.message);
        throw new Error('blad podczas pobierania szczegolow zwierzaka');
    }
};