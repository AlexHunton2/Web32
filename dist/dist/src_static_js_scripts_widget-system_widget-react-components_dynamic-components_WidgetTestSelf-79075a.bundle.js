(self["webpackChunkAAC"] = self["webpackChunkAAC"] || []).push([["src_static_js_scripts_widget-system_widget-react-components_dynamic-components_WidgetTestSelf-79075a"],{

/***/ "./src/static/js/scripts/widget-system/widget-react-components/dynamic-components/WidgetTestSelfLabel.tsx":
/*!****************************************************************************************************************!*\
  !*** ./src/static/js/scripts/widget-system/widget-react-components/dynamic-components/WidgetTestSelfLabel.tsx ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

class WidgetTestSelfLabel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', text_value: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        const comps = this.props.getDynamicComponents();
        const new_comps = new Array();
        this.setState({ text_value: this.state.value });
        event.preventDefault();
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", { onSubmit: this.handleSubmit },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, this.state.text_value),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null,
                    "Update Value:",
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "text", id: "fname", name: "fname", value: this.state.value, onChange: this.handleChange }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null)),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "submit", value: "Submit" }))));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WidgetTestSelfLabel);


/***/ })

}]);
//# sourceMappingURL=src_static_js_scripts_widget-system_widget-react-components_dynamic-components_WidgetTestSelf-79075a.bundle.js.map