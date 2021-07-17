(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./src/static/js/scripts/widget-system/widget-react-components/dynamic-components/WidgetTestForm.tsx":
/*!***********************************************************************************************************!*\
  !*** ./src/static/js/scripts/widget-system/widget-react-components/dynamic-components/WidgetTestForm.tsx ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class WidgetTestForm extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        const comps = this.props.getDynamicComponents();
        const new_comps = new Array();
        comps.forEach(comp => {
            if (comp.getPair("type") == "TestLabel") {
                comp.updatePair("text_value", this.state.value);
            }
            new_comps.push(comp);
        });
        this.props.updateDynamicComponents(new_comps);
        event.preventDefault();
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", { onSubmit: this.handleSubmit },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null,
                    "Update Value:",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "text", id: "fname", name: "fname", value: this.state.value, onChange: this.handleChange }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null)),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "submit", value: "Submit" }))));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (WidgetTestForm);


/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map