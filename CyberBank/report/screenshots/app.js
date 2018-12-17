var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59816,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007100b2-00c2-0025-00fb-000a00f600d9.png",
        "timestamp": 1539462351754,
        "duration": 6057
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59816,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000400f2-00ba-00f6-00f8-00ba008f0026.png",
        "timestamp": 1539462358388,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59816,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d30068-00ab-0030-000c-006f00320062.png",
        "timestamp": 1539462358400,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59816,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00260090-00ca-00a3-000c-002700c900ae.png",
        "timestamp": 1539462358412,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59816,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0099005d-000c-00cd-000d-000600db005d.png",
        "timestamp": 1539462358423,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59816,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0072002e-0065-007b-00c9-00a600c3002e.png",
        "timestamp": 1539462358436,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59816,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003a0070-00bf-00b5-00f2-000e00440004.png",
        "timestamp": 1539462358448,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59816,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a20028-007b-00b0-0045-00c500e30035.png",
        "timestamp": 1539462358458,
        "duration": 0
    },
    {
        "description": "Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\002800d4-0072-0065-0058-00dd00ce0098.png",
        "timestamp": 1539463463100,
        "duration": 3947
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b9005a-0052-00fb-00cf-00050086007b.png",
        "timestamp": 1539463467768,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f500b8-003d-008f-0078-00f7002900c6.png",
        "timestamp": 1539463468034,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00cc00c5-0051-0075-00a3-001300ab00a6.png",
        "timestamp": 1539463468051,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000b0025-006a-00d2-00e3-00ae00d5003e.png",
        "timestamp": 1539463468065,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0059009e-0032-009f-0050-000d009700c9.png",
        "timestamp": 1539463468080,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a6006e-0035-0031-004a-000d006900fe.png",
        "timestamp": 1539463468094,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005c00f8-0069-0026-00d0-00d300fc008e.png",
        "timestamp": 1539463468104,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60640,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006a0070-003b-0005-00ae-00a3006500d3.png",
        "timestamp": 1539463468118,
        "duration": 0
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59004,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: BankManagerPage is not defined"
        ],
        "trace": [
            "ReferenceError: BankManagerPage is not defined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:7:11)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should display all contents on AddCustomer page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:6:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:1:63)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00c00065-00c4-0030-004a-003100a0009e.png",
        "timestamp": 1539477954229,
        "duration": 3845
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 61432,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003f00f9-00b3-001e-0059-008d00a800eb.png",
        "timestamp": 1539478195832,
        "duration": 5021
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60232,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c00019-00f4-007d-00a7-003c00c10000.png",
        "timestamp": 1539478656960,
        "duration": 5562
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 38016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005f001a-0043-00b4-0042-00f2007a0062.png",
        "timestamp": 1539479022714,
        "duration": 5208
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57476,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004300cd-0070-0054-00dc-001a007000af.png",
        "timestamp": 1539479344028,
        "duration": 5331
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 53668,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a100f2-0020-0029-003e-003a0028006a.png",
        "timestamp": 1539479544294,
        "duration": 5406
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17764,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:34:28)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run fit(\"should list Zip Code label on the form\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:30:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:5:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\008500f9-00f7-0057-006f-008000b9003a.png",
        "timestamp": 1539483111295,
        "duration": 4973
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17764,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005400b9-0072-0095-0072-0003000100c2.png",
        "timestamp": 1539483117106,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17764,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ea0075-0045-00a9-0089-004400a700b4.png",
        "timestamp": 1539483117120,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17764,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b30035-0010-008a-0051-00040089009d.png",
        "timestamp": 1539483117134,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17764,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000200d3-00d0-0087-0098-00ac00b5009a.png",
        "timestamp": 1539483117145,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17764,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b10026-0038-00a9-0001-00eb006600c3.png",
        "timestamp": 1539483117158,
        "duration": 0
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17764,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\009e006d-00a7-0035-00d1-007b008300f7.png",
        "timestamp": 1539483117172,
        "duration": 0
    },
    {
        "description": "should Add a New Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56348,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: BankManagerPage.AddFirstname is not a function"
        ],
        "trace": [
            "TypeError: BankManagerPage.AddFirstname is not a function\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:49:21)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run fit(\"should Add a New Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:47:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:13:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00dc0079-00bd-0053-00e9-007900da0066.png",
        "timestamp": 1539485509322,
        "duration": 3229
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56348,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0091005b-00aa-0073-00c9-0081005c006b.png",
        "timestamp": 1539485513159,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56348,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007000b2-0067-00b7-006c-003c00d3006b.png",
        "timestamp": 1539485513176,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56348,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d100d4-0059-000f-0063-001e00ce00df.png",
        "timestamp": 1539485513194,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56348,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003400b9-002c-0042-00d8-00c80075009f.png",
        "timestamp": 1539485513207,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56348,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002b0022-004b-0076-00f6-006100240071.png",
        "timestamp": 1539485513221,
        "duration": 0
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56348,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f40038-007f-004d-00db-00a900c100a7.png",
        "timestamp": 1539485513236,
        "duration": 0
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56348,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\008c003f-005f-0041-003a-00cf0078004a.png",
        "timestamp": 1539485513253,
        "duration": 0
    },
    {
        "description": "should Add a New Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 35008,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected 'Customer added successfully with customer id :6' to equal 'Customer added successfully with customer id :7'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:54:31)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00e20028-0056-00e2-0095-001500ca00e3.png",
        "timestamp": 1539485560167,
        "duration": 5141
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 35008,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00cf002b-008f-0069-003e-00a400c90006.png",
        "timestamp": 1539485565913,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 35008,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b00085-003b-00a3-0063-00e50002003f.png",
        "timestamp": 1539485565930,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 35008,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006400f0-00d0-0036-0028-000200850074.png",
        "timestamp": 1539485565946,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 35008,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d30086-00e7-0055-001b-00bb00af0055.png",
        "timestamp": 1539485565962,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 35008,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002200e2-00a7-0082-00bf-00ac0062003a.png",
        "timestamp": 1539485565978,
        "duration": 0
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 35008,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007400c8-00f9-0080-00ca-005700db0050.png",
        "timestamp": 1539485565994,
        "duration": 0
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 35008,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\00da00b9-00c9-00d9-005c-00d2008700be.png",
        "timestamp": 1539485566012,
        "duration": 0
    },
    {
        "description": "should Add a New Customer|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 34468,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0065007e-0021-00a2-001d-001500d8002a.png",
        "timestamp": 1539485619081,
        "duration": 6215
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 34468,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0004008a-004e-00ea-00b4-0034004f007f.png",
        "timestamp": 1539485625835,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 34468,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000700a7-00f5-00da-00f4-002000b30002.png",
        "timestamp": 1539485625852,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 34468,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c600e4-004c-003b-00c9-006e00b3001b.png",
        "timestamp": 1539485625867,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 34468,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f9008f-0037-00f7-00cc-004400390068.png",
        "timestamp": 1539485625881,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 34468,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008800c8-0007-0010-007c-00f500a80091.png",
        "timestamp": 1539485625899,
        "duration": 1
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 34468,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002300cc-00ea-0091-00cd-00d000b900a2.png",
        "timestamp": 1539485625914,
        "duration": 0
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 34468,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\004e0066-00d7-004e-00f2-007b003300ab.png",
        "timestamp": 1539485625929,
        "duration": 0
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002a008e-005c-00fd-000d-00a90086000f.png",
        "timestamp": 1539528333280,
        "duration": 5189
    },
    {
        "description": "should Add a New Customer|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001b00f4-0070-0035-0077-00a1009100a4.png",
        "timestamp": 1539528338876,
        "duration": 689
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b50023-00ca-0097-00a3-006b00d8002d.png",
        "timestamp": 1539528339919,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003d0032-0019-0078-0066-007000d5008a.png",
        "timestamp": 1539528339929,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0080001e-00e4-00c2-008c-00980051006d.png",
        "timestamp": 1539528339942,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b600eb-0098-000e-0022-001000630028.png",
        "timestamp": 1539528339954,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d400cb-00c0-0081-0069-00330055009e.png",
        "timestamp": 1539528339965,
        "duration": 0
    },
    {
        "description": "should display the new Customer on Customers list|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c000a2-002e-00bc-0091-00c300d30042.png",
        "timestamp": 1539528339974,
        "duration": 0
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54960,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\006b00d1-00e2-00e9-0038-003c00ce0043.png",
        "timestamp": 1539528339983,
        "duration": 0
    },
    {
        "description": "should require a First name field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\006f0004-0046-003c-00b1-007600cc0089.png",
        "timestamp": 1539529598789,
        "duration": 5181
    },
    {
        "description": "should require a Last name field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\0064009d-007c-0056-00f9-002b00980019.png",
        "timestamp": 1539529604357,
        "duration": 933
    },
    {
        "description": "should require a Post Code field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\0066000e-00a9-00bf-00a0-003f00980016.png",
        "timestamp": 1539529605606,
        "duration": 913
    },
    {
        "description": "should Add a New Customer|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009000bb-0061-0034-00c2-00ab00fa003f.png",
        "timestamp": 1539529606847,
        "duration": 627
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c0000d-0096-0019-0099-00a400f000e2.png",
        "timestamp": 1539529607791,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000c0024-005d-0023-004d-006600ca0028.png",
        "timestamp": 1539529607801,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00230006-009c-0073-0052-006900280095.png",
        "timestamp": 1539529607812,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00880073-00e3-0034-00d1-00be00d200d0.png",
        "timestamp": 1539529607821,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008f0044-0024-0064-007f-00d7001f00a5.png",
        "timestamp": 1539529607834,
        "duration": 0
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00060069-0043-00bf-004e-001c00c80051.png",
        "timestamp": 1539529607848,
        "duration": 0
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54416,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\007e00b2-0096-00ec-008d-007200610036.png",
        "timestamp": 1539529607865,
        "duration": 0
    },
    {
        "description": "should require a First name field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\000800d6-00f5-00d9-0035-0001002300b5.png",
        "timestamp": 1539529727812,
        "duration": 5159
    },
    {
        "description": "should require a Last name field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\003e0055-00a4-007f-002a-007e008f001c.png",
        "timestamp": 1539529733360,
        "duration": 906
    },
    {
        "description": "should require a Post Code field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\005f00ce-0002-006b-000b-00cc00550020.png",
        "timestamp": 1539529734586,
        "duration": 903
    },
    {
        "description": "should Add a New Customer|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001e007d-00b4-0019-00c6-000100be0047.png",
        "timestamp": 1539529735792,
        "duration": 621
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003300df-00a2-00cc-0010-0003006c00e1.png",
        "timestamp": 1539529736734,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008b00b2-003d-0075-00c2-006800b3001b.png",
        "timestamp": 1539529736743,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0099008c-0029-00ef-0017-000700ea00e8.png",
        "timestamp": 1539529736752,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004000c4-001a-0086-00a3-00f9005b0008.png",
        "timestamp": 1539529736761,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008700b7-00e6-0002-00b7-00a4003200d7.png",
        "timestamp": 1539529736770,
        "duration": 0
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00940006-0092-003b-0059-00be00c0002a.png",
        "timestamp": 1539529736778,
        "duration": 0
    },
    {
        "description": "should display all contents on AddCustomer page|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59224,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "images\\009c00ac-00d5-0099-0028-002900930053.png",
        "timestamp": 1539529736790,
        "duration": 0
    },
    {
        "description": "should require a First name field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\009a0051-00b7-0073-0002-003b000900b8.png",
        "timestamp": 1539530447928,
        "duration": 5218
    },
    {
        "description": "should require a Last name field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\007800df-0046-0040-00ab-00e9006300f4.png",
        "timestamp": 1539530453536,
        "duration": 960
    },
    {
        "description": "should require a Post Code field|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\009000fa-00e2-00ef-007b-00f400d1006c.png",
        "timestamp": 1539530454793,
        "duration": 892
    },
    {
        "description": "should Add a New Customer|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c500fd-00eb-009b-00f4-006e009b0007.png",
        "timestamp": 1539530455978,
        "duration": 636
    },
    {
        "description": "should require first|As, a Bank manager, adding a new Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004c00bf-003e-00ee-0079-00fa00e30057.png",
        "timestamp": 1539530456942,
        "duration": 502
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f3007e-00ff-002c-0026-0014003f001d.png",
        "timestamp": 1539530457745,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008400ec-0081-006a-0057-006800230003.png",
        "timestamp": 1539530457756,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ba0025-0099-00de-00d3-006f004a0044.png",
        "timestamp": 1539530457767,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b50051-0038-00f6-004c-00dc00e9005c.png",
        "timestamp": 1539530457778,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00850028-00fd-001e-0090-0054004d0087.png",
        "timestamp": 1539530457790,
        "duration": 0
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60176,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e000cc-00fd-0016-006a-007f00860020.png",
        "timestamp": 1539530457802,
        "duration": 0
    },
    {
        "description": "should require a First name field|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\002a00c3-00d0-0043-0093-00db00e80022.png",
        "timestamp": 1539532899247,
        "duration": 5177
    },
    {
        "description": "should require a Last name field|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00750069-00e5-007d-00c3-0094001200d2.png",
        "timestamp": 1539532904856,
        "duration": 1003
    },
    {
        "description": "should require a Post Code field|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\0040004c-0027-0079-0053-00cf00c000d6.png",
        "timestamp": 1539532906198,
        "duration": 1006
    },
    {
        "description": "should Add a New Customer|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0026003b-00d1-001b-00cc-000500c0001a.png",
        "timestamp": 1539532907557,
        "duration": 744
    },
    {
        "description": "should require first|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002500ae-007f-0085-0055-006a004500c7.png",
        "timestamp": 1539532908661,
        "duration": 571
    },
    {
        "description": "should display form for Adding a Customer|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b90072-0081-009a-008b-00b400420093.png",
        "timestamp": 1539532909535,
        "duration": 0
    },
    {
        "description": "should list first name on the form|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007e0047-003c-006e-0021-00be009a0079.png",
        "timestamp": 1539532909547,
        "duration": 0
    },
    {
        "description": "should list First Name Label on the form|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008d0063-0031-009c-00c9-00d600bc0059.png",
        "timestamp": 1539532909558,
        "duration": 0
    },
    {
        "description": "should list Last Name on the form|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a60009-0049-0005-00eb-008200a700fc.png",
        "timestamp": 1539532909571,
        "duration": 0
    },
    {
        "description": "should list Last Name label on the form|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e300ed-0076-0064-006f-0084004e0075.png",
        "timestamp": 1539532909582,
        "duration": 0
    },
    {
        "description": "should list Zip Code label on the form|As, a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 43016,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ed0040-0059-008a-0026-003b00780090.png",
        "timestamp": 1539532909594,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'click' of undefined",
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "TypeError: Cannot read property 'click' of undefined\n    at AddCustomerPage.goToAddCustomer (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Pages\\AddCustomer.page.js:16:38)\n    at UserContext.beforeAll (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:62:29)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\n    at UserContext.fn (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:5325:13)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.fdescribe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:59:9)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1095:7)\n    at fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4428:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:58:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:53:1)",
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:66:96)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should display form for Adding a Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.fdescribe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:65:9)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1095:7)\n    at fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4428:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:58:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:53:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\001d001f-00e5-00e2-0015-002e00cf0099.png",
        "timestamp": 1539536311177,
        "duration": 49
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\009d0036-001b-0086-00e3-004500240074.png",
        "timestamp": 1539536311592,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e100b4-0040-003a-0021-002300520005.png",
        "timestamp": 1539536311605,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00bf0059-0036-0055-0070-000c00e30083.png",
        "timestamp": 1539536311623,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00730064-0049-006c-0071-0092004c0020.png",
        "timestamp": 1539536311635,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00280000-0074-0078-0004-000d0026006a.png",
        "timestamp": 1539536311645,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f80012-006f-0006-00ed-0034006a0044.png",
        "timestamp": 1539536311658,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00000085-002d-00b6-00c9-00220093000b.png",
        "timestamp": 1539536311669,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f500df-00a2-0017-002a-008700040082.png",
        "timestamp": 1539536311679,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00880017-0088-0053-007a-00a8002000b0.png",
        "timestamp": 1539536922276,
        "duration": 435
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00630015-00d5-00bf-0047-009000c20029.png",
        "timestamp": 1539536923084,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00950006-005d-008c-006f-004700ee002a.png",
        "timestamp": 1539536923100,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e2000a-00a2-0067-002c-00c2004300b8.png",
        "timestamp": 1539536923111,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00950028-0049-00f6-00b2-002700dc00fa.png",
        "timestamp": 1539536923122,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002f001f-009b-0080-001b-00b500f600b6.png",
        "timestamp": 1539536923134,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006a00f1-0028-00c1-00b4-009000fe00ad.png",
        "timestamp": 1539536923144,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00790065-00df-00f9-00c5-0067002d00f4.png",
        "timestamp": 1539536923156,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62452,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ab006f-00ea-001f-00e7-000b00ad001c.png",
        "timestamp": 1539536923168,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d30004-0080-0009-00df-00b800df0075.png",
        "timestamp": 1539537164736,
        "duration": 597
    },
    {
        "description": "should list all the labels|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006e009b-0045-00bf-0002-00ec002b00d4.png",
        "timestamp": 1539537165674,
        "duration": 0
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ab00b4-00dc-000f-003b-001900ef0020.png",
        "timestamp": 1539537165688,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005c0042-00e3-001e-00cf-00ad005b00bd.png",
        "timestamp": 1539537165702,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b30073-00d4-00e4-0041-00cd004500bc.png",
        "timestamp": 1539537165713,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005400b1-001d-00f9-00c9-0034003300e1.png",
        "timestamp": 1539537165725,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e300e0-00e0-0055-004c-008300370059.png",
        "timestamp": 1539537165737,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f7007c-006a-007b-006c-000300f000fb.png",
        "timestamp": 1539537165750,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00480020-00d9-00da-00d3-005b001b00a1.png",
        "timestamp": 1539537165762,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 38512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007300a0-00dd-006a-00f7-007e00f50055.png",
        "timestamp": 1539537165773,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006b0030-0013-0014-00c5-005b000b00d5.png",
        "timestamp": 1539538510865,
        "duration": 545
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005900ba-0065-00c4-002d-00f200f400fa.png",
        "timestamp": 1539538511765,
        "duration": 85
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007a00a7-00ef-004d-00fd-005a006d002f.png",
        "timestamp": 1539538512145,
        "duration": 28
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:81:38)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should Add a New Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.fdescribe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:80:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1095:7)\n    at fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4428:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:58:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:53:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\000f007a-00ce-0078-006f-00cc00090017.png",
        "timestamp": 1539538512477,
        "duration": 3
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a40072-00e9-00da-0030-00f200b50030.png",
        "timestamp": 1539538512793,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00650005-00fd-00cc-003d-0001008800a0.png",
        "timestamp": 1539538512807,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004600ba-006a-00de-0020-000400f10071.png",
        "timestamp": 1539538512822,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0077002d-00ca-00f3-0015-00ce00410063.png",
        "timestamp": 1539538512836,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0010006d-0049-0046-0036-008f001100e1.png",
        "timestamp": 1539538512851,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00df001f-003c-00ef-00ca-008600ed004c.png",
        "timestamp": 1539538512867,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00cb0074-00d1-00f6-00ae-00c0009f0074.png",
        "timestamp": 1539538512881,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57296,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00610019-00d3-004f-0046-00490017008f.png",
        "timestamp": 1539538512897,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e9009e-0071-00ee-00a8-007e00d00077.png",
        "timestamp": 1539538558826,
        "duration": 453
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d40003-00e7-0056-0007-00da00e20082.png",
        "timestamp": 1539538559637,
        "duration": 86
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002900d8-00bc-00fd-00d9-009d00ea00ee.png",
        "timestamp": 1539538560022,
        "duration": 39
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: nyAlert is not defined"
        ],
        "trace": [
            "ReferenceError: nyAlert is not defined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:88:9)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should Add a New Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.fdescribe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:80:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1095:7)\n    at fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4428:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:58:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:53:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00930074-0090-00ec-0078-006600bf00fc.png",
        "timestamp": 1539538560364,
        "duration": 9
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001700db-0094-001c-00cd-00e1000c009e.png",
        "timestamp": 1539538560670,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002800db-002d-001b-0015-002f00520018.png",
        "timestamp": 1539538560684,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c300db-0070-0019-0059-0092008600c0.png",
        "timestamp": 1539538560702,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005c0028-006f-000e-007c-003f001900d3.png",
        "timestamp": 1539538560734,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00640034-00e4-0086-00b5-00dd00f000af.png",
        "timestamp": 1539538560751,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001b003e-0001-00dc-0047-000a008c00b0.png",
        "timestamp": 1539538560765,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00600041-0076-00a7-0051-004e005700bf.png",
        "timestamp": 1539538560780,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63464,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d10092-0039-0006-00ea-00ac005d00f2.png",
        "timestamp": 1539538560794,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0028007e-00ec-00f5-00a9-00a700c20048.png",
        "timestamp": 1539538581391,
        "duration": 434
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a10064-00e8-009e-008a-0019006300a1.png",
        "timestamp": 1539538582171,
        "duration": 91
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a0000a-0031-00d1-004f-007d0048001a.png",
        "timestamp": 1539538582548,
        "duration": 29
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ff00fb-005e-0077-0031-00dc00fe00b1.png",
        "timestamp": 1539538582869,
        "duration": 314
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00680096-007e-0049-00a9-0033005f009f.png",
        "timestamp": 1539538583602,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e6001d-0014-008a-00e7-005a007d00fe.png",
        "timestamp": 1539538583621,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\009f0035-007f-0055-0043-004800fa0017.png",
        "timestamp": 1539538583638,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00290040-006c-004d-0074-00c700d40077.png",
        "timestamp": 1539538583655,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c00092-0067-002e-00ce-006f00860072.png",
        "timestamp": 1539538583680,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00860088-0025-004d-0042-00b7003500ff.png",
        "timestamp": 1539538583698,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ef00fc-0055-00b8-00ce-00e000d5008e.png",
        "timestamp": 1539538583714,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 52920,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00fd0036-00d4-000e-0046-007e000500d7.png",
        "timestamp": 1539538583731,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000d00d7-00f4-0050-003e-00fc000700f9.png",
        "timestamp": 1539540251504,
        "duration": 439
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d90071-0061-008c-004e-000000010057.png",
        "timestamp": 1539540252287,
        "duration": 86
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00060034-00e8-0068-001a-007c00d6004f.png",
        "timestamp": 1539540252666,
        "duration": 28
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003600bf-00c2-00f8-00d8-006a00460088.png",
        "timestamp": 1539540252982,
        "duration": 291
    },
    {
        "description": "should display the New Customer that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: invalid selector: Unable to locate an element with the xpath expression //table[contains(@class, 'table-bordered'] because of the following error:\nSyntaxError: Failed to execute 'evaluate' on 'Document': The string '//table[contains(@class, 'table-bordered']' is not a valid XPath expression.\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: Unable to locate an element with the xpath expression //table[contains(@class, 'table-bordered'] because of the following error:\nSyntaxError: Failed to execute 'evaluate' on 'Document': The string '//table[contains(@class, 'table-bordered']' is not a valid XPath expression.\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: WebDriver.findElements(By(xpath, //table[contains(@class, 'table-bordered']))\n    at Driver.schedule (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:94:52)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should display the New Customer that was created\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.fdescribe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:92:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1095:7)\n    at fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4428:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:58:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:53:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\007900de-009e-00c5-0009-007b0080009a.png",
        "timestamp": 1539540253683,
        "duration": 395
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002100ef-008e-004a-00b9-004100cc0050.png",
        "timestamp": 1539540254418,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e700b8-002c-0035-00ef-002d004e00dd.png",
        "timestamp": 1539540254433,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00400044-007e-002f-00fa-007f00710016.png",
        "timestamp": 1539540254452,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00af00c6-00f1-00c2-0057-00e200ef0066.png",
        "timestamp": 1539540254469,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00af0060-00ba-00ee-0052-002c009400a0.png",
        "timestamp": 1539540254483,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00af0084-000f-00e1-0010-00bb000d006f.png",
        "timestamp": 1539540254500,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004f000a-0031-0061-00ba-00c30060002d.png",
        "timestamp": 1539540254512,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54372,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ee00b6-0060-00e4-00fe-001800970059.png",
        "timestamp": 1539540254525,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005e004a-00ca-00a5-00c9-004f00150028.png",
        "timestamp": 1539540326664,
        "duration": 440
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00850089-0055-004e-003c-005400ab0092.png",
        "timestamp": 1539540327473,
        "duration": 98
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008200ef-0077-005b-0001-00ac00de006e.png",
        "timestamp": 1539540327864,
        "duration": 29
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0055003f-0023-009d-00aa-00710051009b.png",
        "timestamp": 1539540328197,
        "duration": 312
    },
    {
        "description": "should display the New Customer that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: invalid selector: Unable to locate an element with the xpath expression //table[contains(@class, 'table-bordered'] because of the following error:\nSyntaxError: Failed to execute 'evaluate' on 'Document': The string '//table[contains(@class, 'table-bordered']' is not a valid XPath expression.\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: Unable to locate an element with the xpath expression //table[contains(@class, 'table-bordered'] because of the following error:\nSyntaxError: Failed to execute 'evaluate' on 'Document': The string '//table[contains(@class, 'table-bordered']' is not a valid XPath expression.\n  (Session info: chrome=69.0.3497.100)\n  (Driver info: chromedriver=2.42.591088 (7b2b2dca23cca0862f674758c9a3933e685c27d5),platform=Windows NT 10.0.17134 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: WebDriver.findElements(By(xpath, //table[contains(@class, 'table-bordered']))\n    at Driver.schedule (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:94:52)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should display the New Customer that was created\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.fdescribe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:92:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1095:7)\n    at fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4428:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:58:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:53:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00a00065-0029-00da-008b-008a00fc0051.png",
        "timestamp": 1539540328898,
        "duration": 399
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b700f6-00ee-00c2-006a-002100e90067.png",
        "timestamp": 1539540329646,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002e0049-0094-0034-00fa-00ca007000d0.png",
        "timestamp": 1539540329664,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000c0044-0046-00f1-0094-006c006f007f.png",
        "timestamp": 1539540329682,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008e0020-00a7-0009-00dc-0039001d000d.png",
        "timestamp": 1539540329699,
        "duration": 1
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00aa003e-004a-0045-005f-008800770006.png",
        "timestamp": 1539540329714,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002500b0-0046-00fd-004e-0055007000e2.png",
        "timestamp": 1539540329736,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f900a2-00ac-0014-00aa-002b007e005a.png",
        "timestamp": 1539540329752,
        "duration": 1
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60940,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000f00eb-005d-0036-00d0-006200a600d3.png",
        "timestamp": 1539540329771,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007f00bb-0020-0086-005b-00e100880035.png",
        "timestamp": 1539540353820,
        "duration": 432
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0093001f-00fb-00b7-0032-009a004f00d5.png",
        "timestamp": 1539540354597,
        "duration": 89
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ff001a-00d8-000e-00e7-00de0076008d.png",
        "timestamp": 1539540354974,
        "duration": 30
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00da00eb-0087-00f2-0047-006d0010007d.png",
        "timestamp": 1539540355291,
        "duration": 299
    },
    {
        "description": "should display the New Customer that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected 'First Name' to equal 'Mike'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:94:63)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00b9004a-008c-00dd-00eb-0049005c002f.png",
        "timestamp": 1539540355970,
        "duration": 437
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00760084-0027-0060-0058-007800630068.png",
        "timestamp": 1539540356718,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001e00fc-00b1-0070-0029-002d002700a8.png",
        "timestamp": 1539540356736,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a20086-009e-00b1-0058-003400c60039.png",
        "timestamp": 1539540356754,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001b008a-004b-0072-0039-00b000c60041.png",
        "timestamp": 1539540356772,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007c00d0-001e-002d-00ab-004b00e8007b.png",
        "timestamp": 1539540356788,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00cb0032-0003-00d9-002c-00a000a00000.png",
        "timestamp": 1539540356804,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00860087-005e-00c9-002c-00f8004c0028.png",
        "timestamp": 1539540356819,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59720,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b3004b-007d-00a0-0017-00da00e7009b.png",
        "timestamp": 1539540356835,
        "duration": 1
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00b50058-0052-0093-007b-0028001100ae.png",
        "timestamp": 1539540383294,
        "duration": 420
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003f008a-00dc-00fa-00d3-0096008b0067.png",
        "timestamp": 1539540384059,
        "duration": 91
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ea0070-004e-00cf-00c4-00b0000e007a.png",
        "timestamp": 1539540384458,
        "duration": 33
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00eb006d-006d-006e-00c3-00d400240096.png",
        "timestamp": 1539540384790,
        "duration": 351
    },
    {
        "description": "should display the New Customer that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f900ff-005b-00b8-004d-0000001700df.png",
        "timestamp": 1539540385573,
        "duration": 465
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00bf0023-007f-00c2-008f-0052005c0080.png",
        "timestamp": 1539540386377,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00af00c3-00fb-008e-007f-0091007c003e.png",
        "timestamp": 1539540386407,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001900f7-00f2-009d-002b-00aa00be0052.png",
        "timestamp": 1539540386428,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004a007a-00cf-002f-009f-00b200aa0064.png",
        "timestamp": 1539540386453,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003c001c-002c-0077-009f-00a000430065.png",
        "timestamp": 1539540386473,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001100d0-0082-00b6-0086-008100b10067.png",
        "timestamp": 1539540386493,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b50014-003a-0056-008b-0015003c0058.png",
        "timestamp": 1539540386513,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 60644,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007e00ea-0052-002e-0011-0091007100a5.png",
        "timestamp": 1539540386533,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007b00d9-00f1-00ae-00be-002500af00e8.png",
        "timestamp": 1539544329504,
        "duration": 782
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00400038-0083-00b9-00c7-009500770026.png",
        "timestamp": 1539544331102,
        "duration": 137
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d700c1-0035-006f-00e2-00dc009800fe.png",
        "timestamp": 1539544331908,
        "duration": 71
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c40039-004d-005a-007d-004a00fd003a.png",
        "timestamp": 1539544332454,
        "duration": 580
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0019006a-00a5-003d-00b3-00ab006800e5.png",
        "timestamp": 1539544333573,
        "duration": 705
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected 'Mike' to equal 'Smith'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:97:63)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\0066004e-009c-0063-00b1-00b500bd00d9.png",
        "timestamp": 1539544334776,
        "duration": 78
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected 'Mike' to equal 15217."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:100:63)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\008200e8-00c4-005f-0083-00df00730043.png",
        "timestamp": 1539544335294,
        "duration": 82
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected 'Mike' to equal ''."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:103:63)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\007b00cd-00e8-0012-0057-00a4001600c7.png",
        "timestamp": 1539544335821,
        "duration": 70
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ed0002-003d-00ee-00ec-00ea008300ea.png",
        "timestamp": 1539544336412,
        "duration": 1
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e10089-0091-001b-0098-0004003700d4.png",
        "timestamp": 1539544336460,
        "duration": 1
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002400ee-0052-0036-00a4-007d0002003b.png",
        "timestamp": 1539544336509,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00270052-0002-00d2-0094-0007004600f0.png",
        "timestamp": 1539544336553,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000f0007-0034-00df-0002-007400f6008b.png",
        "timestamp": 1539544336591,
        "duration": 1
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007f0002-00fc-001b-006c-005e00bb0017.png",
        "timestamp": 1539544336630,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0064005b-0048-0021-0002-00f2006f00a7.png",
        "timestamp": 1539544336661,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 30512,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008d0042-003d-001b-00f0-006f00670059.png",
        "timestamp": 1539544336719,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0067003c-00c8-00e3-004e-005200510095.png",
        "timestamp": 1539544453471,
        "duration": 854
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004f0088-0094-00ba-0034-004e002500a6.png",
        "timestamp": 1539544455055,
        "duration": 124
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e00047-00e7-0036-00dd-008900e200f1.png",
        "timestamp": 1539544455822,
        "duration": 48
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008200b7-0084-00a0-0056-0025001800b0.png",
        "timestamp": 1539544456284,
        "duration": 541
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ed00a4-0005-00ed-00c9-002200880071.png",
        "timestamp": 1539544457354,
        "duration": 725
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006c00e4-004a-0023-0071-0083001f0090.png",
        "timestamp": 1539544458529,
        "duration": 136
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected '15217' to equal 15217."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:100:63)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\000000ec-007d-00a6-0098-00da00eb0041.png",
        "timestamp": 1539544459043,
        "duration": 88
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00de00f9-00de-006d-00a3-004200140039.png",
        "timestamp": 1539544459606,
        "duration": 92
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00140060-0070-0097-0060-00ab006b00d7.png",
        "timestamp": 1539544460095,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0073007e-00c7-00bf-0029-0073006200ab.png",
        "timestamp": 1539544460125,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e30000-0039-0094-0075-00f4000300a9.png",
        "timestamp": 1539544460154,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008e00e5-0072-0031-00bc-00e6001f0033.png",
        "timestamp": 1539544460180,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e60020-001b-0089-002d-005400ad00f1.png",
        "timestamp": 1539544460205,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002a00f7-001c-00b6-00f1-000c001c0054.png",
        "timestamp": 1539544460233,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00700091-00a8-0026-0031-00f700fe0049.png",
        "timestamp": 1539544460258,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 56736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ef0042-00de-0031-00b8-0002007c008f.png",
        "timestamp": 1539544460282,
        "duration": 1
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ee0034-0081-0050-0058-004d00fc0099.png",
        "timestamp": 1539544505087,
        "duration": 924
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0009007e-006f-0096-00ac-006d003b00ec.png",
        "timestamp": 1539544506676,
        "duration": 220
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00260053-0046-0070-00ce-002e00f60027.png",
        "timestamp": 1539544507629,
        "duration": 48
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002e0070-0015-00d3-0083-000a009100f3.png",
        "timestamp": 1539544508102,
        "duration": 523
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009700e8-0063-0034-0018-0081006a007e.png",
        "timestamp": 1539544509176,
        "duration": 693
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007f00f0-0066-0086-0096-00f6008a00f4.png",
        "timestamp": 1539544510291,
        "duration": 168
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e100f8-00f6-0018-00d0-0010001900b0.png",
        "timestamp": 1539544510903,
        "duration": 84
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005f00dc-0082-00b8-0018-00e900120095.png",
        "timestamp": 1539544511390,
        "duration": 74
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00020030-00cc-00a4-0073-000c002a00fe.png",
        "timestamp": 1539544511883,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a100f6-0099-002e-002e-002300b9004e.png",
        "timestamp": 1539544511908,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b20016-0063-00c0-0051-00e6001f0043.png",
        "timestamp": 1539544511939,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00560067-00d5-00ce-00ca-00fc00fc00d7.png",
        "timestamp": 1539544511967,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ae0000-0038-00cb-0033-00b6008f004d.png",
        "timestamp": 1539544511994,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00970072-00cb-0040-00cf-00f3009500aa.png",
        "timestamp": 1539544512025,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008e00c9-0089-005d-000d-0046002e008c.png",
        "timestamp": 1539544512053,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62736,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a00010-00b5-0005-00b2-0084002600ff.png",
        "timestamp": 1539544512085,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003b001c-00c5-008c-0097-00af002e0057.png",
        "timestamp": 1539544843762,
        "duration": 597
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0053006b-00fb-002b-006e-00f5002b0006.png",
        "timestamp": 1539544845176,
        "duration": 125
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d80098-00db-0019-0090-0048007d00d9.png",
        "timestamp": 1539544845783,
        "duration": 85
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a9007f-00e9-009c-00f8-001e00e700bc.png",
        "timestamp": 1539544846284,
        "duration": 499
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004d00ab-00ac-0013-0040-004300af00f0.png",
        "timestamp": 1539544847262,
        "duration": 637
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00fb006c-0086-0035-0046-00cc00fd00bb.png",
        "timestamp": 1539544848286,
        "duration": 82
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0011003a-009b-000f-001e-0041009a005c.png",
        "timestamp": 1539544848763,
        "duration": 83
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e70096-00e1-00c5-0086-0069002a0036.png",
        "timestamp": 1539544849241,
        "duration": 84
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected 'Mike' not to equal 'Mike'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:107:67)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00cf00fe-00e4-00fd-0007-00b500ba00f1.png",
        "timestamp": 1539544849751,
        "duration": 171
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b50014-007d-0051-00fc-007300b20022.png",
        "timestamp": 1539544850478,
        "duration": 1
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00920044-001c-004d-008b-008500470023.png",
        "timestamp": 1539544850521,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0080008f-00bb-0084-0023-003800b500fb.png",
        "timestamp": 1539544850554,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003300db-00d0-008d-0006-00fe00bd002d.png",
        "timestamp": 1539544850587,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005f0040-00d4-0042-001d-00c900ec0083.png",
        "timestamp": 1539544850647,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00db00da-000f-0040-004c-003600210075.png",
        "timestamp": 1539544850679,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00bd0002-002c-00c6-0092-00f800fa00cb.png",
        "timestamp": 1539544850712,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 62244,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a40019-00fa-00d0-00cf-008400620091.png",
        "timestamp": 1539544850740,
        "duration": 1
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00b0005f-0012-0066-00b6-00c800c400ae.png",
        "timestamp": 1539545311247,
        "duration": 658
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001f0062-0060-0007-00e6-003300c40014.png",
        "timestamp": 1539545312656,
        "duration": 143
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002d00d8-0094-00b2-008c-00520052008e.png",
        "timestamp": 1539545313388,
        "duration": 48
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ad00ed-001b-00a7-00db-00f2009900bf.png",
        "timestamp": 1539545313843,
        "duration": 610
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00de00f8-0095-00aa-0059-0027003d0088.png",
        "timestamp": 1539545315263,
        "duration": 659
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009d008d-009b-00b7-00b2-00b3005200d4.png",
        "timestamp": 1539545316442,
        "duration": 121
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ee0053-0083-004a-003c-00040083006c.png",
        "timestamp": 1539545317008,
        "duration": 79
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00af007f-0035-0082-00e5-004d00b300dd.png",
        "timestamp": 1539545317515,
        "duration": 66
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected 'Mike' not to equal 'Mike'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:108:67)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\003e0006-006e-000e-00bd-009d004900c7.png",
        "timestamp": 1539545318049,
        "duration": 2274
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002e004d-00ca-00ec-0064-0017004f00ba.png",
        "timestamp": 1539545321014,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007200b0-00d8-0055-0014-0016001100b4.png",
        "timestamp": 1539545321086,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002000b5-00d0-00c6-00b6-004b00bd0016.png",
        "timestamp": 1539545321133,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002200f1-007a-00ae-006a-007f00140036.png",
        "timestamp": 1539545321163,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008b00c6-002b-003f-001a-004100b200bd.png",
        "timestamp": 1539545321196,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00eb0049-00e6-00a0-00ee-0017004800ed.png",
        "timestamp": 1539545321225,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003a008b-00e6-004b-00ca-008700940095.png",
        "timestamp": 1539545321276,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13932,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00bb00c5-00c2-0046-00e1-007100ff0099.png",
        "timestamp": 1539545321306,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f40054-0097-0086-0022-0003005c000c.png",
        "timestamp": 1539546815297,
        "duration": 683
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001c0057-0062-000d-0038-007f005300fd.png",
        "timestamp": 1539546816508,
        "duration": 137
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001000ba-0051-0004-002a-00020069005a.png",
        "timestamp": 1539546817142,
        "duration": 82
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002500d1-0094-003a-0004-001f00410022.png",
        "timestamp": 1539546817718,
        "duration": 517
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f9004f-0092-00e0-0097-00c800de0059.png",
        "timestamp": 1539546818765,
        "duration": 502
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c50091-0076-00ef-0021-00ad00c10000.png",
        "timestamp": 1539546819742,
        "duration": 113
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00eb00d9-002b-004e-0034-0090008000b4.png",
        "timestamp": 1539546820275,
        "duration": 68
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f800ee-00c1-0004-0029-00d3003e005c.png",
        "timestamp": 1539546820782,
        "duration": 86
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected 'Mike' not to equal 'Mike'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:108:67)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\0040005f-004e-00fb-005a-00be00370046.png",
        "timestamp": 1539546821292,
        "duration": 158
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00040099-000e-0087-0020-006e00bd00b3.png",
        "timestamp": 1539546821869,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00660048-007b-00c2-000a-00f600410046.png",
        "timestamp": 1539546821895,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d500d0-00ad-00d7-00e5-007c00490034.png",
        "timestamp": 1539546821920,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00520077-003e-00c7-006f-007000d000a9.png",
        "timestamp": 1539546821949,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c20042-0021-0064-002f-00c2000e00b8.png",
        "timestamp": 1539546821976,
        "duration": 1
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00cc006b-0065-009f-00eb-00e200ec00d8.png",
        "timestamp": 1539546822031,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002d00e4-0063-00ba-006a-00ee00480048.png",
        "timestamp": 1539546822060,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 59340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000100bb-009e-00bc-0061-00e4000700a9.png",
        "timestamp": 1539546822089,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f900b5-0074-00fc-004a-004500db00f5.png",
        "timestamp": 1539546910792,
        "duration": 643
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f300e2-00bd-000c-00bb-0032006d00f2.png",
        "timestamp": 1539546912124,
        "duration": 146
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007600f2-008a-0011-0060-006100ef00a0.png",
        "timestamp": 1539546912934,
        "duration": 66
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005d00d0-0075-0036-001a-009f00e300c9.png",
        "timestamp": 1539546913382,
        "duration": 549
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006500d8-002f-0028-00e5-0033008a00ca.png",
        "timestamp": 1539546914451,
        "duration": 640
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a30080-00e0-004a-00e9-000a003c0015.png",
        "timestamp": 1539546915704,
        "duration": 94
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d00058-00ce-0082-00d4-00ac00bb0079.png",
        "timestamp": 1539546916248,
        "duration": 98
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006000fe-001f-0094-00fe-008600f900b9.png",
        "timestamp": 1539546916788,
        "duration": 67
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Index out of bound. Trying to access element at index: 6, but there are only 6 elements that match locator by.ngClick(\"deleteCust(cust)\")"
        ],
        "trace": [
            "NoSuchElementError: Index out of bound. Trying to access element at index: 6, but there are only 6 elements that match locator by.ngClick(\"deleteCust(cust)\")\n    at selenium_webdriver_1.promise.all.then (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:274:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:107:54)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should delete the Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.fdescribe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:106:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1095:7)\n    at fdescribe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4428:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:59:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:54:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\004d005d-0053-0020-004d-007b002d0013.png",
        "timestamp": 1539546917315,
        "duration": 47
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0018005e-0016-00e2-00ab-00d500c400be.png",
        "timestamp": 1539546917773,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e90013-0004-00a2-009c-008e004c007a.png",
        "timestamp": 1539546917804,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00450047-0024-0066-00a0-003900f700da.png",
        "timestamp": 1539546917833,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006c0076-007d-0084-00ac-006a00b200d1.png",
        "timestamp": 1539546917863,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c90079-00c6-0014-0088-0060005a00b0.png",
        "timestamp": 1539546917893,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00fb00e5-0097-006a-005d-0076007c000d.png",
        "timestamp": 1539546917955,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0081003c-007e-0000-00d9-000f00140093.png",
        "timestamp": 1539546917991,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 63860,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004600eb-0021-0093-003d-00af00b3007d.png",
        "timestamp": 1539546918024,
        "duration": 0
    },
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006d000d-0016-0033-00e3-008d00b100ea.png",
        "timestamp": 1539547147381,
        "duration": 4979
    },
    {
        "description": "should display Home button|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00b000be-0070-00e1-00a3-00020019004d.png",
        "timestamp": 1539547153058,
        "duration": 939
    },
    {
        "description": "should display page header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d200eb-0039-0015-00bd-0094007000f0.png",
        "timestamp": 1539547154412,
        "duration": 769
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005600f7-005d-00d8-0044-006600e200a7.png",
        "timestamp": 1539547155548,
        "duration": 769
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0077000b-00f0-003f-0043-00ee006100e0.png",
        "timestamp": 1539547156817,
        "duration": 672
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005a009f-0015-0069-00f9-008d00d400bd.png",
        "timestamp": 1539547157908,
        "duration": 1094
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'isDisplayed' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'isDisplayed' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:43:42)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should display options for Bank Manager\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:39:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:8:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00d2001b-004d-000f-0014-00c000f50063.png",
        "timestamp": 1539547159463,
        "duration": 696
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ae00ff-0075-00a7-0095-00b2009200b5.png",
        "timestamp": 1539547160580,
        "duration": 788
    },
    {
        "description": "encountered a declaration exception|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54192,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "SyntaxError: missing ) after argument list"
        ],
        "trace": [
            "C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Pages\\CustomersList.page.js:6\n    this.deleteCustomerButton = element(by.xpath(\"//tbody/tr[last()]/td[5]/button\");\n                                                                                  ^\n\nSyntaxError: missing ) after argument list\n    at createScript (vm.js:80:10)\n    at Object.runInThisContext (vm.js:139:10)\n    at Module._compile (module.js:617:28)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)\n    at Function.Module._load (module.js:498:3)\n    at Module.require (module.js:597:17)\n    at require (internal/module.js:11:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:55:24)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\002e009e-0012-006f-00a2-00ad00ed00fb.png",
        "timestamp": 1539547161805,
        "duration": 6
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006b00c6-0031-00f7-007f-00e800970001.png",
        "timestamp": 1539547223676,
        "duration": 675
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ba007c-00ff-0026-00ff-00df002a0058.png",
        "timestamp": 1539547225174,
        "duration": 139
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00120027-0021-00d8-00ae-00bf002000e1.png",
        "timestamp": 1539547225759,
        "duration": 83
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e3000e-0065-00ff-00ea-009f009600d3.png",
        "timestamp": 1539547226272,
        "duration": 611
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005100fa-00d2-0065-0052-0021006b0034.png",
        "timestamp": 1539547227420,
        "duration": 644
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0036004f-0071-00ae-004e-0038009100f7.png",
        "timestamp": 1539547228448,
        "duration": 101
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009a008e-00f3-008f-00c8-001000d80077.png",
        "timestamp": 1539547228982,
        "duration": 66
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ea00d2-0031-007b-00c5-0077003a0032.png",
        "timestamp": 1539547229448,
        "duration": 70
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00600074-0095-005a-0054-0092007800c9.png",
        "timestamp": 1539547229947,
        "duration": 211
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ca0091-001e-001c-0039-002b007c00da.png",
        "timestamp": 1539547230786,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\009c00a3-0025-004c-006e-007f00bc009e.png",
        "timestamp": 1539547230826,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e30077-004a-0030-00fa-007500d2003e.png",
        "timestamp": 1539547230856,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\009400e2-0016-00a7-0099-00dd003400ca.png",
        "timestamp": 1539547230931,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e700de-0095-00c2-00ba-000c00ca00b9.png",
        "timestamp": 1539547230982,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00160032-0037-00ca-0049-00c10049007f.png",
        "timestamp": 1539547231025,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ef001c-0046-0010-003c-0095007600ef.png",
        "timestamp": 1539547231083,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6836,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e80062-00db-00f9-0025-00d900d40068.png",
        "timestamp": 1539547231115,
        "duration": 1
    },
    {
        "description": "should display page header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ef00c8-00bb-006a-000a-009d00c400ca.png",
        "timestamp": 1539547844902,
        "duration": 4836
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005d003b-009f-0072-0057-001d00b100d6.png",
        "timestamp": 1539547850285,
        "duration": 1
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e9001c-0071-00ec-0065-00a700e100e8.png",
        "timestamp": 1539547850320,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b200ed-0090-0051-0056-00ab00900041.png",
        "timestamp": 1539547850359,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c30002-0071-00b2-0026-00af00e500d2.png",
        "timestamp": 1539547850421,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00960070-002a-00bb-00b5-00a300870011.png",
        "timestamp": 1539547850453,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00340036-001d-001c-00b5-0016009f00f4.png",
        "timestamp": 1539547850494,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c1000b-0058-006a-007a-005800f20054.png",
        "timestamp": 1539547850542,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000100a9-00db-0005-008d-004f005f00cb.png",
        "timestamp": 1539547850574,
        "duration": 0
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004a005c-0021-0060-0078-001a00250097.png",
        "timestamp": 1539547850605,
        "duration": 0
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00980035-00c9-0088-0001-000c00d9007a.png",
        "timestamp": 1539547850659,
        "duration": 1
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006000d0-0057-00db-009e-008b00320008.png",
        "timestamp": 1539547850692,
        "duration": 0
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0083009c-0027-0034-000d-00d100f40087.png",
        "timestamp": 1539547850728,
        "duration": 0
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d00039-00b9-00ca-0002-000c000b00fa.png",
        "timestamp": 1539547850768,
        "duration": 0
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002700af-0022-00ed-000b-00d600e400a8.png",
        "timestamp": 1539547850826,
        "duration": 0
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0078001c-00cb-00c0-0033-004c00b5002a.png",
        "timestamp": 1539547850858,
        "duration": 0
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 54164,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001700c0-00e0-0042-006c-003000d200b4.png",
        "timestamp": 1539547850891,
        "duration": 0
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001000dc-0031-00a9-003f-002f002200a4.png",
        "timestamp": 1539548375494,
        "duration": 932
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ad0035-00ee-004e-0013-00e100a000d9.png",
        "timestamp": 1539548377161,
        "duration": 1
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003b00e9-009a-008f-0053-0058007a00e6.png",
        "timestamp": 1539548377199,
        "duration": 0
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003e0074-000a-00c0-00cf-00130086006b.png",
        "timestamp": 1539548377255,
        "duration": 0
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006a0077-003e-0061-00bd-002a007000d7.png",
        "timestamp": 1539548377289,
        "duration": 0
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003c0076-005e-00ab-00e5-006700380029.png",
        "timestamp": 1539548377323,
        "duration": 0
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00050043-001b-00c2-000a-001a00440055.png",
        "timestamp": 1539548377377,
        "duration": 0
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004e00c8-00d1-00a1-00cd-008400d900d3.png",
        "timestamp": 1539548377405,
        "duration": 0
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004b00f3-0079-0013-00a5-005300f50010.png",
        "timestamp": 1539548377433,
        "duration": 0
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d00094-009e-00e0-00f2-004f0065004d.png",
        "timestamp": 1539548377493,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d60014-001b-00f5-00da-0022003c00b2.png",
        "timestamp": 1539548377527,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b800ec-0047-0041-0017-00030002007f.png",
        "timestamp": 1539548377559,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f70050-000e-009e-00d9-0059000100fd.png",
        "timestamp": 1539548377612,
        "duration": 1
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00bc0018-0067-0032-00cb-00f9003f00bb.png",
        "timestamp": 1539548377647,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008f0082-00a6-003a-0046-0007001200c8.png",
        "timestamp": 1539548377707,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00190051-009a-0064-009e-005700b100a1.png",
        "timestamp": 1539548377741,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 57956,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002c000e-0074-00dd-0067-00bf00cc0087.png",
        "timestamp": 1539548377799,
        "duration": 0
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ad002e-0066-0054-006b-009b00b10000.png",
        "timestamp": 1539548688599,
        "duration": 1777
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00700051-0068-0041-00b2-009100fb00fc.png",
        "timestamp": 1539548690929,
        "duration": 0
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002800dd-00f0-0025-0080-00b4005900ab.png",
        "timestamp": 1539548690979,
        "duration": 0
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006200fd-00e7-0044-0084-001e0048006a.png",
        "timestamp": 1539548691036,
        "duration": 0
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ae00ff-0069-0020-00b0-0001009700ac.png",
        "timestamp": 1539548691067,
        "duration": 0
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00060008-0033-00ec-0014-006600bf001e.png",
        "timestamp": 1539548691100,
        "duration": 0
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f400f4-00a6-00ea-005e-007e004f002f.png",
        "timestamp": 1539548691150,
        "duration": 0
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007400a6-0059-008b-0087-00c90004003f.png",
        "timestamp": 1539548691182,
        "duration": 0
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\009b0069-0002-00a2-0010-0051001b0007.png",
        "timestamp": 1539548691211,
        "duration": 0
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0025009b-00f6-00ed-0018-005c006200ea.png",
        "timestamp": 1539548691267,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001100f6-0059-00fe-00b9-001400e70088.png",
        "timestamp": 1539548691301,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008f00f5-0026-00e5-00e1-004b00b8007f.png",
        "timestamp": 1539548691334,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00af00cf-0096-001d-00c0-00bb00950090.png",
        "timestamp": 1539548691386,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005b00f1-0082-009d-0001-005e00ad00b4.png",
        "timestamp": 1539548691421,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e100f7-001c-006f-0058-00d40098002d.png",
        "timestamp": 1539548691479,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003200a9-002f-008b-0062-00d8009400be.png",
        "timestamp": 1539548691509,
        "duration": 1
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 58420,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f80040-008f-0084-00f4-004100f6006e.png",
        "timestamp": 1539548691546,
        "duration": 0
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008f005c-0085-000b-0043-005e00f800dc.png",
        "timestamp": 1539549308867,
        "duration": 1665
    },
    {
        "description": "should display all customers|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00c800d2-00cd-0069-0056-006600d800b5.png",
        "timestamp": 1539549311395,
        "duration": 93
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ea0043-003a-008d-008f-00b400ab002a.png",
        "timestamp": 1539549312052,
        "duration": 0
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a9007f-0048-0006-00ec-00a5006200cd.png",
        "timestamp": 1539549312126,
        "duration": 0
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00580088-0053-0057-001f-009500f700b2.png",
        "timestamp": 1539549312167,
        "duration": 0
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a4002a-0088-0091-0063-009d00d200ab.png",
        "timestamp": 1539549312213,
        "duration": 0
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b300cb-0034-0063-00ff-00dd004f002d.png",
        "timestamp": 1539549312281,
        "duration": 0
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00b10043-00cd-0002-0010-00790081001a.png",
        "timestamp": 1539549312320,
        "duration": 0
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005d00f3-000d-00b5-00cc-006f00a500c6.png",
        "timestamp": 1539549312361,
        "duration": 0
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\000c00bc-00be-00d3-006c-00fe003d000d.png",
        "timestamp": 1539549312431,
        "duration": 0
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a90082-0084-00e7-0013-00a500bf0021.png",
        "timestamp": 1539549312471,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0081002d-0016-0042-0004-0044008600f8.png",
        "timestamp": 1539549312517,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a40006-0005-00bd-0083-00d40097002e.png",
        "timestamp": 1539549312591,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008d0007-001a-009f-00c4-0093007d0002.png",
        "timestamp": 1539549312634,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00a7005a-0074-00a4-00c0-00d0009a0082.png",
        "timestamp": 1539549312706,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\001d0068-0089-0074-00d0-009f00b800df.png",
        "timestamp": 1539549312757,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00af0056-0073-005e-00c2-00be00d80022.png",
        "timestamp": 1539549312808,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 44180,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005100b4-004b-00f2-0047-00510004005e.png",
        "timestamp": 1539549312851,
        "duration": 0
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006e0092-00ba-0006-0062-009b001000b9.png",
        "timestamp": 1539549366276,
        "duration": 1817
    },
    {
        "description": "should display all customers|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00400097-0076-00b9-0093-00c000e200c0.png",
        "timestamp": 1539549368799,
        "duration": 84
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\009a0086-0033-00ad-00d8-00b60048005c.png",
        "timestamp": 1539549369451,
        "duration": 0
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\009100cb-0010-00e7-0077-00ba007600a2.png",
        "timestamp": 1539549369498,
        "duration": 0
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00e80039-0069-0018-005f-009e004a0077.png",
        "timestamp": 1539549369537,
        "duration": 0
    },
    {
        "description": "should display the New Customer FirstName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00cc00fb-004e-0095-0032-000600e70099.png",
        "timestamp": 1539549369595,
        "duration": 0
    },
    {
        "description": "should display the New Customer LastName that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00cf003b-007c-009f-0015-007500fb00f4.png",
        "timestamp": 1539549369634,
        "duration": 0
    },
    {
        "description": "should display the New Customer PostCode that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005e00b4-00e0-0000-00fc-006500ec006f.png",
        "timestamp": 1539549369669,
        "duration": 0
    },
    {
        "description": "should display the New Customer empty Account Number that was created|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0087007a-00ca-00ec-001b-009800c90073.png",
        "timestamp": 1539549369721,
        "duration": 0
    },
    {
        "description": "should delete the Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f80020-00a7-00d3-004b-00ab002a00bd.png",
        "timestamp": 1539549369757,
        "duration": 0
    },
    {
        "description": "should have correct page title|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00400008-00ca-001e-0010-007e00c10080.png",
        "timestamp": 1539549369791,
        "duration": 0
    },
    {
        "description": "should display Home button|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\003700f1-0077-0040-00c8-0001008e0016.png",
        "timestamp": 1539549369831,
        "duration": 0
    },
    {
        "description": "should display page header|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c5007f-00e7-004a-00c0-00a100430025.png",
        "timestamp": 1539549369889,
        "duration": 0
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00ae00d7-0006-00a9-00e6-00c5004b00d2.png",
        "timestamp": 1539549369922,
        "duration": 0
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006e003f-00c8-0064-0042-00c800790034.png",
        "timestamp": 1539549369962,
        "duration": 0
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00da0088-008d-00a3-00c6-00f700070067.png",
        "timestamp": 1539549369999,
        "duration": 0
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00130004-0027-0042-002b-00eb00c50075.png",
        "timestamp": 1539549370064,
        "duration": 0
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 53716,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\002500c3-00f8-00e5-00ff-00aa0031007f.png",
        "timestamp": 1539549370101,
        "duration": 0
    },
    {
        "description": "should display form for Adding a Customer|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f40047-000b-000f-0030-009000b40065.png",
        "timestamp": 1539551097395,
        "duration": 4841
    },
    {
        "description": "should list first name on the form|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'isDisplayed' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'isDisplayed' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:23:37)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should list first name on the form\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:21:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\006e0057-00da-004f-0016-000b00b40074.png",
        "timestamp": 1539551103052,
        "duration": 604
    },
    {
        "description": "should list First Name Label on the form|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'getText' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'getText' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:28:47)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should list First Name Label on the form\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:26:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\000b00a1-00a2-00d4-0048-0098000b00c0.png",
        "timestamp": 1539551104071,
        "duration": 463
    },
    {
        "description": "should list Last Name on the form|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'isDisplayed' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'isDisplayed' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:33:44)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should list Last Name on the form\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:31:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\002400d7-008b-006a-0075-000e003a0001.png",
        "timestamp": 1539551104939,
        "duration": 525
    },
    {
        "description": "should list Last Name label on the form|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'getText' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'getText' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:37:46)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should list Last Name label on the form\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:35:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00340032-0088-002c-00ca-0069001600f6.png",
        "timestamp": 1539551105879,
        "duration": 450
    },
    {
        "description": "should list Zip Code label on the form|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'getText' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'getText' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:41:46)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should list Zip Code label on the form\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:39:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00380070-00c7-006b-009c-00ee00b000b1.png",
        "timestamp": 1539551106743,
        "duration": 468
    },
    {
        "description": "should require a First name field|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'click' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'click' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:46:40)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should require a First name field\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:44:2)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\000e0074-006e-0060-009d-004700f8002e.png",
        "timestamp": 1539551107657,
        "duration": 500
    },
    {
        "description": "should require a Last name field|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:53:34)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should require a Last name field\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:51:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\001a000a-002a-0042-00a7-00a0007f0097.png",
        "timestamp": 1539551108716,
        "duration": 536
    },
    {
        "description": "should require a Post Code field|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:61:34)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should require a Post Code field\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:59:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\006e002d-00ac-00b8-007a-002400cb00e0.png",
        "timestamp": 1539551109738,
        "duration": 678
    },
    {
        "description": "should Add a New Customer|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:71:34)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should Add a New Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:69:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\008c006f-0075-00a9-00b0-001e003800b6.png",
        "timestamp": 1539551110914,
        "duration": 488
    },
    {
        "description": "should require first|As a Bank manager, adding a new Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'click' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'click' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:82:39)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should require first\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:80:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:14:1)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\AddCustomer.spec.js:11:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\001e00af-001b-0058-00ff-006100e50018.png",
        "timestamp": 1539551111848,
        "duration": 562
    },
    {
        "description": "first alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://the-internet.herokuapp.com/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1539551113545,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0073000a-0020-007a-008b-00ce00e10002.png",
        "timestamp": 1539551114355,
        "duration": 186
    },
    {
        "description": "second alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00010020-000b-0042-004a-000200f50050.png",
        "timestamp": 1539551115070,
        "duration": 2180
    },
    {
        "description": "third alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22388,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0015003d-00b0-00ac-0049-00e200c1009b.png",
        "timestamp": 1539551117701,
        "duration": 2157
    },
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00120015-002f-00a4-0027-00cb00fb00d9.png",
        "timestamp": 1539552220709,
        "duration": 4578
    },
    {
        "description": "should display Home button|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003600b6-00fa-0058-0065-0040002f008f.png",
        "timestamp": 1539552226300,
        "duration": 720
    },
    {
        "description": "should display page header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ce00e6-0016-0036-0030-0064004700dd.png",
        "timestamp": 1539552227499,
        "duration": 677
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001300a6-004c-0063-00d7-00fd00fd0001.png",
        "timestamp": 1539552228672,
        "duration": 760
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a5006a-00c2-00b9-0075-003a00db00db.png",
        "timestamp": 1539552229936,
        "duration": 646
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001000a6-0037-0012-00cc-003c008b00a3.png",
        "timestamp": 1539552231175,
        "duration": 1055
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Cannot read property 'isDisplayed' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'isDisplayed' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:43:42)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should display options for Bank Manager\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:39:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:8:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00050026-00cf-0009-008f-002100b4002b.png",
        "timestamp": 1539552232951,
        "duration": 843
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c500b8-0049-0005-0046-001600dd004d.png",
        "timestamp": 1539552234351,
        "duration": 1352
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007000e2-000c-0095-00c6-000b00580083.png",
        "timestamp": 1539552237261,
        "duration": 624
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a80011-000f-00d4-0070-000b00c00088.png",
        "timestamp": 1539552238353,
        "duration": 142
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00840010-000c-0037-0068-004b005d00f4.png",
        "timestamp": 1539552239149,
        "duration": 92
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: No element found using locator: by.model(\"fName\")"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: by.model(\"fName\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:83:38)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should Add a New Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:81:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:59:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:54:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\002e0058-005f-0032-00d8-005c007d00b8.png",
        "timestamp": 1539552239658,
        "duration": 1596
    },
    {
        "description": "first alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://the-internet.herokuapp.com/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1539552242285,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00ca0037-0015-0008-00ac-00f2008d00f2.png",
        "timestamp": 1539552243083,
        "duration": 219
    },
    {
        "description": "second alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005b007b-0002-0029-0020-007800fe0069.png",
        "timestamp": 1539552243791,
        "duration": 2139
    },
    {
        "description": "third alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20828,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000d0059-001a-0093-00fb-009b009400e7.png",
        "timestamp": 1539552246660,
        "duration": 2169
    },
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003c000d-00f7-005f-0067-0024004900ce.png",
        "timestamp": 1539552791712,
        "duration": 4672
    },
    {
        "description": "should display Home button|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c500ef-0098-00b3-00c7-0073001400e8.png",
        "timestamp": 1539552797208,
        "duration": 740
    },
    {
        "description": "should display page header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0079005c-00d4-00a4-008b-004c009e00ba.png",
        "timestamp": 1539552798370,
        "duration": 713
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006a00dc-00cf-0043-0038-001d002400f9.png",
        "timestamp": 1539552799489,
        "duration": 740
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000e0042-002b-00fd-00c8-006b00e60043.png",
        "timestamp": 1539552800719,
        "duration": 840
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00960027-0084-0058-0009-009e00350038.png",
        "timestamp": 1539552802058,
        "duration": 1115
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008100cc-00d3-002b-0026-009f009300da.png",
        "timestamp": 1539552803687,
        "duration": 1078
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00060032-0098-004c-0085-0012002500a2.png",
        "timestamp": 1539552805248,
        "duration": 1148
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00fb000a-006c-0080-00b1-00d500550096.png",
        "timestamp": 1539552808111,
        "duration": 600
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00df0075-0040-0052-009e-004c000b008e.png",
        "timestamp": 1539552809284,
        "duration": 158
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00cc00a3-0092-00e0-0014-002a00a200d0.png",
        "timestamp": 1539552809932,
        "duration": 44
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: No element found using locator: by.model(\"fName\")"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: by.model(\"fName\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:83:38)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should Add a New Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:81:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:59:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:54:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\005e00c4-004e-002e-00b4-00cb004f0065.png",
        "timestamp": 1539552810670,
        "duration": 1628
    },
    {
        "description": "first alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://the-internet.herokuapp.com/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1539552813446,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00c400b7-00ba-00f4-0044-00a300a30033.png",
        "timestamp": 1539552814175,
        "duration": 284
    },
    {
        "description": "second alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0041001a-0090-00be-00e9-00d400a80097.png",
        "timestamp": 1539552815039,
        "duration": 2184
    },
    {
        "description": "third alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49140,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002d00f4-0087-002e-00af-004400be0017.png",
        "timestamp": 1539552817923,
        "duration": 2144
    },
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00b1003c-0089-0076-0010-0034006000ca.png",
        "timestamp": 1539554038067,
        "duration": 4868
    },
    {
        "description": "should display Home button|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00230035-00bc-0086-0021-005c006900c3.png",
        "timestamp": 1539554043490,
        "duration": 742
    },
    {
        "description": "should display page header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c600cf-00f0-00fc-00b3-000d00a800a0.png",
        "timestamp": 1539554044638,
        "duration": 697
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a7005e-0037-0022-0081-00ab00f400dd.png",
        "timestamp": 1539554045750,
        "duration": 560
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003d00e8-0030-005b-0006-001d00ee008f.png",
        "timestamp": 1539554046776,
        "duration": 576
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003e00f7-0082-00fb-0050-00a100b800a8.png",
        "timestamp": 1539554047790,
        "duration": 1015
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ac00e8-0036-0038-00f8-003c00960053.png",
        "timestamp": 1539554049217,
        "duration": 708
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00090059-00f3-0016-0023-00cc005b0029.png",
        "timestamp": 1539554050316,
        "duration": 777
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00380047-00e9-0026-00c9-0036005f00ac.png",
        "timestamp": 1539554052041,
        "duration": 489
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00b3006a-00c1-0040-0010-000200020083.png",
        "timestamp": 1539554052919,
        "duration": 146
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004400af-0081-00f0-0073-00eb000d009a.png",
        "timestamp": 1539554053488,
        "duration": 79
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: No element found using locator: by.model(\"fName\")"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: by.model(\"fName\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:83:38)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should Add a New Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:81:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:59:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\BankManagerSimple.spec.js:54:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\006900f0-00bf-0061-0086-002b00ae00bc.png",
        "timestamp": 1539554053997,
        "duration": 1469
    },
    {
        "description": "first alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://the-internet.herokuapp.com/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1539554056961,
                "type": ""
            }
        ],
        "screenShotFile": "images\\008900a9-00aa-005b-00bb-0088005c00f7.png",
        "timestamp": 1539554057828,
        "duration": 157
    },
    {
        "description": "second alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00580055-008a-0056-0078-000f009f0077.png",
        "timestamp": 1539554058445,
        "duration": 2135
    },
    {
        "description": "third alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 62456,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006000d4-0094-00e2-0006-003b0036009b.png",
        "timestamp": 1539554061052,
        "duration": 2154
    },
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00800063-0094-00fb-006d-003000fa0050.png",
        "timestamp": 1539554113584,
        "duration": 4389
    },
    {
        "description": "should display Home button|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a5008a-0034-003d-00ab-0006006000f9.png",
        "timestamp": 1539554118511,
        "duration": 968
    },
    {
        "description": "should display page header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000a00c2-0032-00a2-00dc-00ea002d0018.png",
        "timestamp": 1539554119912,
        "duration": 619
    },
    {
        "description": "should display a Login option for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005c0006-00c7-0053-00e9-000f00520004.png",
        "timestamp": 1539554120917,
        "duration": 572
    },
    {
        "description": "should stay at homepage when Home button is clicked|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009200a1-0050-0076-0041-00af0074003f.png",
        "timestamp": 1539554121951,
        "duration": 670
    },
    {
        "description": "should Login as a Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004f00fb-0006-00c3-00ed-00a500ac0067.png",
        "timestamp": 1539554123047,
        "duration": 1010
    },
    {
        "description": "should display options for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d600dd-00dc-0047-006f-00d80032004a.png",
        "timestamp": 1539554124475,
        "duration": 884
    },
    {
        "description": "should tale back to the Home page from Manager Login page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00490080-004c-0011-0095-003e006100c3.png",
        "timestamp": 1539554125841,
        "duration": 885
    },
    {
        "description": "should display form for Adding a Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00da006f-00dd-002f-0080-0051009c00e6.png",
        "timestamp": 1539554127814,
        "duration": 483
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000a00a3-00e4-0096-0053-00f4000300d3.png",
        "timestamp": 1539554128691,
        "duration": 155
    },
    {
        "description": "should require firstName|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008f00fc-00bd-008f-002f-00ef00f000a4.png",
        "timestamp": 1539554129265,
        "duration": 59
    },
    {
        "description": "should Add a New Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00aa00e9-00a2-00bb-0044-003400e600c4.png",
        "timestamp": 1539554129730,
        "duration": 3514
    },
    {
        "description": "first alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://the-internet.herokuapp.com/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1539554134242,
                "type": ""
            }
        ],
        "screenShotFile": "images\\004800e1-007e-00a5-0080-005e000c0068.png",
        "timestamp": 1539554135040,
        "duration": 198
    },
    {
        "description": "second alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009900b2-002c-00bf-00b5-005200e60006.png",
        "timestamp": 1539554135684,
        "duration": 2165
    },
    {
        "description": "third alert|testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 54304,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006000bd-00c6-0004-0062-00b9002e0089.png",
        "timestamp": 1539554138335,
        "duration": 2165
    },
    {
        "description": "should add customer: Elon Musk|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 47924,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Parameter \"url\" must be a string, not undefined",
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Parameter \"url\" must be a string, not undefined\n    at Url.parse (url.js:103:11)\n    at urlParse (url.js:97:13)\n    at Url.resolve (url.js:654:29)\n    at Object.urlResolve [as resolve] (url.js:650:40)\n    at ProtractorBrowser.get (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:653:17)\n    at Base.navigateToHome (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Utilities\\Base.js:4:13)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:15:14)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\n    at UserContext.fn (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:5325:13)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:14:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Elon Musk\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00a80019-00d8-007e-0023-005400e6009e.png",
        "timestamp": 1540654639822,
        "duration": 28
    },
    {
        "description": "should add customer: Warren Buffet|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 47924,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Parameter \"url\" must be a string, not undefined",
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Parameter \"url\" must be a string, not undefined\n    at Url.parse (url.js:103:11)\n    at urlParse (url.js:97:13)\n    at Url.resolve (url.js:654:29)\n    at Object.urlResolve [as resolve] (url.js:650:40)\n    at ProtractorBrowser.get (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:653:17)\n    at Base.navigateToHome (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Utilities\\Base.js:4:13)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:15:14)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\n    at UserContext.fn (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:5325:13)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:14:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Warren Buffet\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00930096-0043-004c-007d-007400e60026.png",
        "timestamp": 1540654640726,
        "duration": 9
    },
    {
        "description": "should add customer: Amanico Ortega|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 47924,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Parameter \"url\" must be a string, not undefined",
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Parameter \"url\" must be a string, not undefined\n    at Url.parse (url.js:103:11)\n    at urlParse (url.js:97:13)\n    at Url.resolve (url.js:654:29)\n    at Object.urlResolve [as resolve] (url.js:650:40)\n    at ProtractorBrowser.get (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:653:17)\n    at Base.navigateToHome (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Utilities\\Base.js:4:13)\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:15:14)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\n    at UserContext.fn (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:5325:13)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:14:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Amanico Ortega\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\0069000d-00e1-00a1-0076-00cf000200a4.png",
        "timestamp": 1540654641480,
        "duration": 7
    },
    {
        "description": "should add customer: Elon Musk|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'click' of undefined",
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'click' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:16:37)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\n    at UserContext.fn (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:5325:13)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:14:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Elon Musk\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00fd004c-009d-0035-0089-00cf00440065.png",
        "timestamp": 1540654687186,
        "duration": 21
    },
    {
        "description": "should add customer: Warren Buffet|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'click' of undefined",
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'click' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:16:37)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\n    at UserContext.fn (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:5325:13)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:14:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Warren Buffet\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\004a00e2-00ba-001b-00fc-00ca007b0054.png",
        "timestamp": 1540654687928,
        "duration": 3
    },
    {
        "description": "should add customer: Amanico Ortega|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 49344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'click' of undefined",
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'click' of undefined\n    at UserContext.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:16:37)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\n    at UserContext.fn (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:5325:13)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at QueueRunner.execute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4199:10)\n    at queueRunnerFactory (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:14:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Amanico Ortega\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\003a007b-009c-0043-00aa-006300b8007d.png",
        "timestamp": 1540654688660,
        "duration": 13
    },
    {
        "description": "should add customer: Elon Musk|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 40196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Elon Musk\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\0068000e-007c-0048-00ba-00c8003100d8.png",
        "timestamp": 1540654763641,
        "duration": 26
    },
    {
        "description": "should add customer: Warren Buffet|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 40196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Warren Buffet\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00480032-0030-0076-008c-00e100d20050.png",
        "timestamp": 1540654764488,
        "duration": 3
    },
    {
        "description": "should add customer: Amanico Ortega|Jasmine Data Provider ",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 40196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at UserContext.it (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:29:51)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should add customer: Amanico Ortega\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:28:9\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:25:22\n    at Array.forEach (<anonymous>)\n    at C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\node_modules\\jasmine-data-provider\\src\\index.js:20:20\n    at Suite.describe (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:27:5)\n    at addSpecsToSuite (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\aydan\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\aydan\\OneDrive\\Desktop\\C_tek\\CyberFramework\\CyberBank\\Tests\\dataProvider.spec.js:12:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\0049001e-0042-0045-00f5-000400d7007e.png",
        "timestamp": 1540654764900,
        "duration": 3
    },
    {
        "description": "should add customer: Elon Musk|Jasmine Data Provider ",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000b003c-0075-002a-0070-00670021006b.png",
        "timestamp": 1540654914338,
        "duration": 1856
    },
    {
        "description": "should add customer: Warren Buffet|Jasmine Data Provider ",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00db0072-0033-0036-009a-003200e200d3.png",
        "timestamp": 1540654916638,
        "duration": 753
    },
    {
        "description": "should add customer: Amanico Ortega|Jasmine Data Provider ",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 57664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0017007b-0049-00b7-00a7-00a200b800b0.png",
        "timestamp": 1540654917829,
        "duration": 763
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
