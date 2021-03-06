"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
var Properties;
(function (Properties) {
    Properties["CommitUrl"] = "commitUrl";
    Properties["IgnoreWhitespace"] = "ignoreWhitespace";
    Properties["InfoMessageFormat"] = "infoMessageFormat";
    Properties["InternalHashLength"] = "internalHashLength";
    Properties["IsWebPathPlural"] = "isWebPathPlural";
    Properties["LogLevel"] = "logLevel";
    Properties["ProgressSpinner"] = "progressSpinner";
    Properties["StatusBarMessageFormat"] = "statusBarMessageFormat";
    Properties["StatusBarMessageNoCommit"] = "statusBarMessageNoCommit";
    Properties["StatusBarPositionPriority"] = "statusBarPositionPriority";
})(Properties = exports.Properties || (exports.Properties = {}));
class Property {
    constructor() {
        this.properties = {};
        this.setupListeners();
        this.getProperties();
    }
    static getInstance() {
        if (!Property.instance) {
            Property.instance = new Property();
        }
        return Property.instance;
    }
    static get(name, defaultValue) {
        return Property.getInstance().getProperty(name, defaultValue);
    }
    setupListeners() {
        const disposables = [];
        vscode_1.workspace.onDidSaveTextDocument(this.getProperties, this, disposables);
        this.disposable = vscode_1.Disposable.from(this.disposable, ...disposables);
    }
    getProperty(name, defaultValue) {
        const potentialPropertyValue = this.properties[name];
        if (potentialPropertyValue === null &&
            typeof defaultValue !== "undefined") {
            return defaultValue;
        }
        else {
            return potentialPropertyValue;
        }
    }
    dispose() {
        this.disposable.dispose();
    }
    getPropertyFromConfiguration(name) {
        const properties = vscode_1.workspace.getConfiguration("gitblame");
        return properties.get(name);
    }
    getProperties() {
        const properties = {
            commitUrl: this.getPropertyFromConfiguration(Properties.CommitUrl),
            ignoreWhitespace: this.getPropertyFromConfiguration(Properties.IgnoreWhitespace),
            infoMessageFormat: this.getPropertyFromConfiguration(Properties.InfoMessageFormat),
            internalHashLength: this.getPropertyFromConfiguration(Properties.InternalHashLength),
            isWebPathPlural: this.getPropertyFromConfiguration(Properties.IsWebPathPlural),
            logLevel: this.getPropertyFromConfiguration(Properties.LogLevel),
            progressSpinner: this.getPropertyFromConfiguration(Properties.ProgressSpinner),
            statusBarMessageFormat: this.getPropertyFromConfiguration(Properties.StatusBarMessageFormat),
            statusBarMessageNoCommit: this.getPropertyFromConfiguration(Properties.StatusBarMessageNoCommit),
            statusBarPositionPriority: this.getPropertyFromConfiguration(Properties.StatusBarPositionPriority),
        };
        this.properties = properties;
    }
}
exports.Property = Property;
//# sourceMappingURL=property.js.map