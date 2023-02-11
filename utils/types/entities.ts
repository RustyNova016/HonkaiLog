export interface ModelEntities<model, entity> {
    fromModel: (data: model)=>entity
    toModel: ()=>model
}