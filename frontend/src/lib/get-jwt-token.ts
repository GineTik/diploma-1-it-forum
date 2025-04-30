export const getAuthHeaders = (token?: string | null) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}