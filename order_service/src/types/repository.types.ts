type Create = (input: any) => Promise<{}>
type Find = (input: any) => Promise<{}>
type Update = (input: any) => Promise<{}>
type Delete = (input: any) => Promise<{}>

export type CreateRepositoryType = {
    create: Create;
    find: Find;
    update: Update;
    delete: Delete;
}