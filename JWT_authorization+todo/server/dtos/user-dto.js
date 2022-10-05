// module.exports = class UserDto {                           // data transfer object
export default class UserDto {                           // data transfer object
    email;
    id;
    isActivated;
    

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}               