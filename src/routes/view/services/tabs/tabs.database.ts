export interface ITab {
    title: string
    subtitle: string
    path: string
    theme: 'light' | 'dark'
    background: string
    show: boolean
    backable: boolean
}

export const Tabs: ITab[] = [
    {
        title: '',
        subtitle: '',
        path: '/dapp/nft/',
        theme: 'dark',
        background: '#00e676',
        show: false,
        backable: true
    },
    {
        title: 'Overview',
        subtitle: 'Every developer need to know',
        path: '/overview',
        theme: 'light',
        background: '#2979ff',
        show: true,
        backable: false
    },
    {
        title: 'DApp',
        subtitle: 'List of DApps on Phone in Townland',
        path: '/dapp',
        theme: 'dark',
        background: '#00e676',
        show: true,
        backable: false
    },
    {
        title: 'DApp Create',
        subtitle: 'Create a new DApp on Phone in Townland',
        path: '/dapp/create',
        theme: 'dark',
        background: '#00e676',
        show: false,
        backable: true
    },
    {
        title: 'IPFS',
        subtitle: 'The InterPlanetary File System',
        path: '/ipfs',
        theme: 'dark',
        background: '#ffc107',
        show: true,
        backable: false
    }
]