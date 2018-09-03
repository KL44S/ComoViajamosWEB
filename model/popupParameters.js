function PopupParameters(scope, templateUrl, controller, size, params, isAutoDismissAvailable, appendTo) {
    this.isAutoDismissAvailable = isAutoDismissAvailable;
    this.templateUrl = templateUrl;
    this.controller = controller;
    this.size = size;
    this.appendTo = appendTo;
    this.scope = scope;
    this.params = params;
}