export interface IManifest {
    name: string
    image: string
    description: string
    external_url: string
    attributes: IManifestAttribute[]
}

export interface IManifestAttribute {
    trait_type: string
    value: string
}