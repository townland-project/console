import { TEvent } from '@townland-project/app/src/interface'

export type TDAppPermission = TEvent[]

export interface IDAppPermission {
    group: string
    items: TDAppPermission
}

export const DAppPermissions: IDAppPermission[] = [
    {
        group: 'App',
        items: [
            'app:back', 'app:close', 'app:ready',
        ]
    },
    {
        group: 'Character',
        items: [
            'character', 'character:change', 'character:set'
        ]
    },
    {
        group: 'Notification',
        items: [
            'notification:push'
        ]
    },
    {
        group: 'Phone',
        items: [
            'phone:brightness', 'phone:brightness:set',
            'phone:sound:mode', 'phone:sound:mode:set',
            'phone:sound:notification', 'phone:sound:notification:set',
            'phone:sound:ring', 'phone:sound:ring:set',
            'phone:theme', 'phone:theme:set',
            'phone:theme:status', 'phone:theme:status:set',
            'phone:vibrate',
            'phone:vibration', 'phone:vibration:set',
            'phone:wallpaper', 'phone:wallpaper:set'
        ]
    }
]

export let AllDAppPermissions: TDAppPermission = [];

for (let item of DAppPermissions) AllDAppPermissions.push(...item.items)