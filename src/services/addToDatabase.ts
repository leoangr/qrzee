export const addToDatabase = async (
    qrdata: string,
    trimmedValue: string
) => {

    try {
        const endpoint = process.env.NEXT_PUBLIC_API_URL
        const userResponse = await fetch(`${endpoint}/api/auth/me`, {
            method: 'GET',
            credentials: 'include'
        })

        if (userResponse.status !== 200) {
            console.error('Failed to fetch user data');
            return { success: false };
        }

        const data = await userResponse.json()

        const addQrResponse = await fetch(`${endpoint}/api/add-qr`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                iduser: data.user.id_user,
                qrdata: qrdata,
                qrvalue: trimmedValue
            })
        })
        const result = await addQrResponse.json();
        return { success: true, data: result };

    } catch (error) {
        console.error(error)
    }
}