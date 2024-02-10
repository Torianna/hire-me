import {useMutation, useQueryClient} from "@tanstack/react-query";
import dayjs from "dayjs";

export const useChildrenMutations = () => {
    const queryClient = useQueryClient()

    const checkIn = useMutation({ mutationFn: async (childId)=>{
            const response = await fetch(`https://app.famly.co/api/v2/children/${childId}/checkins?` + new URLSearchParams({
                accessToken: '1127a03c-ed76-41d5-9058-f9ca105c41cf',
                pickupTime: dayjs().add(2, 'hours').format('HH:mm')
            }) ,{
                method: "POST"
            });
            return await response.json();
        },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['childrenList']})
    })

    const checkOut = useMutation({ mutationFn: async (childId)=>{
            const response = await fetch(`https://app.famly.co/api/v2/children/${childId}/checkout?` + new URLSearchParams({
                accessToken: '1127a03c-ed76-41d5-9058-f9ca105c41cf',
            }) ,{
                method: "POST"
            });
            return await response.json();
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['childrenList']})})

    return {
        checkIn,
        checkOut
    }
}