import {useMutation} from "@tanstack/react-query";

export const useChildrenMutations = () => {
    const checkIn = useMutation({ mutationFn: async (childId)=>{
            const response = await fetch(`https://app.famly.co/api/v2/children/${childId}/checkins` + new URLSearchParams({
                accessToken: '1127a03c-ed76-41d5-9058-f9ca105c41cf',
                pickupTime: '16:00'
            }) ,{
                method: "POST"
            });
            return await response.json();
        } })

    const checkOut = useMutation({ mutationFn: async (childId)=>{
            const response = await fetch(`https://app.famly.co/api/v2/children/${childId}/checkout` + new URLSearchParams({
                accessToken: '1127a03c-ed76-41d5-9058-f9ca105c41cf',
            }) ,{
                method: "POST"
            });
            return await response.json();
        } })

    return {
        checkIn,
        checkOut
    }
}