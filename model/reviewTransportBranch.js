function ReviewTransportBranch(id, description, reviewTransportBranchOrientation) {
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

    if (reviewTransportBranchOrientation === undefined) {
        this.reviewTransportBranchOrientation = null;
    }
    else {
        this.reviewTransportBranchOrientation = reviewTransportBranchOrientation;
    }
}