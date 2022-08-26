export const API = {
    fetchRates: async () => {
        try {
            const response = await fetch('/currency-conversion?seed=96315', {
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