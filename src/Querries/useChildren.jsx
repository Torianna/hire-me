import {useQuery} from "@tanstack/react-query";

export const useChildren = () => useQuery({ queryKey: ['childrenList'], queryFn: async()=>{
            const response = await fetch("https://app.famly.co/api/daycare/tablet/group?" + new URLSearchParams({
                accessToken: '1127a03c-ed76-41d5-9058-f9ca105c41cf',
                groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
                institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
            }) ,{
                method: "GET"
            });
            return await response.json();
        } })