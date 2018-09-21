function ReviewTransport(id, description, reviewTransportBranch) {
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

    if (reviewTransportBranch === undefined) {
        this.reviewTransportBranch = null;
    }
    else {
        this.reviewTransportBranch = reviewTransportBranch;
    }
}