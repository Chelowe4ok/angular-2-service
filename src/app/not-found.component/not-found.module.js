"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var not_found_service_1 = require("./not-found.service");
var not_found_component_1 = require("./not-found.component");
var home_component_1 = require("./../home.component/home.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'not-found', component: not_found_component_1.NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
var NotFoundModule = (function () {
    function NotFoundModule() {
    }
    return NotFoundModule;
}());
NotFoundModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forChild(routes)],
        declarations: [not_found_component_1.NotFoundComponent],
        providers: [not_found_service_1.NotFoundService],
        bootstrap: [not_found_component_1.NotFoundComponent]
    })
], NotFoundModule);
exports.NotFoundModule = NotFoundModule;
//# sourceMappingURL=not-found.module.js.map