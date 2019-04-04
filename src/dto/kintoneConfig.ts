type AuthType = 'BasicAuthen' | 'APIToken' | 'UsernamePassword'
type Command = 'import' | 'export'
type Encoding = 'utf-8' | 'utf-16' | 'utf-16be-with-signature' | 'utf-16le-with-signature' | 'sjis' | 'euc-jp'
type OutputFormat = 'csv' | 'json'

interface KintoneConfig {
    domainName: string
    appID: string
    authenType: AuthType
    username?: string
    password?: string
    apiToken?: string
    guestSpaceID: string
    outputFormat?: OutputFormat
    encoding?: Encoding
    basicAuthUsername?: string
    basicAuthPassword?: string
    queryString?: string
    fieldsToExport?: string
    inputFilePath?: string
    attachFileDirectory?: string
    deleteRecordsBeforeInsert?: boolean
    indexPosition?: string
    command: Command
    headers?: object
}

export {KintoneConfig, AuthType, Command, Encoding, OutputFormat}