function Review(datetimeFrom, datetimeUntil, reivewTravelFeeling, reviewTransport) {
    if (datetimeFrom === undefined) {
        this.datetimeFrom = null;
    }
    else {
        this.datetimeFrom = datetimeFrom;
    }

    if (datetimeUntil === undefined) {
        this.datetimeUntil = null;
    }
    else {
        this.datetimeUntil = datetimeUntil;
    }

    if (reivewTravelFeeling === undefined) {
        this.reivewTravelFeeling = null;
    }
    else {
        this.reivewTravelFeeling = reivewTravelFeeling;
    }

    if (reviewTransport === reviewTransport) {
        this.reviewTransport = null;
    }
    else {
        this.reviewTransport = reviewTransport;
    }
}