import { TDAppPermission } from "../../../../database/dapp.permissions";

export interface IManifest {
    name: string
    image: string
    description: string
    email: string
    webpage: string
    version: string
    permissions: TDAppPermission[]
    attributes: IManifestAttribute[]
}

export interface IManifestAttribute {
    trait_type: string
    value: string
}