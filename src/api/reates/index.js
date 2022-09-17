const SEED = 57259;

export const API = {
    fetchRates: async () => {
        try {
            const response = await fetch(`/currency-conversion?seed=${SEED}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch(error) {
            console.error(error);
        }
    }
};