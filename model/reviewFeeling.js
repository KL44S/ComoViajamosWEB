function ReviewFeeling(id, description, reviewFeelingReasons) {
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

    if (reviewFeelingReasons === undefined) {
        this.reviewFeelingReasons = [];
    }
    else {
        this.reviewFeelingReasons = reviewFeelingReasons;
    }
}