function ReviewFeelingReason(id, description) {
    if (id === undefined) {
        this.id = null;
    }
    else {
        this.id = id;
    }

    if (description === undefined) {
        this.description = "";
    }
    else {
        this.description = description;
    }
}