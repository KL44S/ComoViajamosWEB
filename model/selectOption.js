function SelectOption(value, description, filtered, selected) {
    if (value === undefined) {
        this.value = null;
    }
    else {
        this.value = value;
    }

    if (description === undefined) {
        this.description = "";
    }
    else {
        this.description = description;
    }

    if (filtered === undefined) {
        this.filtered = false;
    }
    else {
        this.filtered = filtered;
    }

    if (selected === undefined) {
        this.selected = false;
    }
    else {
        this.selected = selected;
    }
}