function Review(datetimeFrom, datetimeUntil, travelFeelingId,
    travelFeelingReasonIds, transportId, transportBranchId,
    transportBranchOrientationId, captchaToken) {

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

    if (travelFeelingId === undefined) {
        this.travelFeelingId = null;
    }
    else {
        this.travelFeelingId = travelFeelingId;
    }

    if (travelFeelingReasonIds === undefined) {
        this.travelFeelingReasonIds = null;
    }
    else {
        this.travelFeelingReasonIds = travelFeelingReasonIds;
    }

    if (transportId === undefined) {
        this.transportId = null;
    }
    else {
        this.transportId = transportId;
    }

    if (transportBranchId === undefined) {
        this.transportBranchId = null;
    }
    else {
        this.transportBranchId = transportBranchId;
    }

    if (transportBranchOrientationId === undefined) {
        this.transportBranchOrientationId = null;
    }
    else {
        this.transportBranchOrientationId = transportBranchOrientationId;
    }

    this.captchaToken = captchaToken;
}