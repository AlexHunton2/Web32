(self["webpackChunkAAC"] = self["webpackChunkAAC"] || []).push([["src_static_js_scripts_widget-system_widget-react-components_dynamic-components_WidgetButton_tsx"],{

/***/ "./src/static/js/scripts/widget-system/widget-react-components/dynamic-components/WidgetButton.tsx":
/*!*********************************************************************************************************!*\
  !*** ./src/static/js/scripts/widget-system/widget-react-components/dynamic-components/WidgetButton.tsx ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Spinner.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Button.js");


class WidgetButton extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.handlePress = event => {
            this.setState({
                isProcessing: true
            });
            new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
                this.setState({
                    isProcessing: false
                });
            });
            event.preventDefault();
        };
        this.state = {
            isProcessing: false
        };
        this.handlePress = this.handlePress.bind(this);
    }
    render() {
        let buttonValue = this.state.isProcessing ?
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.default, { as: "span", animation: "border", size: "lg", role: "status", "aria-hidden": "true" }) : react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "3rem", height: "3rem", fill: "currentColor", className: "bi bi-arrow-up-circle-fill", viewBox: "0 0 16 16" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" }));
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "text-center" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.default, { variant: "info", size: 'lg', disabled: this.state.isProcessing, onClick: !this.state.isProcessing ? this.handlePress : null }, buttonValue)));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WidgetButton);


/***/ })

}]);
//# sourceMappingURL=src_static_js_scripts_widget-system_widget-react-components_dynamic-components_WidgetButton_tsx.bundle.js.map