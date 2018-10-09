function FormItem(isInvalid) {

    if (isInvalid !== undefined) {
        this.isInvalid = isInvalid;
    }
    else {
        this.isInvalid = false;
    };

}