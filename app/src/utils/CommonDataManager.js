export default class CommonDataManager {

    static myInstance = null;

    _userID = "";
    _roles={};


    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }

        return CommonDataManager.myInstance;
    }

    getUserID() {
        return this._userID;
    }

    setUserID(id) {
        this._userID = id;
    }

    getRoles() {
        return this._roles;
    }

    setRoles(roles) {
        this._roles = roles;
    }
}